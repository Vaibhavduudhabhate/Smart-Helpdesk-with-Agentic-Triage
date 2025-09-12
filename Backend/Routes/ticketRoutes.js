import express from "express";
import { assignReply, createReply, createTickets, listTicketListbyid, listTickets, updateTicketStatus } from "../Controllers/ticketsController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import { getSuggestion } from "../Controllers/getSuggestionController.js";

const router = express.Router();

router.get('/',authMiddleware,listTickets);
router.post("/",authMiddleware,createTickets);
router.get('/:id',listTicketListbyid);
router.post("/:id/reply",authMiddleware,createReply);
router.post("/:id/assign",assignReply);
router.put("/:id", authMiddleware, updateTicketStatus);
router.get("/suggestion/:ticketId", authMiddleware, getSuggestion);


export default router;