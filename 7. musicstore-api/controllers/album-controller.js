const Album = require("../models/album");

const getAllAlbums = async (req, res) => {
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

const getSingleAlbumByID = async (req, res) => {
  try {
    const albumID = req.params.id;
    const albumFoundByID = await Album.findById(albumID);
    if (!albumFoundByID) {
      return res.status(404).json({
        success: false,
        message:
          "No album found with the given ID! Please try again with another ID.",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Album with the given id fetched successfully.",
        data: albumFoundByID,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const addAlbum = async (req, res) => {
  try {
    const albumData = req.body;
    const newAlbum = await Album.create(albumData);
    return res.status(200).json({
      success: true,
      message: "New album added successfully.",
      data: newAlbum,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

const updateAlbum = async (req, res) => {
  try {
    const albumID = req.params.id;
    const updatedAlbumFormData = req.body;
    const updatedAlbum = await Album.findByIdAndUpdate(
      albumID,
      updatedAlbumFormData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedAlbum) {
      return res.status(404).json({
        success: false,
        message:
          "No album found with the given id! Please try again with another id.",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Album with the given id updated successfully.",
        data: updatedAlbum,
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

const deleteAlbum = async () => {};

module.exports = {
  getAllAlbums,
  getSingleAlbumByID,
  addAlbum,
  updateAlbum,
  deleteAlbum,
};
