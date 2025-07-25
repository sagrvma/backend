const Product = require("../models/Product");

const resolvers = {
  Query: {
    products: async () => {
      return await Product.find({});
    },
    product: async (_, { id }) => {
      return await Product.findById(id);
    },
  },
  Mutation: {
    createProduct: async (_, args) => {
      const newProduct = new Product(args);
      return await newProduct.save();
    },

    updateProduct: async (_, { id, ...updatedFields }) => {
      return await Product.findByIdAndUpdate(id, updatedFields, { new: true });
    },

    deleteProduct: async (_, { id }) => {
      const deletedProduct = await Product.findByIdAndDelete(id);
      return !!deletedProduct;
    },
  },
};

module.exports = resolvers;
