import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    traceId: { type: String, required: true },   // UUID for linking pipeline steps
    ticketId: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
    step: { type: String, required: true },      // e.g. "PLAN", "CLASSIFY", "RETRIEVE", "DRAFT_REPLY", "DECISION"
    data: { type: mongoose.Schema.Types.Mixed }, // JSON payload from each step
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);
