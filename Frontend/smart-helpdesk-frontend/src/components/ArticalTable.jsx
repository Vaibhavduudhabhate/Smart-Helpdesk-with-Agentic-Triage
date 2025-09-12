import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import close from "../assets/close.png";
import { API_URL } from "../config";

const ArticleTable = ({ onLogout }) => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  // ✅ Validation schema
  const ArticleSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    body: Yup.string().required("Body is required"),
    tags: Yup.string().required("At least one tag is required"),
    status: Yup.string()
      .oneOf(["draft", "published", "unpublished"], "Invalid status")
      .required("Status is required"),
  });

  // ✅ Fetch Articles
  const fetchArticles = async () => {
    const res = await axios.get(`${API_URL}/kbarticles?query=${query}`);
    setArticles(res.data);
  };

  useEffect(() => {
    fetchArticles();
  }, [query]);

  // ✅ Delete Article
  const handleDelete = async (id) => {
    if (window.confirm("Delete this article?")) {
      await axios.delete(`${API_URL}/kbarticles/${id}`);
      fetchArticles();
    }
  };

  // ✅ Modal openers
  const handleNew = () => {
    setEditingArticle(null);
    setModalOpen(true);
  };
  const handleEdit = (article) => {
    setEditingArticle(article);
    setModalOpen(true);
  };

  // ✅ Save
  const handleSave = async (values) => {
    try {
      if (editingArticle) {
        let payload = {};
        if (values.title !== editingArticle.title) payload.title = values.title;
        if (values.body !== editingArticle.body) payload.body = values.body;
        if (values.status !== editingArticle.status) payload.status = values.status;

        const newTags = values.tags.split(",").map((t) => t.trim());
        if (JSON.stringify(newTags) !== JSON.stringify(editingArticle.tags)) {
          payload.tags = newTags;
        }

        if (Object.keys(payload).length === 0) {
          alert("No Change Detected");
        } else {
          await axios.put(`${API_URL}/kbarticles/${editingArticle._id}`, payload);
          setModalOpen(false);
        }
      } else {
        await axios.post(`${API_URL}/kbarticles`, {
          ...values,
          tags: values.tags.split(",").map((t) => t.trim()),
        });
        setModalOpen(false);
      }

      fetchArticles();
    } catch (err) {
      console.error(err);
      alert("Error saving article");
    }
  };

  return (
    <div className=" p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <div className="flex gap-2 justify-end">
          {/* <button
            onClick={onLogout}
            type="button"
            className="bg-white text-blue-500 border px-4 py-2 rounded-lg shadow hover:bg-blue-50 transition"
          >
            Logout
          </button> */}
          <button
            onClick={handleNew}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            + New Article
          </button>
        </div>
      </div>

      {/* Responsive Table / Card */}
      <div className="overflow-x-auto">
        <table className="hidden sm:table min-w-full border border-blue-600 bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-300 text-left">
            <tr>
              <th className="p-3 border-b">Title</th>
              <th className="p-3 border-b">Tags</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Updated At</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a._id} className="hover:bg-gray-50 transition">
                <td className="p-3 border-b font-medium text-gray-800">{a.title}</td>
                <td className="p-3 border-b text-gray-600">{a.tags.join(", ")}</td>
                <td className="p-3 border-b">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      a.status === "published"
                        ? "bg-green-100 text-green-700"
                        : a.status === "unpublished"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="p-3 border-b text-gray-500">
                  {new Date(a.updatedAt).toLocaleString()}
                </td>
                <td className="p-3 border-b space-x-2">
                  <button
                    onClick={() => handleEdit(a)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Cards */}
        <div className="grid sm:hidden gap-4">
          {articles.map((a) => (
            <div
              key={a._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2"
            >
              <h3 className="text-lg font-semibold text-gray-800">{a.title}</h3>
              <p className="text-sm text-gray-600">Tags: {a.tags.join(", ")}</p>
              <span
                className={`self-start px-2 py-1 text-xs font-semibold rounded-full ${
                  a.status === "published"
                    ? "bg-green-100 text-green-700"
                    : a.status === "unpublished"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {a.status}
              </span>
              <p className="text-xs text-gray-500">
                Updated: {new Date(a.updatedAt).toLocaleString()}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(a)}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-1 rounded-lg text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal with Formik */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editingArticle ? "Edit Article" : "New Article"}
              </h2>
              <img
                onClick={() => setModalOpen(false)}
                className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                src={close}
                alt="closeIcon"
              />
            </div>

            <Formik
              initialValues={{
                title: editingArticle?.title || "",
                body: editingArticle?.body || "",
                tags: editingArticle?.tags?.join(", ") || "",
                status: editingArticle?.status || "draft",
              }}
              validationSchema={ArticleSchema}
              onSubmit={handleSave}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <Field
                      name="title"
                      placeholder="Title"
                      className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <Field
                      as="textarea"
                      name="body"
                      placeholder="Body"
                      rows="4"
                      className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    <ErrorMessage
                      name="body"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <Field
                      name="tags"
                      placeholder="Tags (comma separated)"
                      className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    <ErrorMessage
                      name="tags"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <Field
                      as="select"
                      name="status"
                      className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="unpublished">Unpublished</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleTable;
