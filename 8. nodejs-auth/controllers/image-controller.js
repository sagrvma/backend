const Image = require("../models/image");
const { uploadToCloudinary } = require("../helper/cloudinary-helper");

const uploadImage = async (req, res) => {
  try {
    //Check if file is missing in req
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required. Please upload an image.",
      });
    }

    //Upload to Cloudinary
    const { url, publicID } = await uploadToCloudinary(req.file.path);

    //Store the image url and publicID along with uploading user's data in the database
    const newlyUploadedImage = new Image({
      url,
      publicID,
      uploadedBy: req.userInfo.userID,
    });

    await newlyUploadedImage.save();

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully.",
      image: newlyUploadedImage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again. ",
    });
  }
};

module.exports = {
  uploadImage,
};
