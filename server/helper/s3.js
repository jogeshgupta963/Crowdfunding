import AWS from "aws-sdk";
import "dotenv/config";

async function s3Upload(file) {
  try {
    AWS.config.update({
      region: "ap-south-1",
      accessKeyId: "AKIA24BX2W3TNJADUBMB",
      secretAccessKey: "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",
    });
    const s3 = new AWS.S3({
      region: "ap-south-1",
      accessKey: "AKIA24BX2W3TNJADUBMB",
      secretKey: "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",
    });
    const param = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `campaign/${file.originalname}`,
      Body: file.buffer,
    };
    const data = await s3.upload(param).promise();
    console.log(data);
    return data.Location;
  } catch (err) {
    console.log(err);
  }
}

export { s3Upload };
