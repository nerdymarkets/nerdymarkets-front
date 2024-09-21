import { useEffect } from 'react';
import useEquityDataStore from '@/stores/useEqutiyDataStore';
import useFetchLatestData from '@/hooks/useFetchLatestData';

const EquityDataFetcher = () => {
  const setEquityData = useEquityDataStore((state) => state.setEquityData);
  const setLoading = useEquityDataStore((state) => state.setLoading);
  const equityData = useEquityDataStore((state) => state.equityData);
  const { fetchLatestDataFromS3, loading } = useFetchLatestData();

  useEffect(() => {
    if (equityData.length === 0 && !loading) {
      const fetchEquityData = async () => {
        const bucketName = process.env.NEXT_PUBLIC_BUCKETNAME;
        const prefix = 'IV_Portfolios/Data/Metrics/Performance/Inception/';
        const fileSuffix = 'Portfolios_equity_data_since_inception.csv';

        const result = await fetchLatestDataFromS3(
          bucketName,
          prefix,
          fileSuffix
        );
        if (result) {
          setEquityData(result.json);
        }
      };

      fetchEquityData();
    }
  }, [fetchLatestDataFromS3, setEquityData, equityData, loading]);

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  return null;
};

export default EquityDataFetcher;
