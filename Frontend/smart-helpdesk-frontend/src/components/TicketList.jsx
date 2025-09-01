import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const {user } = useAuth()

  useEffect(() => {
    console.log(user)
    axios.get(`http://localhost:3000/api/tickets`, {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => setTickets(res.data));
  }, []);

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
