import Ticket from "../Model/tickets.js";
import kbArticle from "../Model/kbArticle.js";
import { v4 as uuidv4 } from "uuid";

// GET /api/agent/suggestion/:ticketId
export const getSuggestion = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    // 1. Classify
    let category = "other";
    let confidence = 0.5;
    if (/payment|billing/i.test(ticket.subject + ticket.body)) {
      category = "billing";
      confidence = 0.9;
    } else if (/error|issue|bug/i.test(ticket.subject + ticket.body)) {
      category = "tech";
      confidence = 0.85;
    } else if (/ship|deliver|tracking/i.test(ticket.subject + ticket.body)) {
      category = "shipping";
      confidence = 0.8;
    }

    // 2. Retrieve KB
    const kbMatches = await kbArticle.find({
      $or: [
        { title: new RegExp(category, "i") },
        { tags: category }
      ],
      status: "published"
    }).limit(3);

    // 3. Draft reply
    let draftReply = `Hi, based on your "${category}" issue, here are possible solutions:\n`;
    kbMatches.forEach((kb, i) => {
      draftReply += `${i + 1}. ${kb.title}\n`;
    });

    // 4. Build response
    const response = {
      predictedCategory: category,
      confidence,
      draftReply,
      citations: kbMatches.map((kb) => kb._id),
    };

    // 5. (Optional) Log Audit
    // AuditLog.create({ traceId: uuidv4(), ticketId: ticket._id, step: "suggestion", data: response });

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
