import axios from "axios";
import { useEffect, useState } from "react";

const useFetchIssue = (issueId) => {
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

  return { issue, loading, error };
};

export default useFetchIssue;
