/**
 * @jest-environment node
 */

const mockAppend = jest.fn().mockResolvedValue({});
const mockSendEmail = jest.fn().mockResolvedValue({ id: 'mock-email-id' });

jest.mock('googleapis', () => ({
	google: {
		auth: {
			JWT: jest.fn().mockImplementation(() => ({})),
		},
		sheets: jest.fn(() => ({
			spreadsheets: {
				values: {
					append: mockAppend,
				},
			},
		})),
	},
}));

// Mock the extracted email module — we test email.ts separately
jest.mock('./email', () => ({
	sendEmail: mockSendEmail,
}));

import { POST } from './route';

function makeRequest(body: unknown): Request {
	return new Request('http://localhost/api/rsvp', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
}

describe('POST /api/rsvp', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('successful submissions', () => {
		it('returns 200 for a valid attending RSVP', async () => {
			const res = await POST(
				makeRequest({
					names: ['Jon Bernard'],
					email: 'jon@example.com',
					dietary: '',
					isAttending: true,
				}),
			);

			expect(res.status).toBe(200);
			expect(await res.json()).toEqual({ success: true });
		});

		it('writes the correct row to Google Sheets for an attending RSVP', async () => {
			await POST(
				makeRequest({
					names: ['Jon Bernard', 'Jane Bernard'],
					email: 'jon@example.com',
					dietary: 'Gluten free',
					isAttending: true,
				}),
			);

			expect(mockAppend).toHaveBeenCalledTimes(1);
			const row = mockAppend.mock.calls[0][0].requestBody.values[0];
			expect(row[0]).toBe('Jon Bernard, Jane Bernard'); // names
			expect(row[1]).toBe(2); // totalGuests (attending)
			expect(row[2]).toBe('jon@example.com'); // email
			expect(row[3]).toBe('Gluten free'); // dietary
			expect(row[4]).toBe('yes'); // isAttending
		});

		it('sets totalGuests to 0 for a not-attending RSVP', async () => {
			await POST(
				makeRequest({
					names: ['Jon Bernard'],
					email: '',
					dietary: '',
					isAttending: false,
				}),
			);

			const row = mockAppend.mock.calls[0][0].requestBody.values[0];
			expect(row[1]).toBe(0);
			expect(row[4]).toBe('no');
		});

		it('calls sendEmail with names and attendance status', async () => {
			await POST(
				makeRequest({
					names: ['Jon Bernard'],
					email: 'jon@example.com',
					dietary: '',
					isAttending: true,
				}),
			);

			expect(mockSendEmail).toHaveBeenCalledTimes(1);
			expect(mockSendEmail).toHaveBeenCalledWith(['Jon Bernard'], true);
		});

		it('calls sendEmail with isAttending=false for not-attending', async () => {
			await POST(
				makeRequest({
					names: ['Jon Bernard'],
					email: '',
					dietary: '',
					isAttending: false,
				}),
			);

			expect(mockSendEmail).toHaveBeenCalledWith(['Jon Bernard'], false);
		});

		it('trims whitespace from names before writing', async () => {
			await POST(
				makeRequest({
					names: ['  Jon Bernard  ', '  Jane  '],
					email: 'jon@example.com',
					dietary: '',
					isAttending: true,
				}),
			);

			const row = mockAppend.mock.calls[0][0].requestBody.values[0];
			expect(row[0]).toBe('Jon Bernard, Jane');
			expect(mockSendEmail).toHaveBeenCalledWith(['Jon Bernard', 'Jane'], true);
		});
	});

	describe('validation errors', () => {
		it('returns 400 when names array is empty', async () => {
			const res = await POST(
				makeRequest({ names: [], email: '', dietary: '', isAttending: true }),
			);

			expect(res.status).toBe(400);
			expect(await res.json()).toEqual({ error: 'At least one attendee name is required' });
			expect(mockAppend).not.toHaveBeenCalled();
			expect(mockSendEmail).not.toHaveBeenCalled();
		});

		it('returns 400 when a name is an empty string', async () => {
			const res = await POST(
				makeRequest({ names: [''], email: '', dietary: '', isAttending: true }),
			);

			expect(res.status).toBe(400);
			expect(mockAppend).not.toHaveBeenCalled();
		});

		it('returns 400 when a name is only whitespace', async () => {
			const res = await POST(
				makeRequest({ names: ['   '], email: '', dietary: '', isAttending: true }),
			);

			expect(res.status).toBe(400);
		});

		it('returns 400 when names is not an array', async () => {
			const res = await POST(
				makeRequest({ names: 'Jon Bernard', email: '', dietary: '', isAttending: true }),
			);

			expect(res.status).toBe(400);
		});
	});

	describe('error handling', () => {
		it('returns 500 when Google Sheets throws', async () => {
			jest.spyOn(console, 'error').mockImplementation(() => {});
			mockAppend.mockRejectedValueOnce(new Error('Sheets API error'));

			const res = await POST(
				makeRequest({
					names: ['Jon Bernard'],
					email: 'jon@example.com',
					dietary: '',
					isAttending: true,
				}),
			);

			expect(res.status).toBe(500);
			expect(await res.json()).toEqual({ error: 'Failed to submit RSVP' });
		});

		it('returns 500 when sendEmail throws', async () => {
			jest.spyOn(console, 'error').mockImplementation(() => {});
			mockSendEmail.mockRejectedValueOnce(new Error('Email send failed'));

			const res = await POST(
				makeRequest({
					names: ['Jon Bernard'],
					email: 'jon@example.com',
					dietary: '',
					isAttending: true,
				}),
			);

			expect(res.status).toBe(500);
			expect(await res.json()).toEqual({ error: 'Failed to submit RSVP' });
		});
	});
});
