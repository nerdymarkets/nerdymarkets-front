import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

export const fetchLatestDataFromS3 = async (bucketName, prefix, fileSuffix) => {
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
      throw new Error('No objects found in the specified directory.');
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
      throw new Error('No date folders found in the prefix.');
    }

    const sortedDateFolders = dateFolders.sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    for (const dateFolder of sortedDateFolders) {
      const csvFiles = listResponse.Contents.filter(
        (file) =>
          file.Key.includes(`/${dateFolder}/`) && file.Key.endsWith(fileSuffix)
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
        return { json, latestDate: dateFolder };
      }
    }

    throw new Error(
      `No ${fileSuffix} files found in any available date folders.`
    );
  } catch (error) {
    console.error('Error fetching file from S3:', error);
    throw error;
  }
};

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
