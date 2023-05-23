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
    <>
      <h1 className="heading">
        {issue.title}
        <span className="issueNumber">#{issue.number}</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "33%",
            marginTop: "10px",
          }}
        >
          <Icon
            icon="octicon:issue-opened-16"
            color="white"
            style={{
              backgroundColor: "#3fb950",
              width: 20,
              height: 20,
              padding: "4px",
              borderRadius: "50px 0 0 50px",
            }}
          />
          <span
            style={{
              backgroundColor: "#3fb950",
              color: "white",
              padding: "4px",
              marginLeft: "-1px",
              borderRadius: "0 50px 50px 0",
              fontSize: "17px",
            }}
          >
            Open
          </span>
          <span
            style={{
              fontSize: "14px",
              paddingLeft: "10px",
            }}
          >
            {issue.user.login} opened this issue {formattedDate}
          </span>
        </div>
      </h1>

      <div className="issueDetails">
        <div className="sectionOne">
          <div className="avatarContainer">
            <img
              className="userAvatar"
              src={issue.user.avatar_url}
              alt={issue.user.login}
            />
          </div>
          <div className="issueInfo">
            <div className="subHeading">{issue.user.login}</div>
            <FormattedTextComponent body={issue.body} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
