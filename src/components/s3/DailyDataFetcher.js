import { useEffect } from 'react';
import useDailyInceptionDataStore from '@/stores/useDailyInceptionDataStore';
import useFetchLatestData from '@/hooks/useFetchLatestData';

const DailyDataFetcher = () => {
  const setDaily = useDailyInceptionDataStore((state) => state.setDaily);
  const daily = useDailyInceptionDataStore((state) => state.daily);

  const { fetchLatestDataFromS3, loading } = useFetchLatestData();

  useEffect(() => {
    if (!daily && !loading) {
      const fetchDailyData = async () => {
        const bucketName = process.env.NEXT_PUBLIC_BUCKETNAME;
        const prefix = 'IV_Portfolios/Data/Metrics/Performance/Daily/';
        const fileSuffix = 'summary_returns.csv';
        const result = await fetchLatestDataFromS3(
          bucketName,
          prefix,
          fileSuffix
        );

        if (result) {
          setDaily(result.json);
        }
      };

      fetchDailyData();
    }
  }, [daily, fetchLatestDataFromS3, loading, setDaily]);

  return null;
};

export default DailyDataFetcher;
