// components/TicketList.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config.js";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const res = await axios.get(`${API_URL}/tickets`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    setTickets(res.data);
  };

  const handleViewTicket = (ticketId) => {
    navigate(`/agent-dashboard/tickets/${ticketId}`);
  };

  const handleChangeStatus = async (ticketId, newStatus) => {
    try {
      await axios.put(
        `${API_URL}/tickets/${ticketId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchTickets();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update status");
    }
  };

  return (
    <div className="p-6 flex-1">
      <h2 className="text-xl font-bold mb-4">Tickets</h2>
      <table className="w-full border rounded-md shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Subject</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Created By</th>
            <th className="p-2 border">Assigned To</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id} className="border hover:bg-gray-50">
              <td className="p-2">{ticket.subject || "N/A"}</td>
              <td className="p-2">{ticket.status || "N/A"}</td>
              <td className="p-2">{ticket.userId?.email || "N/A"}</td>
              <td className="p-2">
                {ticket.assignedTo?.email || "Unassigned"}
              </td>
              <td className="p-2 space-x-2">
                <button
                  className="text-blue-600 underline"
                  onClick={() => handleViewTicket(ticket._id)}
                >
                  View
                </button>
                <select
                  className="border p-1 rounded"
                  value={ticket.status}
                  onChange={(e) =>
                    handleChangeStatus(ticket._id, e.target.value)
                  }
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="waiting_human">Waiting Human</option>
                  <option value="resolved">Resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
