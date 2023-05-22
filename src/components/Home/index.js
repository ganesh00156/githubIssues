import React, { useEffect, useState } from "react";
import axios from "axios";

const GitHubIssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/repos/facebook/react/issues",
          {
            params: {
              state: "open",
              per_page: 10, // Adjust as per your requirements
            },
          }
        );
        setIssues(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>GitHub Issues</h1>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <h3>{issue.title}</h3>
            <p>{issue.body}</p>
            {/* Render other issue information here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GitHubIssuesPage;
