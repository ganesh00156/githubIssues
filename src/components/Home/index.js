import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

const GitHubIssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 10; // Number of issues per page
  const totalPages = Math.ceil(issues.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/repos/facebook/react/issues",
          {
            params: {
              state: "open",
              per_page: 10, // Fetch a larger number of issues for pagination
            },
          }
        );
        setIssues(response.data);

        setLoading(false);
        console.log(issues);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="issueList">
      <h1>GitHub Issues</h1>
      <ul>
        {issues.slice(startIndex, endIndex).map((issue) => (
          <li className="issues" key={issue.id}>
            <p>
              <Icon
                icon="octicon:issue-opened-16"
                color="#3fb950"
                style={{ width: 16, height: 16, alignItems: "center" }}
              />
              <span> </span>
              {issue.title}
            </p>
            {issue.labels.map((label) => (
              <span
                key={label.id}
                style={{
                  backgroundColor: `#${label.color}`,
                  borderRadius: "20px",
                  border: "0.5px solid black",
                  padding: "2px",
                  marginRight: "3px",
                }}
              >
                {" "}
                {label.name}{" "}
              </span>
            ))}
            <p className="issueState">{issue.state}</p>
            <p>#{issue.number}</p>
          </li>
        ))}
      </ul>

      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default GitHubIssuesPage;
