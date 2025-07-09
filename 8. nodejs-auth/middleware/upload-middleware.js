const multer = require("multer");
const path = require("path");

//Set our multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//File filter function
const checkFileFilter = (req, res, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."));
  }
};

//Multer middleware
module.exports = multer({
  storage: storage,
  fileFiler: checkFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB Max limit
  },
});
