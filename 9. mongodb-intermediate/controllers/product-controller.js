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

    return res.status(200).json({
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
      //Filtering
      {
        $match: {
          inStock: true,
          price: {
            $gte: 100,
          },
        },
      },
      //Grouping
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
      //Sorting
      {
        $sort: { avgPrice: -1 },
        //Field references in expressions (always need $)
        //Field names in stage specifications (never have $)
      },
    ]);

    if (results.length == 0) {
      return res.status(400).json({
        success: false,
        message: "No products found with the applied filters!",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Stats of products grouped by category where price >= 100 and inStock=true`,
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

/*
MongoDB Aggregation Framework
A powerful data processing pipeline that allows us to perform complex data transformations, filtering, grouping and calculations directly in the database. Can be thought of as SQL's GROUPBY and WHERE clause combined with much more flexibility.

Q. What is aggregation?
Ans. Aggregation processes data records and returns computed results.Instead of returning raw documents, we can:
- Filter documents based on conditions
- Group documents by specific fields
- Calculate sums, averages, counts and other statistics
- Transform document structure
- Sort and limit results
---------
Pipeline: Aggregation works as a pipeline - data flows through multiple stages, with each stage transforming data before passing it onto the next stage.

db.collection.aggregate([
  { stage1 },  // Input: Original documents
  { stage2 },  // Input: Output from stage1
  { stage3 },  // Input: Output from stage2
  // ... more stages
]);
---------
Stages:
=>Filtering Stages
  1. $match - Document filtering
    - Basic filtering
      {$match: {category : "Electronics"}}
    - Multiple conditions (AND)
      {$match: {category: "Electronics", price: {$lt: 500}}}
    - OR conditions
      {$match: {$or: [{category: "Electronics"}, {category: "Footwear"}]}}
    - Complex conditions
      {
        $match: {
            price: {$gte: 500, $lte: 1000},
            inStock: true,
            category: {$in: ["Electronics", "Footwear"]}
        }
      }

  2. $limit and $skip - Result limiting, can be used for pageination
    {$skip : (page-1)*limit},
    {$limit: limit}
    Always place skip before limit as it might return no results if skip>=limit***

==> Grouping Stages
  1. $group - Group documents
    {
      $group: {
          _id: "$category", //Group by single field
          _id: {category: "$category". brand: "$brand"}, //Group by multiple fields
          _id: null, //Group all documents together


          //Accumulator Operators
          totalProducts: {$sum: 1}, //Count total number of documents
          totalValue: {$sum: "$price"}, //Count sum
          avgPrice: {$avg: "$price"}, //Average
          maxPrice: {$max: "$price"}, //Maximum,
          minPrice: {$min: $price}, //Minimum,
          firstValue: {$first: "$name"}, //First document in group
          lastValue: {$last: "$name"}, //Last document in group
          allTags: {$push: "$tags"}, //Array of all values
          uniqueTags: {$addToSet: "$tags"} //Array of unique values
      }
    }
==>Sorting and Organization
  1. $sort - Sort documents
    {$sort: {avgPrice: 1}} //Ascending(1)
    {$sort: {avgPrice: -1}} //Descending(-1)
    {$sort: {category: 1, price: -1}} //Multiple fields

  2. $unwind - Deconstruct Arrays
  {$unwind: "$tags"}
  //Consider the original: {name: "Product", tags: ["tag1", "tag2"]}
  //Result:
  //{name: "Product", tags: "tag1"},
  //{name: "Product", tags: "tag2"}

==>Data Transformation
  1. $project - Select and transform fields
    {
      $project: {
        name: 1, //Include field(1)
        category: 1,
        price: 1,
        _id: 0, //Exclude field(0)
        discountedPrice: {$multiply: ["$price", 0.9]}, //Calculated field
        isExpensice: {$gt : ["$price", 500]}, //Boolean field
        summary: {$concat: ["$name", " - ", "$category"]} //String Concatenation
      }
    }

  2. addFields - Add new fields,
    {
      $addFields: {
        totalValue: {$multiply: ["$price", "$quantity"]},
        priceCategory: {
          $switch: {
            $branches: [
              {case: {$lt: ["$price", 100]}, then: "Budget" },
              {case: {$lt: ["$price", 500]}, then: "Mid-Range"},
              {case: {$gte: ["price", 500]}, then: "Premium"}
            ]
          }
        }
      }
    }
    //Difference between $products and $addFields: $addfields will keep all existing fields intact and just add the new fields to the document structure, whereas $project will change the document structure to only whatever is defined inside it.
---------------
Common Aggregation Operators
1. Comparison Operators: 
    {$eq: ["$price", 100]} //Equals
    {$ne: ["$price", 100]} //Not Equals
    {$gt: ["$price", 100]} //Greater than
    {$gte: ["$price", 100]} //Greater than equals
    {$lt: ["$price", 100]} //Lesser than
    {$lte: ["$price", 100]} //Lesse than equals
    {$in: ["$category", ["Electronics", "Footwear"]]} //In, similar to $or but better performance wise

2. Arithmetic Operators:
    {$add: ["$price", "%tax"]} //Addition
    {$discount: ["$price", "$discount"]} //Subtraction
    {$multiply: ["$price", 1.1]} //Multiplication
    {$divide: ["$total", "$quantity"]} // Division
    {$mod: ["quantity", 10]} // Modulo

3. String Operators:
    {$concat: ["$name", " - ", "$brand"]} //Concatenation
    {$substr: [$substr: ["$name", 0, 3]]} //First 3 characters
    {$toUpper: "$name"} //Uppercase
    {$toLower: "$name"} //Lowercase

4. Date Operators:
    {$year: "$createdDate"}
    {$month: "$createdDate"}
    {$dayOfWeek: "$createdDate"}
    {
      $dateToString: {
        format: "%Y-%m-%d",
        date: "$createdDate"
      }
    }
-----------------
*/
