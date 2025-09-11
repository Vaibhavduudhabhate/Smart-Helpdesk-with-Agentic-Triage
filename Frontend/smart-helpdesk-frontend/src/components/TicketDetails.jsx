import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TicketDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const fetched = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchData = async () => {
      try {
        const ticketRes = await axios.get(`${API_URL}/tickets/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTicket(ticketRes.data);

        const suggestionRes = await axios.get(
          `${API_URL}/agent/suggestion/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setSuggestion(suggestionRes.data);
      } catch (err) {
        toast.error(err.response?.data?.error || "Failed to fetch data");
      }
    };

    fetchData();
  }, [id, user.token]);

  if (!ticket) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">
              {user?.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
            </h1>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700 transition-colors"
          >
             ← Go Back
          </button>
        </div>
      </header>
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Ticket Details */}
      <div className="bg-white border rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Ticket Details
        </h2>
        <p>
          <strong>Subject:</strong> {ticket.subject}
        </p>
        <p>
          <strong>Body:</strong> {ticket.body}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 text-xs rounded-full ${ticket.status === "open"
                ? "bg-green-100 text-green-700"
                : ticket.status === "closed"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
          >
            {ticket.status}
          </span>
        </p>
        {ticket.userId && (
          <p>
            <strong>Created By:</strong> {ticket.userId.name} (
            {ticket.userId.email})
          </p>
        )}
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(ticket.createdAt).toLocaleString()}
        </p>

        {ticket.replies && ticket.replies.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">💬 Replies</h3>
            <ul className="space-y-3">
              {ticket.replies.map((reply) => (
                <li
                  key={reply._id}
                  className="border rounded-lg p-3 bg-gray-50 shadow-sm"
                >
                  <p className="text-gray-800">{reply.message}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    By: "Agent"  |{" "}
                    {new Date(reply.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {/* AI Suggestions */}
      {suggestion && (
        <div className="bg-gray-50 border rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            🤖 AI Suggestions
          </h3>
          <p>
            <strong>Predicted Category:</strong>{" "}
            <span className="capitalize">{suggestion.predictedCategory}</span>
          </p>
          <p>
            <strong>Confidence:</strong>{" "}
            {(suggestion.confidence * 100).toFixed(1)}%
          </p>
          <p className="mt-3 whitespace-pre-line">
            <strong>Draft Reply:</strong>
            {"\n"}
            {suggestion.draftReply}
          </p>
        </div>
      )}
    </div>
   </div> 
  );
}
