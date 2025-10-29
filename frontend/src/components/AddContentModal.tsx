import { useRef, useEffect, useState } from "react";
import CrossIcon from "./icons/CrossIcon";
import Input from "./Input";
import Button from "./Button";
import useOnOutsideClick from "../hooks/useOnOutsideClick";
import YoutubeIcon from "./icons/YoutubeIcon";
import XTwitterIcon from "./icons/XTwitterIcon";
import InstagramIcon from "./icons/InstagramIcon";
import PlusIcon from "./icons/PlusIcon";
import TagIcon from "./icons/TagIcon";
import axios from "axios";
import ExclamationIcon from "./icons/ExclamationIcon";

export default function AddContentModal({
	open,
	onClose,
}: {
	open: boolean;
	onClose: () => void;
}) {
	const [title, setTitle] = useState<string>("");
	const [link, setLink] = useState<string>("");
	const [type, setType] = useState<"youtube" | "tweet" | "instagram">(
		"youtube",
	);
	const [tags, setTags] = useState<string[]>([]);
	const [tagInput, setTagInput] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const panelRef = useRef<HTMLDivElement | null>(null);
	useOnOutsideClick({
		ref: panelRef,
		handler: () => onClose(),
	});

	useEffect(() => {
		if (open) {
			// focus the first input when modal opens (query inside panel)
			const inputEl = panelRef.current?.querySelector(
				"input",
			) as HTMLInputElement | null;
			inputEl?.focus();
		}
	}, [open]);
	const onSubmit = async () => {
		if (!title || !link) {
			setError("Title and Link are required");
		}
		setLoading(true);
		setError("");
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/content`,
				{
					title,
					link,
					type,
					tags,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				},
			);

			setTitle("");
			setLink("");
			setType("youtube");
			setTags([]);
			console.log(response);
			onClose();
		} catch (error: any) {
			console.error(error);
			setError(error?.response?.data?.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{open && (
				<div className="bg-black/70 inset-0 min-h-screen w-full fixed flex items-center justify-center z-50">
					<div
						ref={panelRef}
						role="dialog"
						aria-modal="true"
						className="flex flex-col bg-white rounded-2xl p-6 opacity-100 gap-6 max-w-md"
					>
						<div className="w-full flex justify-end">
							<span
								onClick={onClose}
								className="hover:bg-neutral-200 p-1 rounded-md cursor-pointer"
							>
								<CrossIcon size={24} />
							</span>
						</div>
						<div className="w-full flex">
							<Input
								label="Title"
								placeholder="Enter title"
								type="text"
								value={title}
								onChange={(e) => {
									setTitle(e.target.value);
								}}
								className="min-w-sm"
							/>
						</div>
						<div className="w-full flex">
							<Input
								label="Link"
								placeholder="Enter link"
								type="text"
								value={link}
								onChange={(e) => {
									setLink(e.target.value);
								}}
								className="min-w-sm"
							/>
						</div>
						<div className="w-full flex">
							<label className="px-2 text-neutral-600 text-sm">
								Type of content
							</label>
						</div>
						<div className="w-full flex gap-2">
							<Button
								className="w-full"
								variant={type === "youtube" ? "primary" : "secondary"}
								onClick={() => setType("youtube")}
								startIcon={<YoutubeIcon size={16} />}
							>
								Youtube
							</Button>
							<Button
								className="w-full"
								variant={type === "tweet" ? "primary" : "secondary"}
								onClick={() => setType("tweet")}
								startIcon={
									<XTwitterIcon
										color="#000"
										size={16}
									/>
								}
							>
								Tweet
							</Button>
							<Button
								className="w-full"
								variant={type === "instagram" ? "primary" : "secondary"}
								onClick={() => setType("instagram")}
								startIcon={<InstagramIcon size={16} />}
							>
								Instagram
							</Button>
						</div>
						<div className="w-full">
							<label className="px-2 text-neutral-600 text-sm">Add tags</label>
						</div>
						<div className="w-full flex items-center justify-between gap-2">
							<Input
								value={tagInput}
								onChange={(e) => setTagInput(e.target.value)}
								placeholder="Enter tags"
								type="text"
								fullWidth
							/>
							<Button
								endIcon={<PlusIcon size={16} />}
								onClick={() => {
									setTags((prev) => [...prev, tagInput.toLowerCase().trim()]);
									setTagInput("");
								}}
							>
								Add
							</Button>
						</div>
						{tags.length > 0 && (
							<div className="flex flex-wrap gap-2 max-w-full">
								{tags.map((tag, index) => (
									<div
										key={tag}
										className="px-4 py-2 rounded-full flex items-center gap-2 bg-orange-400/20 text-orange-500"
									>
										<span>
											<TagIcon size={16} />
										</span>
										{tag}
										<span
											className="rounded-full p-1 hover:text-orange-600"
											onClick={() =>
												setTags((prev) => prev.filter((_, i) => i !== index))
											}
										>
											<CrossIcon size={16} />
										</span>
									</div>
								))}
							</div>
						)}
						<div className="w-full flex">
							<Button
								className="w-full"
								loading={loading}
								onClick={onSubmit}
							>
								Submit
							</Button>
						</div>
						{error && (
							<div className="text-red-500 flex items-center justify-center gap-1">
								<span>
									<ExclamationIcon size={20} />
								</span>
								<span>{error}</span>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
