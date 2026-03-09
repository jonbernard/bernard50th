import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Playfair_Display } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
	variable: '--font-playfair',
	subsets: ['latin'],
	weight: ['400', '600', '700', '800'],
});

const cormorant = Cormorant_Garamond({
	variable: '--font-cormorant',
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	style: ['normal', 'italic'],
});

const theme = createTheme({
	primaryColor: 'brown',
	colors: {
		brown: [
			'#f9f5f0',
			'#f0e6d8',
			'#dcc4a8',
			'#c9a27a',
			'#b8845a',
			'#9e6840',
			'#7d5030',
			'#5e3a21',
			'#3d2b1f',
			'#2a1d14',
		],
	},
	fontFamily: `var(--font-cormorant), Georgia, serif`,
	headings: {
		fontFamily: `var(--font-playfair), Georgia, serif`,
	},
});

export const metadata: Metadata = {
	metadataBase: new URL('https://bernard50th.com'),
	title: 'Tom & Jane Bernard — Celebrating 50 Years!',
	description:
		"Join us to celebrate Tom & Jane Bernard's 50th wedding anniversary on Sunday, June 7th, 2026 from 1–5pm at The Center at Stonehill Village in Xenia, OH.",
	openGraph: {
		title: 'Tom & Jane Bernard — Celebrating 50 Years!',
		description:
			"Join us to celebrate Tom & Jane Bernard's 50th wedding anniversary on Sunday, June 7th, 2026 from 1–5pm at The Center at Stonehill Village in Xenia, OH.",
		url: 'https://bernard50th.com',
		siteName: 'Tom & Jane Bernard 50th Anniversary',
		images: [
			{
				url: '/images/bernard-1.jpg',
				alt: 'Tom & Jane Bernard — Wedding Day 1976',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Tom & Jane Bernard — Celebrating 50 Years!',
		description:
			"Join us to celebrate Tom & Jane Bernard's 50th wedding anniversary on Sunday, June 7th, 2026.",
		images: ['/images/bernard-1.jpg'],
	},
};

export const viewport: Viewport = {
	themeColor: '#3d2b1f',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
				<ColorSchemeScript />
			</head>
			<body className={`${playfair.variable} ${cormorant.variable}`}>
				<MantineProvider
					theme={theme}
					forceColorScheme='light'>
					<Notifications position='top-center' />
					{children}
				</MantineProvider>
				<Analytics />
			</body>
		</html>
	);
}
