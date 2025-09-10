import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
            className={`px-2 py-1 text-xs rounded-full ${
              ticket.status === "open"
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
          {suggestion.citations?.length > 0 && (
            <p className="mt-3">
              <strong>Related KB Articles:</strong>{" "}
              {suggestion.citations.join(", ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
