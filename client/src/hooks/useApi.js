// useApi.js - Custom hook for API calls

import { useState, useEffect } from "react";

const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiCall();
        if (isMounted) {
          setData(result.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.error || err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (apiCall) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, dependencies);

  const refetch = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      setData(result.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export default useApi;
