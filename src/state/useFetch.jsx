import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(url, {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setError(error);
                    setData(null);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [url]);

    return { data, error, loading };
};

export default useFetch;