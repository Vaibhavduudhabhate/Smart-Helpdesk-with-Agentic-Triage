import express from "express";
import Ticket from "../Model/tickets.js";
import tickets from "../Model/tickets.js";



// POST /api/tickets → user creates ticket
export const createTickets = async (req, res) => {
  try {
    // console.log("req",req)
    const ticket = new Ticket({
      userId: req.user.id,
      subject: req.body.subject,
      body: req.body.body
    });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /api/tickets → list tickets (user sees own, admin sees all)
export const listTickets = async (req, res) => {
  try {
    console.log(req.user)
    let filter = {};
    if (!req.user.isAdmin) filter.userId = req.user.id;
    if (req.query.status) filter.status = req.query.status;

    const tickets = await tickets.find(filter).populate("userId", "email");
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/tickets/:id
export const listTicketListbyid = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate("userId", "email");
    if (!ticket) return res.status(404).json({ error: "Not found" });
    if (!req.user.isAdmin && ticket.userId._id.toString() !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/tickets/:id/reply
export const createReply = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Not found" });

    ticket.replies.push({
      userId: req.user.id,
      message: req.body.message
    });

    if (req.user.isAgent || req.user.isAdmin) {
      ticket.status = "in_progress";
    }

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/tickets/:id/assign
export const assignReply = async (req, res) => {
  try {
    if (!req.user.isAdmin && !req.user.isAgent)
      return res.status(403).json({ error: "Forbidden" });

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { assignedTo: req.body.agentId, status: "in_progress" },
      { new: true }
    );

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


