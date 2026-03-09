import Image from 'next/image';

import { RsvpForm } from './components/RsvpForm';
import { RsvpScrollButton } from './components/RsvpScrollButton';

// ─── Photo frame / stub ──────────────────────────────────────────────────────

type PhotoProps = {
	src?: string;
	alt: string;
	rotate?: number;
	aspectRatio?: string;
};

function Photo({ src, alt, rotate = 0, aspectRatio = '4/3' }: PhotoProps) {
	return (
		<div
			className='photo-frame'
			style={{ transform: `rotate(${rotate}deg)` }}>
			{src ? (
				<div
					className='relative'
					style={{ aspectRatio }}>
					<Image
						src={src}
						alt={alt}
						fill
						className='object-cover block'
					/>
				</div>
			) : (
				<div
					className='photo-stub'
					style={{ aspectRatio }}
				/>
			)}
		</div>
	);
}

// ─── Sparkle decoration ───────────────────────────────────────────────────────

function Sparkle({ style }: { style?: React.CSSProperties }) {
	return (
		<span
			aria-hidden
			className='absolute text-gold opacity-50 text-base select-none'
			style={style}>
			✦
		</span>
	);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
	return (
		<main className='bg-cream min-h-screen'>
			{/* ── Collage Section (top 3 photos) ── */}
			<section className='collage-bg bg-paper-tan pt-12 px-8 pb-10'>
				<div className='max-w-[700px] mx-auto'>
					<div className='collage-top-grid'>
						<div className='collage-large-photo'>
							<Photo
								alt='Wedding Exit · 1976'
								rotate={-2}
								aspectRatio='3/4'
								src='/images/bernard-1.jpg'
							/>
						</div>
						<Photo
							alt='Tom & Jane · Toasting'
							rotate={3.5}
							aspectRatio='4/3'
							src='/images/bernard-2.jpg'
						/>
						<Photo
							alt='Tom & Jane · Portrait'
							rotate={-1.5}
							aspectRatio='4/3'
							src='/images/bernard-3.jpg'
						/>
					</div>
				</div>
			</section>

			{/* ── Invitation Text Section ── */}
			<section className='bg-cream px-8 py-24'>
				<div className='invite-grid max-w-[1000px] mx-auto'>
					{/* Left: headline */}
					<div className='text-center'>
						<div className='section-rule mb-[14px]'>
							<span className='font-playfair text-[1.05rem] tracking-[0.15em] text-brown-medium whitespace-nowrap'>
								Join Us To Celebrate
							</span>
						</div>

						<h1 className='font-playfair text-[clamp(1.5rem,4.75vw,3.2rem)] font-extrabold tracking-[0.06em] text-brown mt-0 mb-[6px] uppercase leading-[1.1]'>
							Tom &amp; Jane Bernard
						</h1>

						<div className='section-rule mt-[10px]'>
							<span className='font-playfair text-[1.4rem] tracking-[0.18em] [font-variant:small-caps] text-brown font-semibold whitespace-nowrap'>
								50 Years!
							</span>
						</div>
					</div>

					{/* Right: event details */}
					<div className='invite-details font-cormorant text-[1.25rem] italic text-brown leading-6 text-xl'>
						<p className='m-0 text-2xl font-semibold'>Sunday, June 7th, 2026</p>
						<p className='mt-0 mb-8 text-2xl'>1:00pm – 5:00pm</p>
						<a
							href='https://maps.google.com/?q=The+Center+at+Stonehill+Village,+1300+Shorthill+Dr,+Xenia,+OH+45385'
							target='_blank'
							rel='noopener noreferrer'
							className='text-brown underline decoration-dotted underline-offset-2 hover:text-brown-medium transition-colors duration-150'>
							<p className='m-0'>The Center at Stonehill Village</p>
							<p className='m-0'>1300 Shorthill Dr,</p>
							<p className='m-0'>Xenia, OH 45385</p>
						</a>
					</div>
				</div>
			</section>

			{/* ── Divider ── */}
			<div className='h-px bg-brown-light mx-auto opacity-[0.35]' />

			{/* ── Collage Section (bottom 2 photos) ── */}
			<section className='collage-bg bg-paper-tan pt-10 px-8 pb-[52px]'>
				<div className='max-w-[900px] mx-auto'>
					<div className='collage-bottom-grid'>
						<Photo
							alt='Tom & Jane · Present Day'
							rotate={-2.5}
							aspectRatio='4/3'
							src='/images/bernard-4.jpg'
						/>
						<Photo
							alt='Tom & Jane · Scenic Overlook'
							rotate={2}
							aspectRatio='4/3'
							src='/images/bernard-5.jpg'
						/>
					</div>
				</div>
			</section>

			{/* ── Story Section ── */}
			<section className='bg-paper-light pt-[60px] px-8 pb-[90px] relative overflow-hidden'>
				<Sparkle style={{ top: 28, left: 28 }} />
				<Sparkle style={{ top: 28, right: 28 }} />
				<Sparkle style={{ top: 76, left: 60 }} />
				<Sparkle style={{ top: 76, right: 60 }} />
				<Sparkle style={{ bottom: 28, left: 28 }} />
				<Sparkle style={{ bottom: 28, right: 28 }} />
				<Sparkle style={{ bottom: 76, left: 60 }} />
				<Sparkle style={{ bottom: 76, right: 60 }} />

				<div className='max-w-[720px] mx-auto relative z-1'>
					{/* Two photos from back of invite */}
					<div className='story-photos'>
						<div className='story-photo-a'>
							<Photo
								alt='Tom & Jane · Recent'
								rotate={-3}
								aspectRatio='4/3'
								src='/images/bernard-6.jpg'
							/>
						</div>
						<div className='story-photo-b'>
							<Photo
								alt='Wedding Portrait Close-up'
								rotate={2.5}
								aspectRatio='3/4'
								src='/images/bernard-7.jpg'
							/>
						</div>
					</div>

					{/* Lead quote */}
					<p className='font-cormorant text-[clamp(1.35rem,3vw,1.8rem)] font-semibold italic text-brown leading-[1.65] text-center mt-0 mb-7'>
						Join us as we celebrate Tom and Jane building a life, a family, and a legacy together
						across a half-century of marriage.
					</p>

					{/* Body text */}
					<p className='font-cormorant font-bold text-[1.05rem] tracking-[0.07em] uppercase text-brown-medium leading-[2.1] text-center mt-0 mb-7'>
						Through years of shared love, laughter, challenges, scouting adventures, church events,
						endless aviation trivia, and an uncountable number of perfect pies, they&apos;ve built
						an example of commitment and endurance that has shaped all our lives.
					</p>

					<div className='h-px bg-brown-light my-[72px] mx-auto opacity-[0.35]' />

					<p className='font-cormorant text-[clamp(1rem,3vw,1.5rem)] font-medium italic text-brown leading-normal text-center mt-0 mb-7'>
						Hors D&apos;oeuvres, Refreshments, and Desserts will be served.
					</p>

					<p className='font-cormorant text-[clamp(1rem,3vw,1.5rem)] font-medium italic text-brown leading-normal text-center mt-0 mb-7'>
						This party will be an Open House from 1pm - 5pm. You are invited to be there the entire
						time, or as much as you are able.
					</p>

					{/* No gifts */}
					<p className='font-cormorant text-[1.1rem] italic text-brown text-center tracking-[0.04em] m-0'>
						✦&nbsp; Please NO GIFTS. If you would like to bring a card, that will gladly be
						received. &nbsp;✦
					</p>
				</div>
			</section>

			{/* ── RSVP Section ── */}
			<section
				id='rsvp'
				className='bg-cream min-h-[calc(100dvh-68px)] md:min-h-[70dvh] pt-[60px] px-6 pb-20 text-center flex items-center'>
				<div className='max-w-[480px] mx-auto w-full'>
					<div className='section-rule mb-3'>
						<span className='font-playfair text-[2rem] font-bold tracking-[0.15em] text-brown uppercase'>
							RSVP
						</span>
					</div>

					<p className='font-cormorant text-[1.15rem] italic text-brown-medium mb-8'>
						Kindly reply by <strong className='text-brown'>June 4th</strong>
					</p>

					<RsvpForm />
				</div>
			</section>

			{/* ── Footer ── */}
			<footer className='bg-cream-dark py-[22px] px-6 text-center border-t border-brown-light/30'>
				<p className='font-cormorant text-[0.9rem] italic text-brown-light m-0'>
					Tom &amp; Jane Bernard &nbsp;✦&nbsp; 50 Years &nbsp;✦&nbsp; June 7th, 2026
				</p>
			</footer>

			<RsvpScrollButton />
		</main>
	);
}
