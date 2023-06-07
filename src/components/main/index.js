import React, { useState } from "react";
import { Icon } from "@iconify/react";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import useFetchIssues from "../../hook/useFetchIssues";
import LoadingSpinner from "../spinner.js";
import Label from "./label";

const GitHubIssuesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 9;

  const { issues, loading, error } = useFetchIssues();

  const totalPages = Math.ceil(issues.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-center mt-3 lg:ml-12 lg:mr-12">
      <div className="icontainer w-full px-128 ml-8 mr-8">
        <ul className="border-t border-l border-r rounded-tl-lg border-gray-200 rounded-tr-lg">
          <li className="issues border-b border-gray-200 pt-2 pb-2 pl-2 bg-gray-100 rounded-tr-lg rounded-tl-lg ">
            <Icon
              icon="octicon:issue-opened-16"
              color="#3fb950"
              className="mr-4 mt-1 mb-1 inline-flex"
              style={{ width: 16, height: 16, alignItems: "center" }}
            />
            <span>Open Issues</span>
          </li>
          {issues.slice(startIndex, endIndex).map((issue) => {
            const { title, created_at, user } = issue;
            const currentTime = moment();
            const formattedDate = moment(created_at).from(currentTime);

            return (
              <li
                className="issues border-b border-gray-200 pt-2 pb-2 pl-2 hover:bg-slate-100 "
                key={issue.id}
              >
                <p className="flex items-center flex-wrap ">
                  <Icon
                    className="lg:mr-4"
                    icon="octicon:issue-opened-16"
                    color="#3fb950"
                    style={{ width: 16, height: 16, alignItems: "center" }}
                  />
                  <span className="hover:text-blue-700 ">
                    <Link to={`/issues/${issue.number}`}>{title}</Link>
                  </span>
                  <Label issue={issue} />
                </p>

                <p className="issueNumber lg:pl-7 text-gray-500">
                  #{issue.number} opened {formattedDate} by {user.login}
                </p>
              </li>
            );
          })}
        </ul>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default GitHubIssuesPage;
