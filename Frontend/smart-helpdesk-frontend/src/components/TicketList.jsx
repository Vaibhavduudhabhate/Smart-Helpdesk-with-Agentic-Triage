import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";

export default function TicketList({ refresh }) {
  const [tickets, setTickets] = useState([]);
  const {user } = useAuth()

  useEffect(() => {
    console.log(user)
    axios.get(`${API_URL}/tickets`, {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => setTickets(res.data));
  }, [refresh , user.token]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Tickets</h2>
      <ul className="space-y-2">
        {tickets.map(t => (
          <li key={t._id} className="border p-3 rounded">
            <p className="font-semibold">{t.subject}</p>
            <p>Status: {t.status}</p>
            <a href={`user-dashboard/tickets/${t._id}`} className="text-blue-600">View </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
