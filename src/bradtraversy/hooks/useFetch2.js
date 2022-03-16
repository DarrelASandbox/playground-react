import { useState, useEffect, useRef } from 'react';

async function fetchData(url, config) {
  const response = await fetch(encodeURI(url), config);

  return new Promise(async (resolve, reject) => {
    let data = {};
    if (response.json) data = await response.json();
    if (!response.ok) {
      const error = new Error(
        `${response.status} message: ${response.statusText}`
      );
      reject({ error, data });
    } else {
      resolve({ data });
    }
  });
}

function useFetch(url, options = {}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchOptions = useRef({
    'Content-Type': 'application/json',
    ...options,
  });

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    fetchData(url, { signal: controller.signal, ...fetchOptions })
      .then(({ data }) => {
        setData(data);
        setError(null);
        setLoading(false);
      })
      .catch(({ error, data }) => {
        setError(error);
        setData(data);
        setLoading(false);
        console.error(error);
      });
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
