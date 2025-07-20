const Products = require("../models/products");

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Products.find({});

    if (allProducts.length == 0) {
      return res.status(400).json({
        success: false,
        message: "No products found!",
      });
    }

    return res.status(201).json({
      status: true,
      message: `Found ${allProducts.length} products.`,
      products: allProducts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: true,
      message: "Something went wrong! Please try again",
    });
  }
};

const getFilteredProductsStats = async (req, res) => {
  try {
    const results = await Products.aggregate([
      {
        $match: {
          inStock: true,
          price: {
            $gte: 100,
          },
        },
      },
      {
        $group: {
          _id: "$category",
          avgPrice: {
            $avg: "$price",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    if (results.length == 0) {
      return res.status(400).json({
        success: false,
        message: "No products found with the applied filters!",
      });
    }

    return res.status(201).json({
      success: true,
      message: `Stats of products grouped by category where price > 100 and inStock=true`,
      filteredProducts: results,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

const insertSampleProducts = async (req, res) => {
  try {
    const sampleProducts = req.body;

    const results = await Products.insertMany(sampleProducts);

    return res.status(201).json({
      success: true,
      message: `Inserted ${results.length} products successfully.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

module.exports = {
  getAllProducts,
  getFilteredProductsStats,
  insertSampleProducts,
};
