import { useEffect, useState } from "react";
import AddContentModal from "../components/AddContentModal";
import Button from "../components/Button";
import Card, { type CardProps } from "../components/Card";
import PlusIcon from "../components/icons/PlusIcon";
import ShareIcon from "../components/icons/ShareIcon";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { filter } from "motion/react-client";

function Dashboard() {
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	// Sample data - replace with your actual data
	const [cards, setCards] = useState<CardProps[]>([]);
	const [filteredCards, setFilteredCards] = useState<CardProps[]>(cards);

	function handleDelete(id: string) {
		setCards((prevCards) => prevCards.filter((card) => card._id !== id));
		axios
			.delete(`${import.meta.env.VITE_BACKEND_URL}/content/${id}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((response: any) => {
				console.log(response.data.message);
			})
			.catch((error: any) => {
				console.error(error);
			});
	}

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_BACKEND_URL}/content`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((response: any) => {
				console.log(response.data.content);
				setCards(response.data.content);
				setFilteredCards(response.data.content);
			})
			.catch((error: any) => {
				console.error(error);
			});
	}, [addModalOpen]);
	const filterCardsByType = (type: string) => {
		if (type === "all") {
			setFilteredCards(cards);
			return;
		}
		setFilteredCards(cards.filter((card) => card.type === type));
	};

	return (
		<div className="min-h-screen bg-neutral-100">
			{/* Mobile Sidebar Overlay */}
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden ${
					sidebarOpen ? "block" : "hidden"
				}`}
				onClick={() => setSidebarOpen(false)}
			/>

			{/* Sidebar */}
			<Sidebar
				isOpen={sidebarOpen}
				onClose={() => setSidebarOpen(false)}
				filter={filterCardsByType}
			/>

			{/* Main Content */}
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

						{/* Action Buttons */}
						<div className="flex items-center justify-end gap-2 sm:gap-4 w-full">
							<Button
								variant="primary"
								startIcon={
									<PlusIcon
										color="white"
										size={20}
									/>
								}
								onClick={() => setAddModalOpen(true)}
								className="hidden sm:flex"
							>
								Add Content
							</Button>
							{/* Mobile Add Button */}
							<button
								onClick={() => setAddModalOpen(true)}
								className="sm:hidden p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
							>
								<PlusIcon
									color="white"
									size={20}
								/>
							</button>

							<Button
								variant="secondary"
								startIcon={<ShareIcon size={20} />}
								className="hidden sm:flex"
							>
								Share
							</Button>
							{/* Mobile Share Button */}
							<button className="sm:hidden p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
								<ShareIcon size={20} />
							</button>
						</div>
					</div>
				</header>

				{/* Content Area */}
				<main className="p-4 sm:p-6 lg:p-8">
					{/* Stats or Filters Section (Optional) */}
					<div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
						<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
							<p className="text-sm text-gray-600">Total Content</p>
							<p className="text-2xl font-semibold">{cards?.length}</p>
						</div>
						{/* Add more stats as needed */}
					</div>

					{/* Masonry Grid */}
					<div className="columns-1 md:columns-2 xl:columns-3 2xl:columns-4gap-4 space-y-4">
						{filteredCards?.length > 0 &&
							filteredCards.map((card) => (
								<div
									key={card.link}
									className="break-inside-avoid"
								>
									<Card
										_id={card._id}
										title={card.title}
										link={card.link}
										type={card.type}
										onDelete={handleDelete}
									/>
								</div>
							))}
					</div>

					{/* Empty State */}
					{filteredCards?.length === 0 && (
						<div className="flex flex-col items-center justify-center py-12">
							<div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
								<PlusIcon
									size={32}
									color="#9CA3AF"
								/>
							</div>
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								No content yet
							</h3>
							<p className="text-gray-600 mb-4">
								Get started by adding your first content
							</p>
							<Button
								variant="primary"
								onClick={() => setAddModalOpen(true)}
								startIcon={
									<PlusIcon
										color="white"
										size={20}
									/>
								}
							>
								Add Content
							</Button>
						</div>
					)}
				</main>
			</div>

			{/* Modal */}
			<AddContentModal
				open={addModalOpen}
				onClose={() => setAddModalOpen(false)}
			/>
		</div>
	);
}

export default Dashboard;
