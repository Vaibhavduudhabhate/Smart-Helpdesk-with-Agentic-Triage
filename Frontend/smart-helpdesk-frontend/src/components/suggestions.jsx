import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function Suggestion({ suggestion }) {
  const [kbArticles, setKbArticles] = useState([]);

  useEffect(() => {
    if (suggestion.citations?.length > 0) {
      axios
        .get(`${API_URL}/kb-articles`, {
          params: { ids: suggestion.citations }, 
        })
        .then(res => setKbArticles(res.data))
        .catch(err => console.error("Error fetching KB articles:", err));
    }
  }, [suggestion.citations]);

  return (
    <div>
      <p>{suggestion.message}</p>

      {kbArticles.length > 0 && (
        <div className="mt-3">
          <strong>Related KB Articles:</strong>
          <ul className="list-disc ml-6">
            {kbArticles.map(article => (
              <li key={article._id}>
                <a
                  href={`/kb/${article._id}`}
                  className="text-blue-600 underline"
                >
                  {article.title}
                <p>{article.body}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
