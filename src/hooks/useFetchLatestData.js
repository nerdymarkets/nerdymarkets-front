// hooks/useFetchLatestData.js
import { useState, useCallback } from 'react';
import { fetchLatestDataFromS3 } from '@/utils/fetchS3Data';
import { toast } from 'react-toastify';

const useFetchLatestData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLatestData = useCallback(
    async (bucketName, prefix, fileSuffix) => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchLatestDataFromS3(
          bucketName,
          prefix,
          fileSuffix
        );
        return result;
      } catch (err) {
        toast.error('Error fetching file from S3: ' + err.message);
        setError(err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { fetchLatestData, loading, error };
};

export default useFetchLatestData;
