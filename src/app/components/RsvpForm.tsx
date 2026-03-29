'use client';

import {
	ActionIcon,
	Button,
	Group,
	Radio,
	RadioGroup,
	Stack,
	Text,
	Textarea,
	TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRef, useState } from 'react';

const mantineInputStyles = {
	label: {
		fontFamily: 'var(--font-cormorant)',
		fontSize: '1rem',
		color: 'var(--color-brown)',
		fontWeight: 600,
		letterSpacing: '0.05em',
	},
	input: {
		fontFamily: 'var(--font-cormorant)',
		fontSize: '1.1rem',
		borderColor: 'var(--color-brown-light)',
		backgroundColor: 'white',
	},
};

export function RsvpForm() {
	const [names, setNames] = useState<string[]>(['']);
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [dietary, setDietary] = useState('');
	const [nameErrors, setNameErrors] = useState<string[]>(['']);
	const [isAttending, setIsAttending] = useState(true);
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	const isFormValid =
		names.every((n) => n.trim().length > 0) &&
		(!isAttending || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()));

	const updateName = (index: number, value: string) => {
		setNames((prev) => prev.map((n, i) => (i === index ? value : n)));
		setNameErrors((prev) => prev.map((e, i) => (i === index ? '' : e)));
	};

	const addGuest = () => {
		setNames((prev) => {
			const next = [...prev, ''];
			setTimeout(() => inputRefs.current[next.length - 1]?.focus(), 0);
			return next;
		});
		setNameErrors((prev) => [...prev, '']);
	};

	const removeGuest = (index: number) => {
		setNames((prev) => prev.filter((_, i) => i !== index));
		setNameErrors((prev) => prev.filter((_, i) => i !== index));
	};

	const validate = () => {
		const nameErrs = names.map((n) => (n.trim().length === 0 ? 'Please enter a name' : ''));
		setNameErrors(nameErrs);

		const emailTrimmed = email.trim();

		let emailErr = '';

		if (isAttending && emailTrimmed.length === 0) {
			emailErr = 'Please enter your email address';
		} else if (isAttending && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
			emailErr = 'Please enter a valid email address';
		}
		setEmailError(emailErr);

		return nameErrs.every((e) => e === '') && emailErr === '';
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		setLoading(true);
		try {
			const res = await fetch('/api/rsvp', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ names, email: email.trim(), dietary, isAttending }),
			});
			if (!res.ok) throw new Error('Submission failed');
			setSubmitted(true);
		} catch {
			notifications.show({
				title: 'Something went wrong',
				message: 'Please try again or contact us directly.',
				color: 'red',
			});
		} finally {
			setLoading(false);
		}
	};

	if (submitted) {
		return (
			<div className='text-center py-6'>
				<Text className='font-playfair text-[1.5rem] text-brown mb-3'>
					{isAttending ? `We'll see you there!` : "We'll miss you!"}
				</Text>
				<Text className='font-cormorant text-[1.1rem] italic text-brown-medium'>
					{isAttending
						? 'Thank you for your RSVP. We look forward to celebrating with you.'
						: 'Thank you for your RSVP. We hope to see you soon.'}
				</Text>
				<Button
					onClick={() => {
						setSubmitted(false);
						setNames(['']);
						setEmail('');
						setEmailError('');
						setDietary('');
						setNameErrors(['']);
						setIsAttending(true);
					}}
					size='sm'
					color='brown'
					className='font-playfair tracking-[0.12em] font-semibold mt-16'>
					Add another guest
				</Button>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit}>
			<Stack gap='md'>
				{/* Attendee name list */}
				<div>
					<Text
						component='label'
						className='font-cormorant text-base text-brown font-semibold tracking-[0.05em] block mb-2'>
						Attendee Names
					</Text>
					<Stack gap='xs'>
						{names.map((name, index) => (
							<Group
								key={index}
								gap='xs'
								align='flex-start'>
								<TextInput
									ref={(el) => {
										inputRefs.current[index] = el;
									}}
									placeholder={index === 0 ? 'Your name' : `Guest ${index + 1}`}
									value={name}
									onChange={(e) => updateName(index, e.currentTarget.value)}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											e.preventDefault();
											addGuest();
										}
									}}
									error={nameErrors[index] || undefined}
									size='md'
									style={{ flex: 1 }}
									styles={{ input: mantineInputStyles.input }}
									aria-label={`Attendee ${index + 1}`}
								/>
								{names.length > 1 && (
									<ActionIcon
										onClick={() => removeGuest(index)}
										variant='subtle'
										color='brown'
										size='lg'
										mt={4}
										aria-label='Remove guest'
										className='text-brown-light'>
										×
									</ActionIcon>
								)}
							</Group>
						))}
					</Stack>
					<Button
						onClick={addGuest}
						variant='subtle'
						size='sm'
						mt='xs'
						color='brown'
						className='font-cormorant text-base italic tracking-[0.04em]'>
						+ Add another guest
					</Button>
				</div>

				<RadioGroup
					label='Will you be attending?'
					value={isAttending ? 'yes' : 'no'}
					withAsterisk
					classNames={{ root: isAttending ? '' : 'mb-6' }}>
					<Group
						mt='xs'
						justify='center'>
						<Radio
							value='yes'
							label={`Yes, ${names.length > 1 ? 'we' : 'I'} will be attending`}
							onChange={() => setIsAttending(true)}
						/>
						<Radio
							value='no'
							label={`No, ${names.length > 1 ? 'we' : 'I'} will not be attending`}
							onChange={() => setIsAttending(false)}
						/>
					</Group>
				</RadioGroup>

				{isAttending && (
					<>
						{/* Email */}
						<TextInput
							label='Email Address'
							placeholder='your@email.com'
							type='email'
							size='md'
							required
							value={email}
							onChange={(e) => {
								setEmail(e.currentTarget.value);
								setEmailError('');
							}}
							error={emailError || undefined}
							styles={mantineInputStyles}
						/>

						{/* Dietary restrictions */}
						<Textarea
							label='Dietary Restrictions / Notes'
							placeholder='Any allergies or dietary needs? (optional)'
							size='md'
							autosize
							minRows={2}
							styles={mantineInputStyles}
							value={dietary}
							onChange={(e) => setDietary(e.currentTarget.value)}
						/>
					</>
				)}

				<Button
					type='submit'
					loading={loading}
					size='md'
					color='brown'
					disabled={!isFormValid}
					className='font-playfair tracking-[0.12em] font-semibold'>
					SEND RSVP
				</Button>
			</Stack>
		</form>
	);
}
