// components/TicketList.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TicketList({ onSelect }) {
  const [tickets, setTickets] = useState([]);
  const {user } = useAuth()
    const navigate = useNavigate();

  useEffect(() => {
    console.log(user)
    axios.get(`http://localhost:3000/api/tickets`, {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => setTickets(res.data));
  }, []);
  const handleViewTicket = (ticketId) => {
    navigate(`/agent-dashboard/tickets/${ticketId}`);
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
          {tickets.map(ticket => (
            <tr key={ticket._id} className="border hover:bg-gray-50">
              <td className="p-2">{ticket.subject}</td>
              <td className="p-2">{ticket.status}</td>
              <td className="p-2">{ticket.userId?.email}</td>
              <td className="p-2">{ticket.assignedTo || "Unassigned"}</td>
              <td className="p-2">
                <button
                  className="text-blue-600 underline"
                  onClick={() => handleViewTicket(ticket._id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
