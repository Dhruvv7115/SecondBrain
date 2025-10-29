import type { IconProps } from ".";

// components/icons/InstagramIcon.tsx
export default function InstagramIcon({
	size = 20,
	color = "currentColor",
}: IconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 551.034 551.034"
			fill="none"
		>
			<defs>
				<linearGradient
					id="instagramGradient"
					x1="275.517"
					y1="4.5714"
					x2="275.517"
					y2="549.7202"
					gradientTransform="matrix(1 0 0 -1 0 554)"
					gradientUnits="userSpaceOnUse"
				>
					<stop
						offset="0"
						stopColor="#E09B3D"
					/>
					<stop
						offset="0.3"
						stopColor="#C74C4D"
					/>
					<stop
						offset="0.6"
						stopColor="#C21975"
					/>
					<stop
						offset="1"
						stopColor="#7024C4"
					/>
				</linearGradient>
			</defs>
			<path
				d="M386.878,0H164.156C73.64,0,0,73.64,0,164.156v222.722 c0,90.516,73.64,164.156,164.156,164.156h222.722c90.516,0,164.156-73.64,164.156-164.156V164.156 C551.033,73.64,477.393,0,386.878,0z M495.6,386.878c0,60.045-48.677,108.722-108.722,108.722H164.156 c-60.045,0-108.722-48.677-108.722-108.722V164.156c0-60.046,48.677-108.722,108.722-108.722h222.722 c60.045,0,108.722,48.676,108.722,108.722L495.6,386.878L495.6,386.878z"
				fill="url(#instagramGradient)"
			/>
			<path
				d="M275.517,133C196.933,133,133,196.933,133,275.516 s63.933,142.517,142.517,142.517S418.034,354.1,418.034,275.516S354.101,133,275.517,133z M275.517,362.6 c-48.095,0-87.083-38.988-87.083-87.083s38.989-87.083,87.083-87.083c48.095,0,87.083,38.988,87.083,87.083 C362.6,323.611,323.611,362.6,275.517,362.6z"
				fill="url(#instagramGradient)"
			/>
			<circle
				cx="418.306"
				cy="134.072"
				r="34.149"
				fill="url(#instagramGradient)"
			/>
		</svg>
	);
}
