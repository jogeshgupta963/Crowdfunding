import { s3Upload } from "../helper/s3.js";

async function uploadFiles(req, res) {
  try {
    const image = await s3Upload(req.file);
    res.json(image);
  } catch (err) {}
}

export { uploadFiles };
