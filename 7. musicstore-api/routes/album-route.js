const express = require("express");
const {
  addAlbum,
  updateAlbum,
  getAllAlbums,
  getSingleAlbumByID,
  deleteAlbum,
} = require("../controllers/album-controller");

const albumRouter = express.Router();

albumRouter.get("/get", getAllAlbums);
albumRouter.get("/get/:id", getSingleAlbumByID);
albumRouter.post("/add", addAlbum);
albumRouter.put("/update/:id", updateAlbum);
albumRouter.delete("/delete/:id", deleteAlbum);

module.exports = albumRouter;
