import { useEffect } from 'react';
import usePortfolioDataStore from '@/stores/usePortfolioDataStore';
import useFetchLatestData from '@/hooks/useFetchLatestData';

const LatestPortfolioFetcher = () => {
  const setPortfolioData = usePortfolioDataStore(
    (state) => state.setPortfolioData
  );
  const setLoading = usePortfolioDataStore((state) => state.setLoading);
  const setError = usePortfolioDataStore((state) => state.setError);
  const setLatestFolderDate = usePortfolioDataStore(
    (state) => state.setLatestFolderDate
  );
  const portfolioData = usePortfolioDataStore((state) => state.portfolioData);
  const latestFolderDate = usePortfolioDataStore(
    (state) => state.latestFolderDate
  );
  const { fetchLatestDataFromS3, loading, error } = useFetchLatestData();

  useEffect(() => {
    if (portfolioData.length === 0 && !loading) {
      const fetchPortfolioData = async () => {
        const bucketName = process.env.NEXT_PUBLIC_BUCKETNAME;
        const prefix = 'IV_Portfolios/Data/Portfolios/';
        const fileSuffix = 'PortfoliosValues.csv';

        const result = await fetchLatestDataFromS3(
          bucketName,
          prefix,
          fileSuffix
        );
        if (result && result.latestDate !== latestFolderDate) {
          setPortfolioData(result.json);
          setLatestFolderDate(result.latestDate);
        }
      };

      fetchPortfolioData();
    }
  }, [
    fetchLatestDataFromS3,
    setPortfolioData,
    portfolioData,
    loading,
    setLatestFolderDate,
    latestFolderDate,
  ]);

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  useEffect(() => {
    setError(error);
  }, [error, setError]);

  return null;
};

export default LatestPortfolioFetcher;
