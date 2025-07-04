const Album = require("../models/album");

const getAllAlbums = async () => {
  try {
    const allAlbums = await Album.find({});
    if (allAlbums?.length == 0) {
      return res.status(404).json({
        success: false,
        message: "No albums found!",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "All albums fetched successfully.",
        data: allAlbums,
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

const getSingleAlbumById = async () => {};

const addAlbum = async () => {};

const updateAlbum = async () => {};

const deleteAlbum = async () => {};

module.exports = {
  getAllAlbums,
  getSingleAlbumById,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};
