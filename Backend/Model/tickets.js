// models/Ticket.js
import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  category: { type: String, enum: ["billing", "tech", "shipping", "other"], default: "other" },
  status: { type: String, enum: ["open", "in_progress", "resolved", "waiting_human"], default: "open" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // agent
  replies: [replySchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Ticket", ticketSchema);
