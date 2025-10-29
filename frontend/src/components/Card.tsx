import { useState, useEffect } from "react";
import ShareIcon from "./icons/ShareIcon";
import DeleteIcon from "./icons/DeleteIcon";
import DocumentIcon from "./icons/DocumentIcon";
import YoutubeIcon from "./icons/YoutubeIcon";
import XTwitterIcon from "./icons/XTwitterIcon";
import InstagramIcon from "./icons/InstagramIcon";

export interface CardProps {
	_id: string;
	title: string;
	link: string;
	type: "tweet" | "youtube" | "instagram";
	onDelete?: (_id: string) => void;
	onShare?: () => void;
}

export default function Card({
	_id,
	title,
	link,
	type,
	onDelete,
	onShare,
}: CardProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	// Reset states when link or type changes
	useEffect(() => {
		setIsLoading(true);
		setHasError(false);
	}, [link, type]);

	// Load Twitter widgets for tweet embeds
	useEffect(() => {
		if (type === "tweet" && !hasError) {
			// Load Twitter widgets script if not already loaded
			if (!(window as any).twttr) {
				const script = document.createElement("script");
				script.src = "https://platform.twitter.com/widgets.js";
				script.async = true;
				script.onload = () => {
					if ((window as any).twttr) {
						(window as any).twttr.widgets.load();
						setIsLoading(false);
					}
				};
				script.onerror = () => {
					setIsLoading(false);
					setHasError(true);
				};
				document.body.appendChild(script);
			} else {
				// Twitter script already loaded, just load the widget
				setTimeout(() => {
					(window as any).twttr.widgets.load();
					setIsLoading(false);
				}, 100);
			}
		}
	}, [type, link, hasError]);

	// Get the appropriate icon for the content type
	const getTypeIcon = () => {
		switch (type) {
			case "youtube":
				return <YoutubeIcon size={16} />;
			case "tweet":
				return <XTwitterIcon size={16} />;
			case "instagram":
				return <InstagramIcon size={16} />;
			default:
				return <DocumentIcon size={16} />;
		}
	};

	// Get type badge color
	const getTypeBadgeColor = () => {
		switch (type) {
			case "youtube":
				return "bg-red-100 text-red-700 border-red-200";
			case "tweet":
				return "bg-neutral-200 text-neutral-900 border-neutral-300";
			case "instagram":
				return "bg-gradient-to-br from-pink-500/10 via-fuchsia-500/20 to-purple-600/10 text-fuchsia-600 border-purple-200";
			default:
				return "bg-gray-100 text-gray-700 border-gray-200";
		}
	};

	// Process YouTube URL
	const getYoutubeEmbedUrl = (url: string) => {
		try {
			let videoId = "";

			if (url.includes("youtu.be/")) {
				videoId = url.split("youtu.be/")[1].split("?")[0];
			} else if (url.includes("watch?v=")) {
				videoId = url.split("watch?v=")[1].split("&")[0];
			} else if (url.includes("/embed/")) {
				videoId = url.split("/embed/")[1].split("?")[0];
			}

			return `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`;
		} catch {
			setHasError(true);
			return "";
		}
	};

	// Process Instagram URL
	const getInstagramEmbedUrl = (url: string) => {
		try {
			let cleanUrl = url.trim();
			if (cleanUrl.endsWith("/")) {
				cleanUrl = cleanUrl.slice(0, -1);
			}
			console.log(cleanUrl+"/embed")
			return `${cleanUrl}/embed`;
		} catch {
			setHasError(true);
			return "";
		}
	};

	// Process Twitter URL for blockquote
	const getTwitterUrl = (url: string) => {
		// Convert x.com to twitter.com for embed
		return url.replace("x.com", "twitter.com");
	};

	// Loading Component
	const LoadingState = () => (
		<div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
			<div className="relative">
				<div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
				<div className="absolute top-0 left-0 w-12 h-12 border-4 border-indigo-600 rounded-full animate-spin border-t-transparent"></div>
			</div>
			<p className="mt-4 text-sm text-gray-500">Loading {type} content...</p>
			<div className="mt-2 flex gap-1">
				<span
					className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
					style={{ animationDelay: "0ms" }}
				></span>
				<span
					className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
					style={{ animationDelay: "150ms" }}
				></span>
				<span
					className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
					style={{ animationDelay: "300ms" }}
				></span>
			</div>
		</div>
	);

	// Error Component
	const ErrorState = () => (
		<div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
			<div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
				<svg
					className="w-6 h-6 text-red-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>
			<p className="text-sm font-medium text-gray-900 mb-1">
				Failed to load content
			</p>
			<p className="text-xs text-gray-500 mb-3">
				The {type} content couldn't be loaded
			</p>
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
			>
				<span>Open original</span>
				<svg
					className="w-3 h-3"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
					/>
				</svg>
			</a>
		</div>
	);

	const handleShare = () => {
		if (onShare) {
			onShare();
		} else {
			// Default share behavior
			if (navigator.share) {
				navigator.share({
					title: title,
					url: link,
				});
			} else {
				// Fallback - copy to clipboard
				navigator.clipboard.writeText(link);
				// You might want to show a toast notification here
			}
		}
	};

	const handleDelete = () => {
		if (onDelete) {
			onDelete(_id);
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden group border border-neutral-200">
			{/* Card Header */}
			<div className="p-4 border-b border-gray-100">
				<div className="flex items-start justify-between gap-2">
					<div className="flex-1 min-w-0">
						{/* Type Badge */}
						<div className="mb-2">
							<span
								className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getTypeBadgeColor()}`}
							>
								{getTypeIcon()}
								<span className="capitalize">{type}</span>
							</span>
						</div>
						{/* Title */}
						<h3
							className="font-semibold text-gray-900 line-clamp-2"
							title={title}
						>
							{title}
						</h3>
					</div>

					{/* Action Buttons */}
					<div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
						<button
							className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
							title="Share"
							onClick={handleShare}
						>
							<ShareIcon size={18} />
						</button>
						<button
							className="p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-lg transition-colors"
							title="Delete"
							onClick={handleDelete}
						>
							<DeleteIcon size={18} />
						</button>
					</div>
				</div>
			</div>

			{/* Card Content */}
			<div className="relative bg-gray-50">
				{/* YouTube Embed */}
				{type === "youtube" && (
					<div className="relative w-full aspect-video bg-black">
						{isLoading && (
							<div className="absolute inset-0 z-10 bg-white">
								<LoadingState />
							</div>
						)}
						{hasError ? (
							<ErrorState />
						) : (
							<iframe
								className="absolute inset-0 w-full h-full"
								src={getYoutubeEmbedUrl(link)}
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerPolicy="strict-origin-when-cross-origin"
								allowFullScreen
								onLoad={() => setIsLoading(false)}
								onError={() => {
									setIsLoading(false);
									setHasError(true);
								}}
							/>
						)}
					</div>
				)}

				{/* Twitter/X Embed */}
				{type === "tweet" && (
					<div className="relative w-full min-h-[200px] max-h-[600px] overflow-y-auto">
						{isLoading && <LoadingState />}
						{hasError ? (
							<ErrorState />
						) : (
							<div
								className="p-4"
								style={{ display: isLoading ? "none" : "block" }}
							>
								<blockquote
									className="twitter-tweet"
									data-lang="en"
									data-dnt="true"
									data-theme="dark"
								>
									<a href={getTwitterUrl(link)}></a>
								</blockquote>
							</div>
						)}
					</div>
				)}

				{/* Instagram Embed */}
				{type === "instagram" && (
					<div className="relative w-full">
						{isLoading && (
							<div className="absolute inset-0 z-10 bg-white">
								<LoadingState />
							</div>
						)}
						{hasError ? (
							<ErrorState />
						) : (
							<div
								className="relative w-full"
								style={{ paddingBottom: "125%" }}
							>
								<iframe
									className="absolute inset-0 w-full h-full"
									src={getInstagramEmbedUrl(link)}
									allowTransparency={true}
									onLoad={() => {
										setTimeout(() => setIsLoading(false), 500);
									}}
									onError={() => {
										setIsLoading(false);
										setHasError(true);
									}}
								/>
							</div>
						)}
					</div>
				)}
			</div>

			{/* Card Footer */}
			<div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
				<div className="flex items-center justify-between text-xs">
					<div className="flex items-center gap-2 text-gray-500">
						<svg
							className="w-3.5 h-3.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>Added recently</span>
					</div>
					<a
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
					>
						<span>View source</span>
						<svg
							className="w-3 h-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	);
}
