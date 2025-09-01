import express from "express";
import { assignReply, createReply, createTickets, listTicketListbyid } from "../Controllers/ticketsController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get('/:id',listTicketListbyid);


export default router;