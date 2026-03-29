/**
 * @jest-environment node
 */

const mockEmailsSend = jest.fn();

jest.mock('resend', () => ({
	Resend: jest.fn().mockImplementation(() => ({
		emails: {
			send: mockEmailsSend,
		},
	})),
}));

import { sendEmail } from './email';

describe('sendEmail', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockEmailsSend.mockResolvedValue({ id: 'mock-id', error: null });
	});

	it('sends to all three recipients', async () => {
		await sendEmail(['Jon Bernard'], true);

		const call = mockEmailsSend.mock.calls[0][0];
		expect(call.to).toEqual(
			expect.arrayContaining([
				'jon@jonbernard.net',
				'jenniecstoddart@gmail.com',
				'davebernard@gmail.com',
			]),
		);
	});

	it('includes the guest names in the subject', async () => {
		await sendEmail(['Jon Bernard', 'Jane Bernard'], true);

		const call = mockEmailsSend.mock.calls[0][0];
		expect(call.subject).toContain('Jon Bernard');
		expect(call.subject).toContain('Jane Bernard');
	});

	it('includes "Yes, attending" in the subject when attending', async () => {
		await sendEmail(['Jon Bernard'], true);
		expect(mockEmailsSend.mock.calls[0][0].subject).toContain('Yes, attending');
	});

	it('includes "Not attending" in the subject when not attending', async () => {
		await sendEmail(['Jon Bernard'], false);
		expect(mockEmailsSend.mock.calls[0][0].subject).toContain('Not attending');
	});

	it('includes the guest name in the email body', async () => {
		await sendEmail(['Jon Bernard'], true);
		expect(mockEmailsSend.mock.calls[0][0].html).toContain('Jon Bernard');
	});

	it('includes a link to the spreadsheet in the email body', async () => {
		await sendEmail(['Jon Bernard'], true);
		expect(mockEmailsSend.mock.calls[0][0].html).toContain('docs.google.com/spreadsheets');
	});

	it('shows a green badge for attending', async () => {
		await sendEmail(['Jon Bernard'], true);
		const html = mockEmailsSend.mock.calls[0][0].html as string;
		expect(html).toContain('#16a34a'); // green
		expect(html).toContain('Yes, attending');
	});

	it('shows a red badge for not attending', async () => {
		await sendEmail(['Jon Bernard'], false);
		const html = mockEmailsSend.mock.calls[0][0].html as string;
		expect(html).toContain('#dc2626'); // red
		expect(html).toContain('Not attending');
	});

	it('logs and returns when resend returns an error object', async () => {
		jest.spyOn(console, 'error').mockImplementation(() => {});
		mockEmailsSend.mockResolvedValueOnce({ error: { message: 'API error' } });

		// Should not throw — sendEmail handles error objects gracefully
		await expect(sendEmail(['Jon Bernard'], true)).resolves.not.toThrow();
		expect(console.error).toHaveBeenCalledWith({ message: 'API error' });
	});
});
