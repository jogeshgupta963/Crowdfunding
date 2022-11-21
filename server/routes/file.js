import express from "express";
import { uploadFiles } from "../controllers/file.js";

import { upload } from "../helper/upload.js";

const router = express.Router();

router.route("/").post(upload.single("image"), uploadFiles);

export { router };
