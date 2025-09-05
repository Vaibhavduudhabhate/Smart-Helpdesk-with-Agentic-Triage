// components/TicketDetail.jsx
import { useEffect, useState } from "react";
import ReplyForm from "./ReplyForm.jsx";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config.js";

export default function TicketDetail({ onBack }) {
  const { id } = useParams(); 
  const { user } = useAuth();
  const [ticket, setTicket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/tickets/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => setTicket(res.data));
  }, [id, user.token]);

  if (!ticket) return <p>Loading...</p>;
  

  return (
    <div className="p-6 flex-1">
      <button onClick={() => navigate(-1)} className="text-blue-600 underline mb-4">
        ← Back to Tickets
      </button>

      <h2 className="text-xl font-bold">{ticket.subject}</h2>
      <p className="text-gray-700 mb-4">{ticket.body}</p>

      <h3 className="font-semibold mt-6">Replies</h3>
      <div className="space-y-2 mb-4">
        {ticket.replies?.map((reply, idx) => (
          <div key={idx} className="border rounded p-2 bg-gray-50">
            <p className="text-sm text-gray-800">{reply.message}</p>
          </div>
        ))}
      </div>

      <ReplyForm ticketId={id} />
    </div>
  );
}
