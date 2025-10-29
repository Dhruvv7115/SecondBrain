import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyJwt = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
  //@ts-ignore
	const token = req.headers?.authorization?.split(" ")[1];
	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}

  const secret = process.env.JWT_SECRET as jwt.Secret | undefined;
  if (!secret) {
    console.error("JWT_SECRET is not set");
    return res.status(500).json({ message: "Internal Server Error" });
  }

	try {
		const decodedToken = jwt.verify(token, secret);
		if (!decodedToken) {
			return res.status(401).json({ message: "Unauthorized" });
		}
    //@ts-ignore
		req.user = decodedToken;
		next();
	} catch (error) {
    //@ts-ignore
		console.error("Error verifying JWT:", error.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
