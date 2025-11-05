import type { IconProps } from ".";

// components/icons/InstagramIcon.tsx
export default function InstagramLogoSVG({ size = 20, color = 'gradient' }: IconProps) {
	const gradientId = `instagramGradient-${Math.random().toString(36).slice(2, 9)}`;
	const useGradient = color === 'gradient';
	const fillColor = useGradient ? `url(#${gradientId})` : color;

	return (
		<svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
			{useGradient && (
				<defs>
					<linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
						<stop offset="0%" style={{stopColor: '#FFC107', stopOpacity: 1}} />
						<stop offset="25%" style={{stopColor: '#F44336', stopOpacity: 1}} />
						<stop offset="50%" style={{stopColor: '#E91E63', stopOpacity: 1}} />
						<stop offset="75%" style={{stopColor: '#9C27B0', stopOpacity: 1}} />
						<stop offset="100%" style={{stopColor: '#5E35B1', stopOpacity: 1}} />
					</linearGradient>
				</defs>
			)}

			<rect width="256" height="256" rx="55" ry="55" fill={fillColor}/>
			<rect x="40" y="40" width="176" height="176" rx="40" ry="40" fill="none" stroke="white" strokeWidth="16"/>
			<circle cx="128" cy="128" r="36" fill="none" stroke="white" strokeWidth="16"/>
			<circle cx="180" cy="76" r="10" fill="white"/>
		</svg>
	);
}