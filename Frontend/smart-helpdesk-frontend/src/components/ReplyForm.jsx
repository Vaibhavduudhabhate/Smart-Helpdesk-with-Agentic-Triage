// components/ReplyForm.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ReplyForm({ ticketId }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = { message: "" };

  const validationSchema = Yup.object({
    message: Yup.string().required("Reply cannot be empty"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      await axios.post(
        `${API_URL}/tickets/${ticketId}/reply`,
        values,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      resetForm();
      toast.success("Reply sent successfully 🎉");

      // ✅ Redirect to agent dashboard
      navigate("/agent-dashboard");

    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error(error.response?.data?.error || "Failed to send reply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-md p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">💬 Add a Reply</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Reply
              </label>
              <Field
                id="message"
                name="message"
                as="textarea"
                rows="5"
                placeholder="Type your reply here..."
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {loading ? "Sending..." : "Send Reply"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
