import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
	return new ImageResponse(
		<div
			style={{
				width: 64,
				height: 64,
				background: '#3d2b1f',
				borderRadius: 8,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<span
				style={{
					color: '#f5f0e8',
					fontSize: 26,
					fontWeight: 900,
					lineHeight: 1,
					letterSpacing: '-0.5px',
				}}>
				T&amp;J
			</span>
		</div>,
		{ ...size },
	);
}
