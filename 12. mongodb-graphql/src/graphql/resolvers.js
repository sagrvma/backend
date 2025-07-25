const products = require("../data/products");

const resolvers = {
  Query: {
    products: () => products,
    product: (_, { id }) => {
      return products.find((item) => parseInt(item.id) === parseInt(id));
    },
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

    deleteProduct: (_, { id }) => {
      const index = products.findIndex(
        (item) => parseInt(item.id) === parseInt(id)
      );
      if (index === -1) {
        return false;
      }
      products.splice(index, 1);
      return true;
    },

    updateProduct: (_, { id, ...updates }) => {
      const index = products.findIndex(
        (item) => parseInt(item.id) === parseInt(id)
      );
      if (index === -1) {
        return null;
      }
      const updatedProduct = {
        ...products[index],
        ...updates,
      };

      products[index] = updatedProduct;
      return updatedProduct;
    },
  },
};

module.exports = resolvers;
