import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import BrainIcon from "../components/icons/BrainIcon";
import ShareIcon from "../components/icons/ShareIcon";
import axios from "axios";
import Button from "../components/Button";
import PlusIcon from "../components/icons/PlusIcon";
import Sidebar from "../components/Sidebar";
import LoadingSpinnerIcon from "../components/icons/LoadingSpinnerIcon";

interface BrainContent {
	id: string;
	title: string;
	link: string;
	type: "youtube" | "tweet" | "instagram" | "linkedin";
	createdAt: string;
	tags?: string[];
	userId: string;
}

interface BrainData {
	id: string;
	title: string;
	description?: string;
	owner: string;
	contentCount: number;
	createdAt: string;
	content: BrainContent[];
}

export default function SharedBrain() {
	const { hash } = useParams<{ hash: string }>();
	const navigate = useNavigate();

	const [brainData, setBrainData] = useState<BrainData | null>(null);
	const [filteredContents, setFilteredContents] = useState<BrainContent[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [shareModalOpen, setShareModalOpen] = useState(false);
	const [copiedLink, setCopiedLink] = useState(false);

	const [sidebarOpen, setSidebarOpen] = useState(false);

	// Fetch brain data
	useEffect(() => {
		const fetchBrainData = async () => {
			if (!hash) return;

			setLoading(true);
			setError(null);

			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/link/${hash}`,
				);

				if (response.status !== 200) {
					if (response.status === 404) {
						throw new Error("This brain doesn't exist or has been removed");
					}
					throw new Error("Failed to load brain content");
				}
				const { data } = response;
				console.log(data);
				setBrainData(data);
				setFilteredContents(data.content);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Something went wrong");
			} finally {
				setLoading(false);
			}
		};

		fetchBrainData();
	}, [hash]);

	// Copy link to clipboard
	const handleCopyLink = () => {
		const url = window.location.href;
		navigator.clipboard.writeText(url);
		setCopiedLink(true);
		setTimeout(() => setCopiedLink(false), 2500);
	};

	// Loading State
	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen text-2xl text-indigo-600 gap-4">
				<span>
					<LoadingSpinnerIcon />
				</span>
				<span>Loading</span>
			</div>
		);
	}

	// Error State
	if (error) {
		return (
			<div
				className="min-h-screen flex items-center justify-center p-4"
				style={{
					background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
				}}
			>
				<div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center transform transition-all">
					<div className="w-20 h-20 bg-linear-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
						<svg
							className="w-10 h-10 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>
					<h2 className="text-3xl font-bold text-gray-900 mb-3">Oops!</h2>
					<p className="text-gray-600 mb-8 text-lg">{error}</p>
					<button
						onClick={() => navigate("/")}
						className="px-8 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:shadow-xl transform hover:scale-105 transition-all font-semibold"
					>
						← Go to Homepage
					</button>
				</div>
			</div>
		);
	}

	// Empty State
	if (!brainData || brainData.content.length === 0) {
		return (
			<div
				className="min-h-screen flex items-center justify-center p-4"
				style={{
					background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
				}}
			>
				<div className="text-center">
					<div className="w-24 h-24 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
						<BrainIcon size={48} />
					</div>
					<h2 className="text-4xl font-bold text-white mb-3">No Content Yet</h2>
					<p className="text-white/80 text-lg">
						This brain doesn't have any content to display.
					</p>
				</div>
			</div>
		);
	}

	const contentCounts = {
		youtube: brainData.content.filter((c) => c.type === "youtube").length,
		tweet: brainData.content.filter((c) => c.type === "tweet").length,
		instagram: brainData.content.filter((c) => c.type === "instagram").length,
		linkedin: brainData.content.filter((c) => c.type === "linkedin").length,
		all: brainData.content.length,
	};
	const filterCardsByType = (type: string) => {
		if (type === "all") {
			setFilteredContents(brainData.content);
			return;
		}
		setFilteredContents(brainData.content.filter((card) => card.type === type));
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Sidebar */}
			<Sidebar
				isOpen={sidebarOpen}
				onClose={() => setSidebarOpen(false)}
				filter={filterCardsByType}
				count={contentCounts}
			/>

			<div className="lg:ml-72 min-h-screen">
				{/* Header */}
				<header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						{/* Mobile menu button */}
						<button
							onClick={() => setSidebarOpen(true)}
							className="lg:hidden p-2 rounded-md hover:bg-gray-100"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>

						{!localStorage.getItem("token") ? (
							<Button onClick={() => navigate("/signin")}>
								Add your own brain
							</Button>
						) : (
							<Button onClick={() => navigate("/")}>View your brain</Button>
						)}
					</div>
				</header>

				{/* Content Area */}
				<main className="p-4 sm:p-6 lg:p-8">
					{/* Stats or Filters Section (Optional) */}
					<div className="mb-6 flex items-center justify-between gap-8 flex-wrap">
						<div className="bg-white px-8 py-4 rounded-lg shadow-sm border border-gray-200 flex flex-col items-start">
							<p className="text-md text-gray-600">Total Content</p>
							<p className="text-2xl font-semibold">
								{filteredContents?.length}
							</p>
						</div>
						{/* Add more stats as needed */}
						<div className="flex items-center">
							<h1 className="text-xl text-gray-900">
								You are viewing{" "}
								<span className="font-bold">{brainData?.owner}'s</span> Second
								Brain
							</h1>
						</div>
					</div>

					{/* Masonry Grid */}
					<div className="columns-1 md:columns-2 xl:columns-3 2xl:columns-4gap-4 space-y-4">
						{filteredContents?.length > 0 &&
							filteredContents.map((card) => (
								<div
									key={card.link}
									className="break-inside-avoid"
								>
									<Card
										_id={card.id}
										title={card.title}
										link={card.link}
										type={card.type}
									/>
								</div>
							))}
					</div>

					{/* Empty State */}
					{filteredContents?.length === 0 && (
						<div className="flex flex-col items-center justify-center py-12">
							<div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
								<PlusIcon
									size={32}
									color="#9CA3AF"
								/>
							</div>
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								No content found on the shared brain
							</h3>
							<p className="text-gray-600 mb-4">
								wanna start adding your content? click the button below
							</p>
							<Button onClick={() => navigate("/signup")}>Add Content</Button>
						</div>
					)}
				</main>
			</div>

			{/* Share Modal */}
			{shareModalOpen && (
				<div
					className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
					onClick={() => setShareModalOpen(false)}
				>
					<div
						className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full transform transition-all"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="text-center mb-6">
							<div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
								<ShareIcon size={28} />
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-2">
								Share This Brain
							</h3>
							<p className="text-gray-600">Copy the link below to share</p>
						</div>

						<div className="bg-gray-50 rounded-xl p-4 mb-6 flex items-center gap-3">
							<input
								type="text"
								value={window.location.href}
								readOnly
								className="flex-1 bg-transparent text-gray-700 text-sm outline-none"
							/>
							<button
								onClick={handleCopyLink}
								className="px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
							>
								{copiedLink ? "✓ Copied" : "Copy"}
							</button>
						</div>

						<button
							onClick={() => setShareModalOpen(false)}
							className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
						>
							Close
						</button>
					</div>
				</div>
			)}

			{/* Footer */}
			{/* <footer className="mt-20 border-t border-gray-200 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="flex flex-col sm:flex-row items-center justify-between gap-6">
						<div className="flex items-center gap-3">
							<div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg">
								<BrainIcon
									size={24}
									className="text-white"
								/>
							</div>
							<div>
								<div className="font-bold text-gray-900">Second Brain</div>
								<div className="text-sm text-gray-500">
									Organize & Share Knowledge
								</div>
							</div>
						</div>
						<div className="flex items-center gap-6 text-sm">
							<a
								href="#"
								className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
							>
								Privacy
							</a>
							<a
								href="#"
								className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
							>
								Terms
							</a>
							<a
								href="/"
								className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
							>
								Create Your Brain
							</a>
						</div>
					</div>
				</div>
			</footer> */}

			{/* Add CSS for animations */}
			<style>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</div>
	);
}
