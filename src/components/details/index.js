import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../components/details/style.css";
import FormattedTextComponent from "./format";
import { Icon } from "@iconify/react";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";
import moment from "moment/moment";

const Details = () => {
  const location = useLocation();
  const issueId = location.pathname.split("/")[2];
  console.log(issueId);

  const [issue, setIssue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const company = "facebook";
    const repo = "react";
    const fetchIssues = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${company}/${repo}/issues/${issueId}`
        );
        setIssue(response.data);

        setLoading(false);
        console.log(issue);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchIssues();
    // eslint-disable-next-line
  }, []);

  const { created_at } = issue;
  const currentTime = moment();
  const formattedDate = moment(created_at).from(currentTime);

  if (loading) {
    return (
      <div className="spinner-container">
        <BarLoader
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
  return (
    <div className="container">
      <div>
        <div className="flex justify-center mt-3 lg:ml-12 lg:mr-12">
          <div className=" p-4 w-full lg:w-3/4">
            <h1 className="text-left mt-1 mb-4 text-lg font-bold pb-3 border-b border-gray-300">
              {issue.title}
              <span className="text-gray-500 pl-2">#{issue.number}</span>
              <div className="flex items-center ml-1 mt-2">
                <Icon
                  icon="octicon:issue-opened-16"
                  color="white"
                  style={{
                    backgroundColor: "#3fb950",
                    width: 20,
                    height: 20,
                    borderRadius: 50,
                  }}
                />
                <span className="ml-1">Open</span>
                <span className="text-sm ml-2 text-gray-600">
                  {issue.user.login} opened this issue {formattedDate}
                </span>
              </div>
            </h1>
            <div className="flex">
              <div className="h-12 w-12 ml-2 mr-3 rounded-full overflow-hidden">
                <img
                  className="h-auto w-full object-cover"
                  src={issue.user.avatar_url}
                  alt={issue.user.login}
                />
              </div>
              <div className="flex-grow border border-gray-300 rounded-lg p-4 w-full lg:w-3/4">
                <div className="text-xl w-full font-bold lg:border-b-2 pt-2 pb-2 ">
                  {issue.user.login}
                </div>
                <FormattedTextComponent body={issue.body} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
