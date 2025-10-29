import React, { useEffect } from "react";
import { useState } from "react";
import BrainIcon from "./icons/BrainIcon";
import SidebarItem from "./SidebarItem";
// You'll need to create or import these icons
import YoutubeIcon from "./icons/YoutubeIcon";
import XTwitterIcon from "./icons/XTwitterIcon";
import InstagramIcon from "./icons/InstagramIcon";
import HomeIcon from "./icons/HomeIcon";
import LogoutIcon from "./icons/LogoutIcon";
import CrossIcon from "./icons/CrossIcon";
import axios from "axios";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const items = [
	{
		title: "All Content",
		icon: <HomeIcon size={20} />,
		href: "/dashboard",
		active: true, // Track active state
	},
	{
		title: "Youtube",
		icon: <YoutubeIcon size={20} />,
		href: "/dashboard/youtube",
		count: 12, // Optional: show content count
	},
	{
		title: "Twitter",
		icon: (
			<XTwitterIcon
				size={20}
				color="black"
			/>
		),
		href: "/dashboard/twitter",
		count: 8,
	},
	{
		title: "Instagram",
		icon: <InstagramIcon />,
		href: "/dashboard/instagram",
		count: 5,
	},
];
interface User {
	_id: string;
	username: string;
}

export default function Sidebar({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
	const [activeItem, setActiveItem] = useState("All Content");
	const [user, setUser] = useState<User | null>(null);
	const [logout, setLogout] = useState<boolean>(false);
	const navigate = useNavigate();

	const logoutHandler = () => {
		setLogout(true);
		localStorage.removeItem("token");
		setTimeout(() => {
			navigate("/signin");
			setLogout(false);
		}, 2000);
	};
	useEffect(() => {
		fetchUserDetails();
	}, []);
	const fetchUserDetails = async () => {
		try {
			const response = await axios.get(
				import.meta.env.VITE_BACKEND_URL + "/user/profile",
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				},
			);
			const { data } = response;
			setUser(data.user);
		} catch (error) {
			console.error("Error fetching user details:", error);
		}
	};
	return (
		<>
			{/* Desktop Sidebar */}
			<aside className="hidden lg:block fixed left-0 top-0 z-40 w-72 h-full">
				<nav className="h-full bg-white border-r border-gray-200 flex flex-col">
					{/* Sidebar Header */}
					<div className="p-6 border-b border-gray-200">
						<div className="flex items-center gap-3">
							<div className="p-2 bg-indigo-100 rounded-lg">
								<BrainIcon
									size={28}
									color="indigo"
								/>
							</div>
							<div>
								<h1 className="text-xl font-bold text-gray-900">
									Second Brain
								</h1>
								<p className="text-xs text-gray-500">Organize your content</p>
							</div>
						</div>
					</div>

					{/* User Profile Section */}
					<div className="p-4 border-b border-gray-200">
						<div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
							<div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
								{user?.username?.charAt(0).toUpperCase() || "J"}
							</div>
							<div className="flex-1">
								<p className="text-sm font-medium text-gray-900">
									{user?.username || "John Doe"}
								</p>
							</div>
						</div>
					</div>

					{/* Navigation Items */}
					<div className="flex-1 p-4 overflow-y-auto">
						<div className="space-y-1">
							{items.map((item) => (
								<SidebarItem
									key={item.title}
									title={item.title}
									icon={item.icon}
									href={item.href}
									count={item.count}
									active={activeItem === item.title}
									onClick={() => setActiveItem(item.title)}
								/>
							))}
						</div>
					</div>
					{/* Additional Section */}
					<div className="mt-8 py-4 px-2 border-t border-gray-200">
						<p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
							Account
						</p>
						<div className="space-y-1">
							<Button
								startIcon={<LogoutIcon size={20} />}
								onClick={logoutHandler}
								variant="danger-secondary"
								fullWidth
								loadingText="Logging out..."
								loading={logout}
							>
								Logout
							</Button>
						</div>
					</div>
				</nav>
			</aside>

			{/* Mobile Sidebar */}
			<aside
				className={`
          fixed left-0 top-0 z-50 w-72 h-full transform transition-transform duration-300 ease-in-out
          lg:hidden bg-white border-r border-gray-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
			>
				<nav className="h-full flex flex-col">
					{/* Mobile Header with Close Button */}
					<div className="p-6 border-b border-gray-200 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="p-2 bg-indigo-100 rounded-lg">
								<BrainIcon
									size={28}
									color="indigo"
								/>
							</div>
							<div>
								<h1 className="text-xl font-bold text-gray-900">
									Second Brain
								</h1>
								<p className="text-xs text-gray-500">Organize your content</p>
							</div>
						</div>
						<button
							onClick={onClose}
							className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						>
							<CrossIcon size={20} />
						</button>
					</div>

					{/* Rest of the mobile sidebar content (same as desktop) */}
					{/* ... Copy the same content structure from desktop ... */}

					{/* User Profile Section */}
					<div className="p-4 border-b border-gray-200">
						<div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
							<div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
								JD
							</div>
							<div className="flex-1">
								<p className="text-sm font-medium text-gray-900">John Doe</p>
								<p className="text-xs text-gray-500">john@example.com</p>
							</div>
						</div>
					</div>

					{/* Navigation Items */}
					<div className="flex-1 p-4 overflow-y-auto">
						<div className="space-y-1">
							{items.map((item) => (
								<SidebarItem
									key={item.title}
									title={item.title}
									icon={item.icon}
									href={item.href}
									count={item.count}
									active={activeItem === item.title}
									onClick={() => setActiveItem(item.title)}
								/>
							))}
						</div>
					</div>
					{/* Additional Section */}
					<div className="mt-8 py-4 px-2 border-t border-gray-200">
						<p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
							Account
						</p>
						<div className="mx-2">
							<Button
								startIcon={<LogoutIcon size={20} />}
								onClick={logoutHandler}
								variant="danger-secondary"
								fullWidth
								loadingText="Logging out..."
								loading={logout}
							>
								Logout
							</Button>
						</div>
					</div>
				</nav>
			</aside>
		</>
	);
}
