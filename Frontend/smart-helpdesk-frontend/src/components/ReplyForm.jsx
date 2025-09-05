// components/ReplyForm.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";

export default function ReplyForm({ ticketId }) {
    const { user } = useAuth();
    const initialValues = { message: "" };
    const validationSchema = Yup.object({
        message: Yup.string().required("Reply cannot be empty"),
  });

const handleSubmit = async (values, { resetForm }) => {
  try {
    await axios.post(
      `${API_URL}/tickets/${ticketId}/reply`,
      values,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    resetForm();
    // onReplySuccess();
  } catch (error) {
    console.error("Error sending reply:", error);
    alert("Failed to send reply. Please try again.");
  }
};

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form className="space-y-4">
        <Field
          name="message"
          as="textarea"
          placeholder="Type your reply..."
          className="w-full border rounded p-2"
        />
        <ErrorMessage name="message" component="div" className="text-red-500 text-sm" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Send Reply
        </button>
      </Form>
    </Formik>
  );
}
