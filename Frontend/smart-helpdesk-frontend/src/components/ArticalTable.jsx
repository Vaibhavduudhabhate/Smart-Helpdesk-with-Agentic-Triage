import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import close from '../assets/close.png'

const ArticleTable = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null); // null = create, object = edit
  const { logout } = useAuth();

  // ✅ Validation schema
  const ArticleSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    body: Yup.string().required("Body is required"),
    tags: Yup.string().required("At least one tag is required"),
    status: Yup.string()
      .oneOf(["draft", "published","unpublished"], "Invalid status")
      .required("Status is required"),
  });

  // ✅ Fetch Articles
  const fetchArticles = async () => {
    const res = await axios.get(`http://localhost:3000/api/kbarticles?query=${query}`);
    setArticles(res.data);
  };

  useEffect(() => {
    fetchArticles();
  }, [query]);

  // ✅ Delete Article
  const handleDelete = async (id) => {
    if (window.confirm("Delete this article?")) {
      await axios.delete(`http://localhost:3000/api/kbarticles/${id}`);
      fetchArticles();
    }
  };

  // ✅ Open modal for new article
  const handleNew = () => {
    setEditingArticle(null);
    setModalOpen(true);
  };

  // ✅ Open modal for edit
  const handleEdit = (article) => {
    setEditingArticle(article);
    setModalOpen(true);
  };

  // ✅ Save (create or update)
  const handleSave = async (values) => {
    try {
      if (editingArticle) {
        // diff check: send only changed fields
        let payload = {};
        if (values.title !== editingArticle.title) payload.title = values.title;
        if (values.body !== editingArticle.body) payload.body = values.body;
        if (values.status !== editingArticle.status) payload.status = values.status;

        const newTags = values.tags.split(",").map((t) => t.trim());
        if (JSON.stringify(newTags) !== JSON.stringify(editingArticle.tags)) {
          payload.tags = newTags;
        }
        console.log("payload",payload)
        if (Object.keys(payload).length === 0){
          alert("No Change Detected")
        }else{
          await axios.put(
            `http://localhost:3000/api/kbarticles/${editingArticle._id}`,
            payload
          );
          setModalOpen(false);

        }
      } else {
        // Create: full payload
        await axios.post("http://localhost:3000/api/kbarticles", {
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
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-4 py-2 rounded-md w-1/3"
        />
        <div className="flex gap-2">
          <button
            onClick={logout}
            type="button"
            className="bg-white text-blue-500 border px-4 py-2 rounded-md"
          >
            Logout
          </button>
          <button
            onClick={handleNew}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            + New Article
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full border border-gray-200 bg-white shadow rounded-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border-b">Title</th>
            <th className="p-3 border-b">Tags</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Updated At</th>
            <th className="p-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a._id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{a.title}</td>
              <td className="p-3 border-b">{a.tags.join(", ")}</td>
              <td className="p-3 border-b">
                <span
                  className={`px-2 py-1 text-sm rounded ${
                    a.status === "published"
                      ? "bg-green-100 text-green-600" :
                       a.status === "unpublished" ? "bg-orange-100 text-orange-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {a.status}
                </span>
              </td>
              <td className="p-3 border-b">
                {new Date(a.updatedAt).toLocaleString()}
              </td>
              <td className="p-3 border-b space-x-2">
                <button
                  onClick={() => handleEdit(a)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal with Formik */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-white/30" >
          <div className="bg-white rounded-lg p-6 w-1/2 shadow-lg">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4">
                {editingArticle ? "Edit Article" : "New Article"}
              </h2>
              <img onClick={() => setModalOpen(false)} className="w-[20px] h-[20px]" src={close} alt="closeIcon" />
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
                  {/* Title */}
                  <div>
                    <Field
                      name="title"
                      placeholder="Title"
                      className="w-full border px-3 py-2 rounded-md"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Body */}
                  <div>
                    <Field
                      as="textarea"
                      name="body"
                      placeholder="Body"
                      rows="4"
                      className="w-full border px-3 py-2 rounded-md"
                    />
                    <ErrorMessage
                      name="body"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <Field
                      name="tags"
                      placeholder="Tags (comma separated)"
                      className="w-full border px-3 py-2 rounded-md"
                    />
                    <ErrorMessage
                      name="tags"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <Field
                      as="select"
                      name="status"
                      className="w-full border px-3 py-2 rounded-md"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="unpublished">Unpublished</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="bg-gray-300 px-4 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
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
