const express = require("express");
const {
  insertSampleProducts,
  getAllProducts,
  getFilteredProductsStats,
} = require("../controllers/product-controller");

const router = express.Router();

router.get("/get", getAllProducts);
router.get("/get-filter", getFilteredProductsStats);
router.post("/add", insertSampleProducts);

module.exports = router;
