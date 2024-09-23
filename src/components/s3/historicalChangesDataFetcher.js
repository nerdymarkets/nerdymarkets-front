import { useEffect } from 'react';
import useFetchAllFilesFromS3 from '@/hooks/useFetchAllFilesFromS3';
import useHistoricalChangesDataStore from '@/stores/useHistoricalChangesDataStore';
const HistoricalChangesDataFetcher = () => {
  const setHistoricalChanges = useHistoricalChangesDataStore(
    (state) => state.setHistoricalChanges
  );
  const setLoading = useHistoricalChangesDataStore((state) => state.setLoading);
  const HistoricalChanges = useHistoricalChangesDataStore(
    (state) => state.HistoricalChanges
  );
  const { fetchAllFilesFromS3, loading } = useFetchAllFilesFromS3();

  useEffect(() => {
    if (HistoricalChanges.length === 0 && !loading) {
      const fetchAllTickers = async () => {
        const bucketName = process.env.NEXT_PUBLIC_BUCKETNAME;
        const prefix = 'IV_Portfolios/Data/Tickers_changes/';
        const files = await fetchAllFilesFromS3(bucketName, prefix);
        if (files) {
          const response = files.map((file) => {
            return {
              fileName: file.key,
              data: csvToJson(file.content),
            };
          });
          setHistoricalChanges(response);
        }
      };

      fetchAllTickers();
    }
  }, [
    fetchAllFilesFromS3,
    loading,
    HistoricalChanges.length,
    setHistoricalChanges,
  ]);

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  const csvToJson = (csv) => {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',').map((header) => header.trim());

    const jsonData = lines
      .slice(1)
      .map((line) => {
        const values = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g).map((val) => {
          let cleanedValue = val.replace(/(^"|"$)/g, '').trim();
          if (cleanedValue.startsWith('[') && cleanedValue.endsWith(']')) {
            try {
              cleanedValue = JSON.parse(cleanedValue.replace(/'/g, '"'));
            } catch (error) {
              return null;
            }
          }

          return cleanedValue;
        });

        if (values.length !== headers.length) {
          return null;
        }

        const entry = {};
        headers.forEach((header, index) => {
          entry[header] = values[index];
        });
        return entry;
      })
      .filter((entry) => entry !== null);

    return jsonData;
  };

  return null;
};

export default HistoricalChangesDataFetcher;
