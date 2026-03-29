import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RsvpForm } from './RsvpForm';

// Avoid needing a real Mantine Notifications provider
jest.mock('@mantine/notifications', () => ({
	notifications: {
		show: jest.fn(),
	},
}));

// Mantine components use ResizeObserver in some versions
global.ResizeObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}));

function renderForm() {
	return render(
		<MantineProvider>
			<RsvpForm />
		</MantineProvider>,
	);
}

describe('RsvpForm', () => {
	let user: ReturnType<typeof userEvent.setup>;

	beforeEach(() => {
		user = userEvent.setup();
		jest.clearAllMocks();
		global.fetch = jest.fn();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('initial render', () => {
		it('renders the name input and submit button', () => {
			renderForm();
			expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /send rsvp/i })).toBeInTheDocument();
		});

		it('renders the attendance radio buttons', () => {
			renderForm();
			expect(screen.getByRole('radio', { name: /will be attending/i })).toBeInTheDocument();
			expect(screen.getByRole('radio', { name: /will not be attending/i })).toBeInTheDocument();
		});

		it('shows email and dietary fields by default (attending = yes)', () => {
			renderForm();
			expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
			expect(
				screen.getByPlaceholderText(/allergies or dietary needs/i),
			).toBeInTheDocument();
		});

		it('disables the submit button when the name field is empty', () => {
			renderForm();
			expect(screen.getByRole('button', { name: /send rsvp/i })).toBeDisabled();
		});
	});

	describe('attending toggle', () => {
		it('hides email and dietary fields when "not attending" is selected', async () => {
			renderForm();
			await user.type(screen.getByPlaceholderText('Your name'), 'Jon Bernard');
			await user.click(screen.getByRole('radio', { name: /will not be attending/i }));

			expect(screen.queryByPlaceholderText('your@email.com')).not.toBeInTheDocument();
			expect(
				screen.queryByPlaceholderText(/allergies or dietary needs/i),
			).not.toBeInTheDocument();
		});

		it('shows email and dietary fields again when switching back to attending', async () => {
			renderForm();
			await user.click(screen.getByRole('radio', { name: /will not be attending/i }));
			await user.click(screen.getByRole('radio', { name: /will be attending/i }));

			expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
		});
	});

	describe('guest list', () => {
		it('enables submit button once a name is entered', async () => {
			renderForm();
			await user.type(screen.getByPlaceholderText('Your name'), 'Jon Bernard');
			// Email is required when attending, so still disabled until email filled
			await user.type(screen.getByPlaceholderText('your@email.com'), 'jon@example.com');
			expect(screen.getByRole('button', { name: /send rsvp/i })).not.toBeDisabled();
		});

		it('adds a second guest input when "+ Add another guest" is clicked', async () => {
			renderForm();
			await user.click(screen.getByRole('button', { name: /add another guest/i }));
			expect(screen.getByPlaceholderText('Guest 2')).toBeInTheDocument();
		});

		it('removes a guest when the remove button is clicked', async () => {
			renderForm();
			await user.click(screen.getByRole('button', { name: /add another guest/i }));
			expect(screen.getByPlaceholderText('Guest 2')).toBeInTheDocument();

			await user.click(screen.getAllByRole('button', { name: /remove guest/i })[0]);
			expect(screen.queryByPlaceholderText('Guest 2')).not.toBeInTheDocument();
		});
	});

	describe('validation', () => {
		it('shows an error when submitting with an empty name', async () => {
			renderForm();
			// Directly fire submit since button is disabled — test via form submit
			fireEvent.submit(screen.getByRole('button', { name: /send rsvp/i }).closest('form')!);
			await waitFor(() => {
				expect(screen.getByText('Please enter a name')).toBeInTheDocument();
			});
		});

		it('shows an error when attending but email is missing', async () => {
			renderForm();
			await user.type(screen.getByPlaceholderText('Your name'), 'Jon Bernard');
			fireEvent.submit(screen.getByRole('button', { name: /send rsvp/i }).closest('form')!);
			await waitFor(() => {
				expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
			});
		});

		it('shows an error for an invalid email format', async () => {
			renderForm();
			await user.type(screen.getByPlaceholderText('Your name'), 'Jon Bernard');
			await user.type(screen.getByPlaceholderText('your@email.com'), 'not-an-email');
			fireEvent.submit(screen.getByRole('button', { name: /send rsvp/i }).closest('form')!);
			await waitFor(() => {
				expect(screen.getByText(/valid email/i)).toBeInTheDocument();
			});
		});
	});

	describe('form submission', () => {
		it('calls fetch with the correct payload on a valid attending submission', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

			renderForm();
			await user.type(screen.getByPlaceholderText('Your name'), 'Jon Bernard');
			await user.type(screen.getByPlaceholderText('your@email.com'), 'jon@example.com');
			await user.type(
				screen.getByPlaceholderText(/allergies or dietary needs/i),
				'None',
			);
			await user.click(screen.getByRole('button', { name: /send rsvp/i }));

			await waitFor(() => {
				expect(global.fetch).toHaveBeenCalledWith(
					'/api/rsvp',
					expect.objectContaining({
						method: 'POST',
						body: expect.stringContaining('"isAttending":true'),
					}),
				);
			});

			const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
			expect(body.names).toEqual(['Jon Bernard']);
			expect(body.email).toBe('jon@example.com');
			expect(body.dietary).toBe('None');
			expect(body.isAttending).toBe(true);
		});

		it('calls fetch with isAttending false when not attending', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

			renderForm();
			await user.type(screen.getByPlaceholderText('Your name'), 'Jon Bernard');
			await user.click(screen.getByRole('radio', { name: /will not be attending/i }));
			await user.click(screen.getByRole('button', { name: /send rsvp/i }));

			await waitFor(() => expect(global.fetch).toHaveBeenCalled());
			const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
			expect(body.isAttending).toBe(false);
		});

		it('shows a success message after a successful submission', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

			renderForm();
			await user.type(screen.getByPlaceholderText('Your name'), 'Jon Bernard');
			await user.type(screen.getByPlaceholderText('your@email.com'), 'jon@example.com');
			await user.click(screen.getByRole('button', { name: /send rsvp/i }));

			await waitFor(() => {
				expect(screen.getByText(/see you there/i)).toBeInTheDocument();
			});
		});

		it('shows a "miss you" message when not attending and submission succeeds', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

			renderForm();
			await user.type(screen.getByPlaceholderText('Your name'), 'Jon Bernard');
			await user.click(screen.getByRole('radio', { name: /will not be attending/i }));
			await user.click(screen.getByRole('button', { name: /send rsvp/i }));

			await waitFor(() => {
				expect(screen.getByText(/miss you/i)).toBeInTheDocument();
			});
		});

		it('shows an error notification when the API call fails', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

			const { notifications } = require('@mantine/notifications');

			renderForm();
			await user.type(screen.getByPlaceholderText('Your name'), 'Jon Bernard');
			await user.type(screen.getByPlaceholderText('your@email.com'), 'jon@example.com');
			await user.click(screen.getByRole('button', { name: /send rsvp/i }));

			await waitFor(() => {
				expect(notifications.show).toHaveBeenCalledWith(
					expect.objectContaining({ color: 'red' }),
				);
			});
		});

		it('"Add another guest" button sends multiple names', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

			renderForm();
			await user.type(screen.getByPlaceholderText('Your name'), 'Jon Bernard');
			await user.click(screen.getByRole('button', { name: /add another guest/i }));
			await user.type(screen.getByPlaceholderText('Guest 2'), 'Jane Bernard');
			await user.type(screen.getByPlaceholderText('your@email.com'), 'jon@example.com');
			await user.click(screen.getByRole('button', { name: /send rsvp/i }));

			await waitFor(() => expect(global.fetch).toHaveBeenCalled());
			const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
			expect(body.names).toEqual(['Jon Bernard', 'Jane Bernard']);
		});

		it('resets the form when "Add another guest" is clicked on the success screen', async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

			renderForm();
			await user.type(screen.getByPlaceholderText('Your name'), 'Jon Bernard');
			await user.type(screen.getByPlaceholderText('your@email.com'), 'jon@example.com');
			await user.click(screen.getByRole('button', { name: /send rsvp/i }));

			await waitFor(() => screen.getByText(/see you there/i));
			await user.click(screen.getByRole('button', { name: /add another guest/i }));

			expect(screen.getByPlaceholderText('Your name')).toHaveValue('');
		});
	});
});
