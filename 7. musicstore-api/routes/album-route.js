const express = require("express");
const {
  addAlbum,
  updateAlbum,
  getAllAlbums,
  getSingleAlbumById,
  deleteAlbum,
} = require("../controllers/album-controller");

const albumRouter = express.Router();

albumRouter.get("/get", getAllAlbums);
albumRouter.get("/get/:id", getSingleAlbumById);
albumRouter.post("/post", addAlbum);
albumRouter.put("/put/:id", updateAlbum);
albumRouter.delete("/delete/:id", deleteAlbum);

module.exports = albumRouter;
