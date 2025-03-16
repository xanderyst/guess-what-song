import {useState, useEffect} from 'react';

function useFetch (url: string) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect (() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url]);

    return {loading, data, error};
}

export default useFetch;