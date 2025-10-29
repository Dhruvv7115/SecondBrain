import type { Request, Response } from "express";
import Content from "../models/Content.js";
import Tag from "../models/Tag.js";

const getContent = async (req: Request, res: Response) => {
	try {
		// @ts-ignore
		const contents = await Content.find({ userId: req.user.id }).populate(
			"tags",
		);
		res.status(200).json({
			message: "Get content successful",
			content: contents,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const createContent = async (req: Request, res: Response) => {
	const { link, type, title, tags } = req.body;
	console.log(typeof tags);
	if (!link || !type || !title) {
		return res
			.status(400)
			.json({ message: "Link, type and title are required" });
	}
	if (tags && !Array.isArray(tags)) {
		return res.status(400).json({ message: "Tags must be an array" });
	}

	try {
		let tagsOfContent: any = [];
		await Promise.all(
			tags.map(async (tag: string) => {
				const existingTag = await Tag.findOne({ title: tag });
				if (existingTag) {
					tagsOfContent.push(existingTag);
				} else {
					const newTag = await Tag.create({ title: tag });
					console.log("newTag: ", newTag);
					tagsOfContent.push(newTag);
				}
			}),
		);
		// why is tagsOfContent still empty here?
		console.log("tagsOfContent: ", tagsOfContent);
		const newContent = await Content.create({
			link,
			type,
			title,
			tags: tagsOfContent,
			//@ts-ignore
			userId: req.user.id,
		});
		return res.status(201).json(newContent);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const deleteContent = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		await Content.findByIdAndDelete(id);
		return res.status(200).json({ message: "Content deleted successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export { getContent, createContent, deleteContent };
