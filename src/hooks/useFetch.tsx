import { useState, useEffect } from "react";

function useFetch<T>(url: string | null) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) return; // Avoid fetching if URL is null

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url,
          {
            method: 'GET',
            headers: {'Access-Control-Allow-Origin': 'https://itunes.apple.com'}
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result: T = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { loading, data, error };
}

export default useFetch;
