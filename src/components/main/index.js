import "../../components/main/style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";

const GitHubIssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 5; // Number of issues per page
  const totalPages = Math.ceil(issues.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  useEffect(() => {
    const company = "facebook";
    const repo = "react";
    const fetchIssues = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${company}/${repo}/issues`,
          {
            params: {
              state: "open",
              per_page: 60, // Fetch a larger number of issues for pagination
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
    return (
      <div className="spinner-container">
        <BeatLoader
          css={css`
            display: block;
            margin: 0 auto;
            border-color: red;
          `}
          size={15}
          color={"#123abc"}
          loading={loading}
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  //Number of buttons
  const maxButtons = 5;
  let startButton = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endButton = Math.min(startButton + maxButtons - 1, totalPages);
  startButton = Math.max(1, endButton - maxButtons + 1);

  return (
    <div className="issueList">
      <div>
        <ul className="issueUl">
          {issues.slice(startIndex, endIndex).map((issue) => {
            const { title, created_at, user } = issue;
            const currentTime = moment();
            const formattedDate = moment(created_at).from(currentTime);

            return (
              <li className="issues" key={issue.id}>
                <p>
                  <Icon
                    icon="octicon:issue-opened-16"
                    color="#3fb950"
                    style={{ width: 16, height: 16, alignItems: "center" }}
                  />
                  <span> </span>
                  <Link className="issueLink" to={`/issues/${issue.number}`}>
                    {title}
                  </Link>
                  {issue.labels.map((label) => (
                    <span
                      className="statusIssue"
                      key={label.id}
                      style={{
                        backgroundColor: `#${label.color}`,

                        color:
                          label.color === "9149d1" || label.color === "b60205"
                            ? "white"
                            : "inherit",
                      }}
                    >
                      {" "}
                      {label.name}{" "}
                    </span>
                  ))}
                </p>

                <p className="issueNumber">
                  #{issue.number} opened {formattedDate} by {user.login}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          {Array.from(
            { length: endButton - startButton + 1 },
            (_, index) => startButton + index
          ).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GitHubIssuesPage;
