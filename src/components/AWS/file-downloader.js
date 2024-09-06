import { useState, useEffect } from 'react';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { toast } from 'react-toastify';
const FileDownloader = () => {
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    const fetchFileFromS3 = async () => {
      // Initialize the S3 client
      const s3 = new S3Client({
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        },
      });

      const params = {
        Bucket:
          'betastage-betastack-nerdym-datastorebucket46f857ee-molwgoe5ncwf',
        Key: 'IV_Portfolios/Data/Metrics/Performance/Daily/2024-08-29/etf_returns.csv',
      };

      try {
        const command = new GetObjectCommand(params);
        const data = await s3.send(command);
        const csvContent = await data.Body.transformToString();

        setFileContent(csvContent);
      } catch (err) {
        toast.error('Error fetching file from S3:');
      }
    };

    fetchFileFromS3();
  }, []);

  return (
    <div>
      <h2>Fetched CSV Data:</h2>
      <pre>{fileContent}</pre>
    </div>
  );
};

export default FileDownloader;
