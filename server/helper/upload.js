import multer, { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
var types = ["image/png", "image/jpg", "image/jpeg"];

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     let ext = path.extname(file.originalname);
//     cb(null, file.fieldname + Date.now() + ext);
//   },
// });
// var upload = multer({ diskStorage });
var storage = multer.memoryStorage();
var upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    file.originalname = uuidv4() + ".png";
    console.log("file", file);
    if (types.includes(file.mimetype)) {
      callback(null, true);
    } else {
      console.log(types + file.mimetype);
      console.log("File not accepted");
    }
  },
});

export { upload };
