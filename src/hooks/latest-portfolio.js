import { useState, useEffect } from 'react';
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { toast } from 'react-toastify';

const useLatestPortfolio = () => {
  const [data, setData] = useState(() => {
    const cachedData = sessionStorage.getItem('portfolioData');
    return cachedData ? JSON.parse(cachedData) : [];
  });
  const [loading, setLoading] = useState(
    !sessionStorage.getItem('portfolioData')
  );
  const [error, setError] = useState(null);
  const [latestFolderDate, setLatestFolderDate] = useState(() => {
    return sessionStorage.getItem('latestFolderDate') || null;
  });

  useEffect(() => {
    const fetchLatestFileFromS3 = async () => {
      setLoading(true);
      setError(null);
      const s3 = new S3Client({
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        },
      });

      const bucketName = process.env.NEXT_PUBLIC_BUCKETNAME;
      const prefix = 'IV_Portfolios/Data/Portfolios/';

      try {
        const listCommand = new ListObjectsV2Command({
          Bucket: bucketName,
          Prefix: prefix,
        });
        const listResponse = await s3.send(listCommand);

        if (!listResponse.Contents || listResponse.Contents.length === 0) {
          toast.error('No objects found in the Portfolios directory.');
          setLoading(false);
          return;
        }
        const dateFolders = [
          ...new Set(
            listResponse.Contents.map((file) => {
              const match = file.Key.match(/\/(\d{4}-\d{2}-\d{2})\//);
              return match ? match[1] : null;
            }).filter((date) => date !== null)
          ),
        ];

        if (dateFolders.length === 0) {
          toast.error('No date folders found in the prefix.');
          setLoading(false);
          return;
        }

        const sortedDateFolders = dateFolders.sort(
          (a, b) => new Date(b).getTime() - new Date(a).getTime()
        );

        const latestDate = sortedDateFolders[0];
        if (latestFolderDate === latestDate) {
          setLoading(false);
          return;
        }

        for (const dateFolder of sortedDateFolders) {
          const csvFiles = listResponse.Contents.filter(
            (file) =>
              file.Key.includes(`/${dateFolder}/`) &&
              file.Key.endsWith('PortfoliosValues.csv')
          );

          if (csvFiles.length > 0) {
            const params = {
              Bucket: bucketName,
              Key: csvFiles[0].Key,
            };

            const command = new GetObjectCommand(params);
            const data = await s3.send(command);
            const csvContent = await data.Body.transformToString();

            const json = csvToJson(csvContent);
            setData(json);
            setLatestFolderDate(latestDate);
            sessionStorage.setItem('portfolioData', JSON.stringify(json));
            sessionStorage.setItem('latestFolderDate', latestDate);

            setLoading(false);
            return;
          }
        }
        toast.error(
          'No PortfoliosValues.csv files found in any available date folders.'
        );
        setLoading(false);
      } catch (err) {
        toast.error('Error fetching file from S3: ' + err.message);
        setError(err);
        setLoading(false);
      }
    };

    if (!latestFolderDate) {
      fetchLatestFileFromS3();
    } else {
      setLoading(false);
    }
  }, [latestFolderDate]);

  const csvToJson = (csv) => {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',').map((header) => header.trim());
    const jsonData = lines
      .slice(1)
      .map((line) => {
        const values = line.split(',').map((value) => value.trim());
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

  return { data, loading, error, latestFolderDate };
};

export default useLatestPortfolio;
