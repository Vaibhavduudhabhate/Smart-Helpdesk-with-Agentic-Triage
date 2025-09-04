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
    console.log("req.user", req.user._id.toString());

    let filter = {};
    if (req.user.role !== 'Admin' && req.user.role !== 'Agent') {
      filter.userId = req.user._id; // Mongoose handles ObjectId
    }

    // Optional: add status filter
    if (req.query.status) {
      filter.status = req.query.status;
    }

    console.log("Filter", filter);

    const ticketsaaa = await tickets.find(filter).populate("userId", "email");
    res.json(ticketsaaa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET /api/tickets/:id
export const listTicketListbyid = async (req, res) => {
  console.log(req.params.id)
  try {
    const ticket = await tickets.findById(req.params.id).populate("userId", "email");
    console.log("ticket",ticket)
    if (!ticket) return res.status(404).json({ error: "Not found" });
    console.log(ticket.userId._id.toString(),req.params.id.toString())
    // if (ticket.userId._id.toString() !== req.params.id.toString()) {
    //   return res.status(403).json({ error: "Forbidden" });
    // }
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/tickets/:id/reply
export const createReply = async (req, res) => {
  console.log("entered")
  try {
    console.log(req.params)
    const ticket = await tickets.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Not found" });
    console.log(req.body.message)
    console.log("req.user",req.user)
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

    const ticket = await tickets.findByIdAndUpdate(
      req.params.id,
      { assignedTo: req.body.agentId, status: "in_progress" },
      { new: true }
    );

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


