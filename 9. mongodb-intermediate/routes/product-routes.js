const express = require("express");
const {
  insertSampleProducts,
  getAllProducts,
  getFilteredProducts,
} = require("../controllers/product-controller");

const router = express.Router();

router.get("/get", getAllProducts);
router.get("/get-filter", getFilteredProducts);
router.post("/add", insertSampleProducts);

module.exports = router;
