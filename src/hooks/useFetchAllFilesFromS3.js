import { useState } from 'react';
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { toast } from 'react-toastify';

const useFetchAllFilesFromS3 = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllFilesFromS3 = async (bucketName, prefix) => {
    setLoading(true);
    setError(null);

    const s3 = new S3Client({
      region: process.env.NEXT_PUBLIC_AWS_REGION,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
      },
    });

    try {
      const listCommand = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: prefix,
      });

      const listResponse = await s3.send(listCommand);

      if (!listResponse.Contents || listResponse.Contents.length === 0) {
        toast.error('No objects found in the specified directory.');
        setLoading(false);
        return null;
      }
      const filePromises = listResponse.Contents.map(async (file) => {
        const getCommand = new GetObjectCommand({
          Bucket: bucketName,
          Key: file.Key,
        });

        const data = await s3.send(getCommand);
        const content = await data.Body.transformToString();
        return {
          key: file.Key,
          content,
        };
      });

      const files = await Promise.all(filePromises);

      setLoading(false);
      return files;
    } catch (err) {
      toast.error('Error fetching files from S3: ' + err.message);
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return { fetchAllFilesFromS3, loading, error };
};

export default useFetchAllFilesFromS3;
