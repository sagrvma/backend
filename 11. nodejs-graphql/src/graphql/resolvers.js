const products = require("../data/products");

const resolvers = {
  Query: {
    products: () => products,
    product: (_, { id }) =>
      products.find((item) => parseInt(item.id) === parseInt(id)),
  },
};

module.exports = resolvers;
