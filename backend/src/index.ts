import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import userRouter from "./routes/user.js";
import linkRouter from "./routes/link.js";
// import tagRouter from "./routes/tag.js";
import contentRouter from "./routes/content.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/link", linkRouter);
// app.use("api/v1/tag", tagRouter);
app.use("/api/v1/content", contentRouter);

const port = process.env.PORT || 3000;

mongoose
	.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}` || "")
	.then(() => {
		app.listen(port, () => {
			console.log("Server is running on port ", port);
		});
	});
