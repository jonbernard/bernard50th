'use client';

import { useEffect, useRef, useState } from 'react';

export function RsvpScrollButton() {
	const [visible, setVisible] = useState(true);
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		const target = document.getElementById('rsvp');
		if (!target) return;

		observerRef.current = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
			threshold: 0.1,
		});
		observerRef.current.observe(target);

		return () => observerRef.current?.disconnect();
	}, []);

	if (!visible) return null;

	return (
		<a
			href='#rsvp'
			className='fixed bottom-7 left-1/2 -translate-x-1/2 z-50 flex justify-center items-center gap-2 bg-brown text-cream py-3 px-7 rounded-full font-playfair text-[0.95rem] font-bold tracking-[0.12em] uppercase no-underline shadow-[0_4px_20px_rgba(61,43,31,0.35)] transition-[opacity,transform] duration-200 w-[98%] md:w-auto'>
			<span className='flex items-center gap-2'>
				RSVP
				<svg
					width='14'
					height='14'
					viewBox='0 0 14 14'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					aria-label='Scroll to RSVP section'
					aria-hidden
					role='presentation'>
					<path
						d='M7 1v12M7 13l-4-4M7 13l4-4'
						stroke='#c9a26a'
						strokeWidth='1.75'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</span>
		</a>
	);
}
