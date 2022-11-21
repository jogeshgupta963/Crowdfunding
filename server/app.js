import express from "express";
import cors from "cors";

import { router as fileRouter } from "./routes/file.js";
import bodyParser from "body-parser";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.Router());
app.use(bodyParser.urlencoded({ extended: false }));

// app.post("/file", upload.single("image"), async (req, res) => {
//   try {
//     const image = await s3Upload(req.file);
//     res.json("image");
//   } catch (err) {
//     res.json(err);
//   }
// });

app.get("/file", (req, res) => {
  res.json("heyy");
});
app.use("/file", fileRouter);
app.listen(5000, () => {
  console.log("server started");
});
