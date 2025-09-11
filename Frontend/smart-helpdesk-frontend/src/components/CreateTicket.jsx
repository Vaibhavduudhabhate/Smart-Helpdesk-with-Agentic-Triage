import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";

export default function NewTicket({ onTicketCreated }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) {
      toast.warning("⚠️ Please fill in both subject and description.");
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
      toast.success("🎉 Ticket created successfully!");
    } catch (err) {
      toast.error(err.response?.data?.error || "❌ Error creating ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8 mb-8 hover:shadow-xl transition-shadow"
    >
      <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        📝 Create New Ticket
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Subject
          </label>
          <input
            id="subject"
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>

        {/* Body */}
        <div>
          <label
            htmlFor="body"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="body"
            placeholder="Describe your issue..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 min-h-[130px] focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg font-medium 
            hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Ticket
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
