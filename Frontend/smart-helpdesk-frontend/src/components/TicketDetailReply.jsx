import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [reply, setReply] = useState("");
  const {user} = useAuth();

  useEffect(() => {
    console.log(user)
    axios.get(`http://localhost:3000/api/tickets/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => setTicket(res.data));
  }, [id]);

  const handleReply = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:3000/api/tickets/${id}/reply`, { message: reply }, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    setTicket(res.data);
    setReply("");
  };

  if (!ticket) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{ticket.subject}</h2>
      <p>{ticket.body}</p>
      <p>Status: {ticket.status}</p>

      <h3 className="mt-4 font-semibold">Replies</h3>
      <ul>
        {ticket.replies.map((r, i) => (
          <li key={i} className="border p-2 mt-2">{r.message}</li>
        ))}
      </ul>

      <form onSubmit={handleReply} className="mt-4">
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="w-full border p-2"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded mt-2">Reply</button>
      </form>
    </div>
  );
}
