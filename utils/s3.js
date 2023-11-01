import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const { AWS_ACCESS_KEY_ID, AWS_SECRET_KEY, AWS_S3_BUCKET } = process.env;
const client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

const getS3Url = (filename) => {
  return `https://${AWS_S3_BUCKET}.s3.eu-north-1.amazonaws.com/${filename}`;
};

export const uploadFileToS3 = async (file, fileName) => {
  console.log("test");
  const command = new PutObjectCommand({
    Bucket: AWS_S3_BUCKET,
    Key: fileName,
    ACL: "public-read",
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await client.send(command);

  return getS3Url(fileName);
};
