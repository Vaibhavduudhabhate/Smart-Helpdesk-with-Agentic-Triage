// components/TicketList.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config.js";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token) {
      fetchTickets();
    }
  }, [user]);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(`${API_URL}/tickets`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTickets(res.data);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    }
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
      {/* Header */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">
            Agent Dashboard
          </h1>
          <button
            onClick={logout}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Tickets */}
      {tickets.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No tickets available.</p>
      ) : (
        <div className="mt-6">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left border-b">Subject</th>
                  <th className="p-3 text-left border-b">Status</th>
                  <th className="p-3 text-left border-b">Created By</th>
                  <th className="p-3 text-left border-b">Assigned To</th>
                  <th className="p-3 text-left border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, idx) => (
                  <tr
                    key={ticket._id}
                    className={`${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="p-3 font-medium text-gray-800">
                      {ticket.subject || "N/A"}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          ticket.status === "open"
                            ? "bg-green-100 text-green-700"
                            : ticket.status === "in_progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : ticket.status === "waiting_human"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {ticket.status || "N/A"}
                      </span>
                    </td>
                    <td className="p-3 text-gray-700">
                      {ticket.userId?.email || "N/A"}
                    </td>
                    <td className="p-3 text-gray-700">
                      {ticket.assignedTo?.email || "Unassigned"}
                    </td>
                    <td className="p-3 flex items-center gap-2">
                      <button
                        className="text-blue-600 font-medium hover:underline"
                        onClick={() => handleViewTicket(ticket._id)}
                      >
                        Reply
                      </button>
                      <select
                        className="border border-gray-300 p-1 rounded-md text-sm focus:ring focus:ring-blue-200"
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

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 md:hidden gap-4">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white border rounded-lg shadow p-4 space-y-2 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {ticket.subject || "N/A"}
                </h3>
                <p className="text-sm text-gray-500">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      ticket.status === "open"
                        ? "bg-green-100 text-green-700"
                        : ticket.status === "in_progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : ticket.status === "waiting_human"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Created By:</strong> {ticket.userId?.email || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Assigned To:</strong>{" "}
                  {ticket.assignedTo?.email || "Unassigned"}
                </p>

                {/* Actions */}
                <div className="flex justify-between items-center pt-2">
                  <button
                    className="text-blue-600 font-medium hover:underline"
                    onClick={() => handleViewTicket(ticket._id)}
                  >
                    Reply
                  </button>
                  <select
                    className="border border-gray-300 p-1 rounded-md text-sm focus:ring focus:ring-blue-200"
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
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
