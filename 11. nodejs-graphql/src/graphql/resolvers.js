const products = require("../data/products");

const resolvers = {
  Query: {
    products: () => products,
    product: (_, { id }) =>
      products.find((item) => parseInt(item.id) === parseInt(id)),
  },
  Mutation: {
    createProduct: (_, { title, category, price, inStock }) => {
      const newProduct = {
        id: products.length + 1,
        title,
        category,
        price,
        inStock,
      };
      products.push(newProduct);
      return newProduct;
    },
  },
};

module.exports = resolvers;
