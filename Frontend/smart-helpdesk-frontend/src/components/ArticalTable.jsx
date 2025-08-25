import React, { useEffect, useState } from "react";
import axios from "axios";

const ArticleTable = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");

  // Fetch Articles
  const fetchArticles = async () => {
    const res = await axios.get(`http://localhost:3000/api/kb?query=${query}`);
    setArticles(res.data);
  };

  useEffect(() => {
    fetchArticles();
  }, [query]);

  // Delete Article
  const handleDelete = async (id) => {
    if (window.confirm("Delete this article?")) {
      await axios.delete(`http://localhost:3000/api/kb/${id}`);
      fetchArticles();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-4 py-2 rounded-md w-1/3"
        />
        <div>
            <button onClick={()=>{
            logout();
            setForm({ email: "", password: "" });
          }
          } type="submit" className="bg-white text-blue-500 border mt-2 p-2 w-[50%]">
              Logout
          </button>
          <button
            onClick={() => alert("Open Create Article Modal")}
            className="bg-blue-500 w-[50%] text-white px-4 py-2 rounded-md"
          >
            + New Article
          </button>
        </div>
      </div>

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
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
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
                  onClick={() => alert("Edit Article: " + a._id)}
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
    </div>
  );
};

export default ArticleTable;
