import { useState } from 'react';
import axios from 'axios';

const useFetchMetadata = () => {
    const [metadata, setMetadata] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchMetadata = async (urls) => {
        setLoading(true);
        setError(null);
        setMetadata([]);

        try {
            const response = await axios.post('/api/fetch_metadata', { urls });
            setMetadata(response.data);
        } catch (err) {
            setError('Error fetching metadata');
        } finally {
            setLoading(false);
        }
    };

    return { metadata, error, loading, fetchMetadata };
};

export default useFetchMetadata;
