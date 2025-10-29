import type { IconProps } from ".";
export default function BrainIcon({
	size = 20,
	color = "currentColor",
}: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke={color}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="icon icon-tabler icons-tabler-outline icon-tabler-brain"
		>
			<path
				stroke="none"
				d="M0 0h24v24H0z"
				fill="none"
			/>
			<path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
			<path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
			<path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
			<path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
			<path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
			<path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" />
		</svg>
	);
}
