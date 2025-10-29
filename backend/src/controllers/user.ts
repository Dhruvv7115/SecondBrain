import type { Request, Response } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
	console.log("Register endpoint hit");
	const { username, password } = req.body;
	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "Username and password are required" });
	}
	try {
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: "Username already exists" });
		}
		const user = await User.create({ username, password });
		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.error("Error registering user:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "Username and password are required" });
	}
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(401).json({ message: "User not found" });
		}
		//@ts-ignore
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// ensure JWT_SECRET is provided and typed as jwt.Secret
		const secret = process.env.JWT_SECRET as jwt.Secret | undefined;
		if (!secret) {
			console.error("JWT_SECRET is not set");
			return res.status(500).json({ message: "Internal Server Error" });
		}
		//@ts-ignore
		const token = jwt.sign({ id: user._id.toString() }, secret, {
			expiresIn: process.env.JWT_LIFETIME ?? "1h",
		});
		return res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		console.error("Error logging in:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const logout = async (req: Request, res: Response) => {
	res.status(200).json({ message: "Logout successful" });
};

const getCurrentUser = async (req: Request, res: Response) => {
	const user = await User.findById(
		//@ts-ignore
		req.user.id,
	).select("-password");
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}
	return (
		res
			.status(200)
			//@ts-ignore
			.json({ message: "Get current user successful", user })
	);
};

export { register, login, logout, getCurrentUser };
