const Products = require("../models/products");

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

module.exports = { insertSampleProducts };
