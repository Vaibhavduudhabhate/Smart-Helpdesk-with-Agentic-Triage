import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";

export default function NewTicket({ onTicketCreated }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) {
      alert("Please fill in both subject and description.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${API_URL}/tickets`,
        { subject, body },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setSubject("");
      setBody("");
      if (onTicketCreated) onTicketCreated();
      alert("✅ Ticket created successfully!");
    } catch (err) {
      alert(err.response?.data?.error || "Error creating ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mb-8">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Create New Ticket</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <textarea
          placeholder="Describe your issue..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium 
            hover:bg-blue-700 transition-colors disabled:bg-gray-400`}
        >
          {loading ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>
    </div>
  );
}
