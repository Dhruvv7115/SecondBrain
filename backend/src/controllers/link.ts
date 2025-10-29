import Link from "../models/Link.js";
import type { Request, Response } from "express";
import { generateRandomHash } from "../utils/hash.js";
import Content from "../models/Content.js";

const toggleShareLink = async (req: Request, res: Response) => {
	const { share } = req.body;

	if (share) {
		const hash = generateRandomHash();
		const link = await Link.create({
			hash,
			//@ts-ignore
			userId: req.user.id,
		});

		res.status(200).json({ message: "Link shared successfully", link });
	} else {
		const link = await Link.findOneAndDelete({
			//@ts-ignore
			userId: req.user.id,
		});

		res.status(200).json({ message: "Link unshared successfully", link });
	}
};

const getSharedLink = async (req: Request, res: Response) => {
	const { hash } = req.params;
	try {
		const link = await Link.findOne({
			hash,
		});
		if (!link) {
			return res.status(404).json({ message: "Link not found" });
		}

		const content = await Content.find({
			userId: link.userId,
		}).populate("userId", "-password");

		if (!content) {
			return res.status(404).json({ message: "Content not found" });
		}

		return res
			.status(200)
			.json({ message: "Get shared link content successful", content });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export { toggleShareLink, getSharedLink };
