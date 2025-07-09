const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const isAdminUser = require("../middleware/admin-middleware");

const router = express.Router();

//Upload the image
route.post("/upload", authMiddleware, isAdminUser);

//To get all the images

module.exports = router;
