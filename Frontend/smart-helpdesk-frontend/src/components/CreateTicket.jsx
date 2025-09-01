import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function NewTicket() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const {user ,loading} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/tickets", { subject, body }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert("Ticket created!");
      setSubject("");
      setBody("");
    } catch (err) {
      alert(err.response?.data?.error || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full border p-2"
      />
      <textarea
        placeholder="Describe your issue"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full border p-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
