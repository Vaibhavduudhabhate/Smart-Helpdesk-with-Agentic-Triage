import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published" ,"unpublished"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export default mongoose.model("kbArticle", articleSchema);
