import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import Papa from 'papaparse';

export default async function handler(req, res) {
  const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
  });

  const params = {
    Bucket: 'betastage-betastack-nerdym-datastorebucket46f857ee-molwgoe5ncwf',
    Key: 'IV_Portfolios/Data/Metrics/Performance/Daily/2024-08-29/etf_returns.csv', // Ensure the path is correct
  };

  try {
    const command = new GetObjectCommand(params);
    const data = await s3.send(command);
    const csvContent = await data.Body.transformToString(); // Convert S3 object Body to string

    const result = Papa.parse(csvContent, {
      header: true, // This ensures that the first row is treated as headers
      dynamicTyping: true, // Converts numeric values to numbers
      skipEmptyLines: true, // Skips empty lines
    });

    if (result.errors.length > 0) {
      res
        .status(500)
        .json({ error: 'Error parsing CSV data', details: result.errors });
      return;
    }

    res.status(200).json(result.data); // Return JSON data
  } catch (err) {
    res.status(500).json({ error: 'Error fetching file from S3' });
  }
}
