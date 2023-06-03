import { useEffect, useState } from "react";
import axios from "axios";

const useFetchIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      const company = "facebook";
      const repo = "react";

      try {
        const response = await axios.get(
          `https://api.github.com/repos/${company}/${repo}/issues`,
          {
            params: {
              state: "open",
              per_page: 100,
            },
          }
        );
        setIssues(response.data);
        setLoading(false);
        console.log(issues.length);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchIssues();
    //eslint-disable-next-line
  }, []);

  return { issues, loading, error };
};

export default useFetchIssues;
