import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // If you're using react-router-dom
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";

export default function TicketDetails() {
  const { id } = useParams(); 
  const { user } = useAuth();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    console.log(user)
    axios.get(`${API_URL}/tickets/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => setTicket(res.data));
  }, [id, user.token]);

  if (!ticket) return <p>Loading...</p>;

  return (
    <div className="p-4">
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
  );
}
