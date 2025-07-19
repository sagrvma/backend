const Image = require("../models/image");
const { uploadToCloudinary } = require("../helper/cloudinary-helper");
const fs = require("fs");

const uploadImageController = async (req, res) => {
  try {
    //Check if file is missing in req
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required. Please upload an image.",
      });
    }

    //Upload to Cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    //Store the image url and publicId along with uploading user's data in the database
    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    await newlyUploadedImage.save();

    //Delete the file from local storage
    fs.unlinkSync(req.file.path);

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

const fetchImagesController = async (req, res, next) => {
  try {
    const images = await Image.find({});
    if (images) {
      return res.status(200).json({
        success: true,
        data: images,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

module.exports = {
  uploadImageController,
  fetchImagesController,
};
