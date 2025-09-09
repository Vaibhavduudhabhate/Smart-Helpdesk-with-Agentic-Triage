import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";

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
        const suggestionRes = await axios.get(`${API_URL}/agent/suggestion/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setSuggestion(suggestionRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [id, user.token ,ticket]);

  if (!ticket) return <p>Loading...</p>;

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Ticket Details</h2>
        <div className="border p-4 rounded bg-white shadow">
          <p><strong>Subject:</strong> {ticket.subject}</p>
          <p><strong>Body:</strong> {ticket.body}</p>
          <p><strong>Status:</strong> {ticket.status}</p>
          {ticket.userId && (
            <p><strong>Created By:</strong> {ticket.userId.name} ({ticket.userId.email})</p>
          )}
          <p><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
        </div>
      </div>

      {suggestion && (
        <div>
          <h3 className="text-xl font-semibold mb-2">AI Suggestions</h3>
          <div className="border p-4 rounded bg-gray-50 shadow">
            <p><strong>Predicted Category:</strong> {suggestion.predictedCategory}</p>
            <p><strong>Confidence:</strong> {(suggestion.confidence * 100).toFixed(1)}%</p>
            <p className="mt-2 whitespace-pre-line"><strong>Draft Reply:</strong>{"\n"}{suggestion.draftReply}</p>
            {suggestion.citations?.length > 0 && (
              <p className="mt-2"><strong>Related KB Articles:</strong> {suggestion.citations.join(", ")}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
