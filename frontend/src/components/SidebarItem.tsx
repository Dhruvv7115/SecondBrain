import React from "react";
import { Link } from "react-router-dom";

interface SidebarItemProps {
	title: string;
	icon: React.ReactNode;
	href?: string;
	count?: number;
	active?: boolean;
	onClick?: () => void;
	variant?: "default" | "danger";
}
export default function SidebarItem({
	title,
	icon,
	href,
	count,
	active = false,
	onClick,
	variant = "default",
}: SidebarItemProps) {
	const baseClasses =
		"flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative";

	const variantClasses = {
		default: active
			? "bg-indigo-50 text-indigo-600"
			: "hover:bg-gray-50 text-gray-700 hover:text-gray-900",
		danger: "hover:bg-red-50 text-gray-700 hover:text-red-600",
	};

	const content = (
		<>
			{/* Active Indicator */}
			{active && (
				<div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full" />
			)}

			{/* Icon */}
			<span
				className={`${
					active ? "text-indigo-600" : "text-gray-400"
				} group-hover:text-current`}
			>
				{icon}
			</span>

			{/* Title */}
			<span className="flex-1 font-medium text-sm">{title}</span>

			{/* Count Badge */}
			{count && (
				<span
					className={`
          px-2 py-0.5 rounded-full text-xs font-medium
          ${
						active
							? "bg-indigo-600 text-white"
							: "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
					}
        `}
				>
					{count}
				</span>
			)}
		</>
	);

	if (href) {
		return (
			<Link
				to={href}
				className={`${baseClasses} ${variantClasses[variant]}`}
				onClick={onClick}
			>
				{content}
			</Link>
		);
	}

	return (
		<button
			className={`${baseClasses} ${variantClasses[variant]} w-full text-left`}
			onClick={onClick}
		>
			{content}
		</button>
	);
}
