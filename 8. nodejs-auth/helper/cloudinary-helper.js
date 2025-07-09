const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);

    return {
      //Also returning these so later in case we need to update or delete the image, we can do that not only in our database but actually from clousinary as well
      url: result.secure_url,
      publicID: result.public_id,
    };
  } catch (error) {
    console.error("Error while uploading image to Cloudinary!", error);
    throw new Error("Error while uploading image to Cloudinary! ");
  }
};

module.exports = {
  uploadToCloudinary,
};
