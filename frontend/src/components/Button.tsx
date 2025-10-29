import React, { type ReactElement } from "react";
import LoadingSpinnerIcon from "./icons/LoadingSpinnerIcon";
interface ButtonProps {
	variant?: "primary" | "secondary" | "danger" | "danger-secondary";
	size?: "small" | "medium" | "large";
	startIcon?: ReactElement;
	endIcon?: ReactElement;
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
	fullWidth?: boolean;
	loading?: boolean;
	loadingText?: string;
}

const variantStyles: Record<string, string> = {
	primary: "bg-indigo-500 text-white hover:bg-indigo-600",
	secondary: "bg-indigo-100 text-indigo-500 hover:bg-indigo-200",
	danger: "bg-red-500 text-white hover:bg-red-600",
	"danger-secondary": "bg-red-50 text-red-500 hover:bg-red-100",
};

const sizeStyles: Record<string, string> = {
	small: "px-2 py-1 text-sm rounded",
	medium: "px-4 py-2 text-base rounded-md",
	large: "px-6 py-3 text-lg rounded-lg",
};

const defaultVariant = "primary";
const defaultSize = "medium";

export default function Button({
	variant = defaultVariant,
	size = defaultSize,
	startIcon,
	endIcon,
	children,
	onClick = () => {
		console.log("Button clicked");
	},
	className = "",
	fullWidth = false,
	loading = false,
	loadingText = "Loading...",
}: ButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`${variantStyles[variant]} ${
				sizeStyles[size]
			} flex items-center justify-center disabled:opacity-50 hover:cursor-pointer duration-300 transition-all ${className} ${
				fullWidth && "w-full"
			} ${loading ? "pointer-events-none opacity-70" : ""}`}
			disabled={loading}
		>
			{loading && (
				<span className="mr-3">
					<LoadingSpinnerIcon />
				</span>
			)}
			{startIcon && !loading && <span className="mr-3">{startIcon}</span>}
			{loading && loadingText ? loadingText : children}
			{endIcon && !loading && <span className="ml-3">{endIcon}</span>}
		</button>
	);
}
