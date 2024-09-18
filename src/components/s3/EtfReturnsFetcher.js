import { useEffect } from 'react';
import useEquityDataStore from '@/stores/useEtfDataStore';
import useFetchLatestData from '@/hooks/useFetchLatestData';

const EtfReturnsFetcher = () => {
  const setEtfData = useEquityDataStore((state) => state.setEtfData);
  const setLoading = useEquityDataStore((state) => state.setLoading);
  const EtfData = useEquityDataStore((state) => state.EtfData);
  const { fetchLatestDataFromS3, loading } = useFetchLatestData();

  useEffect(() => {
    if (EtfData.length === 0 && !loading) {
      const fetchEquityData = async () => {
        const bucketName = process.env.NEXT_PUBLIC_BUCKETNAME;
        const prefix = 'IV_Portfolios/Data/Metrics/Performance/Daily';
        const fileSuffix = 'etf_returns.csv';

        const result = await fetchLatestDataFromS3(
          bucketName,
          prefix,
          fileSuffix
        );
        if (result) {
          setEtfData(result.json);
        }
      };

      fetchEquityData();
    }
  }, [fetchLatestDataFromS3, loading, EtfData.length, setEtfData]);

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  return null;
};

export default EtfReturnsFetcher;
