import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
import { Link } from "react-router-dom";

export default function TicketList({ refresh }) {
  const [tickets, setTickets] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/tickets`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setTickets(res.data))
      .finally(() => setLoading(false));
  }, [refresh, user.token]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">📋 My Tickets</h2>

      {loading ? (
        <p className="text-gray-500">Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p className="text-gray-500">No tickets found. Create one above 👆</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map((t) => (
            <li
              key={t._id}
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg text-gray-900">{t.subject}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Status:{" "}
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        t.status === "open"
                          ? "bg-green-100 text-green-700"
                          : t.status === "closed"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {t.status}
                    </span>
                  </p>
                </div>
                <Link
                  to={`/user-dashboard/tickets/${t._id}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  View →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
