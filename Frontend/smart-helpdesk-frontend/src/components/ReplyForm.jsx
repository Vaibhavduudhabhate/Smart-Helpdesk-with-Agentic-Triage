// components/ReplyForm.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";

export default function ReplyForm({ ticketId }) {
    const { user } = useAuth();
    const initialValues = { message: "" };
    const validationSchema = Yup.object({
        message: Yup.string().required("Reply cannot be empty"),
  });

  const handleSubmit = (values, { resetForm }) => {
    fetch(`http://localhost:3000/api/tickets/${ticketId}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(values),
    }).then(() => {
      resetForm();
    //   window.location.reload();
    });
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
