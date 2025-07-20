const express = require("express");
const {
  insertSampleProducts,
  getAllProducts,
  getFilteredProductsStats,
  getProductAnalysis,
} = require("../controllers/product-controller");

const router = express.Router();

router.get("/get", getAllProducts);
router.get("/get-filter", getFilteredProductsStats);
router.get("/get-analysis", getProductAnalysis);
router.post("/add", insertSampleProducts);

module.exports = router;
