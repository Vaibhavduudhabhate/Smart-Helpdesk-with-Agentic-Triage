// import { v4 as uuidv4 } from "uuid";
// import Ticket from "../Model/tickets.js";
// import AuditLog from "../Model/AuditLog.js";
// import { logAuditEvent } from "../utils/auditLogger.js";

// // POST /api/agent/triage/:ticketId
// export const triageTicket = async (req, res) => {
//   try {
//     const ticket = await Ticket.findById(req.params.ticketId);
//     if (!ticket) return res.status(404).json({ error: "Ticket not found" });

//     const traceId = uuidv4();

//     // Step 1: PLAN
//     const plan = ["CLASSIFY", "RETRIEVE", "DRAFT_REPLY", "DECISION"];
//     await logAuditEvent({ traceId, ticketId: ticket._id, step: "PLAN", data: { plan } });

//     // Step 2: CLASSIFY (stub)
//     const classification = { predictedCategory: "billing", confidence: 0.8 };
//     await logAuditEvent({ traceId, ticketId: ticket._id, step: "CLASSIFY", data: classification });

//     // Step 3: RETRIEVE KB (stub → later replace with actual KB search)
//     const retrieved = {
//       articles: ["articleId1", "articleId2", "articleId3"],
//       snippets: ["...", "...", "..."],
//     };
//     await logAuditEvent({ traceId, ticketId: ticket._id, step: "RETRIEVE", data: retrieved });

//     // Step 4: DRAFT REPLY
//     const draftReply = {
//       draftReply: "Hello, based on our KB: [1] and [2] ...",
//       citations: ["articleId1", "articleId2"],
//     };
//     await logAuditEvent({ traceId, ticketId: ticket._id, step: "DRAFT_REPLY", data: draftReply });

//     // Step 5: DECISION
//     const decision = {
//       action: classification.confidence > 0.75 ? "AUTO_CLOSE" : "WAITING_HUMAN",
//     };
//     await logAuditEvent({ traceId, ticketId: ticket._id, step: "DECISION", data: decision });

//     res.json({ traceId, classification, retrieved, draftReply, decision });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
