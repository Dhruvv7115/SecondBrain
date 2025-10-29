import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["tweet", "youtube", "instagram"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag",
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

export default mongoose.model("Content", contentSchema);