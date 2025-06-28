const express = require("express");

const app = express();

const products = [
  {
    id: 1,
    label: "Product 1",
  },
  {
    id: 2,
    label: "Product 2",
  },
  {
    id: 3,
    label: "Product 3",
  },
];

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/products", (req, res) => {
  res.json(products);
});

//Get dynamic data
app.get("/products/:id", (req, res) => {
  console.log(req.params);
  const productId = parseInt(req.params.id);

  const resultProduct = products.find((product) => product.id === productId);

  if (resultProduct) {
    res.json(resultProduct);
  } else {
    res.status(404).send("Product not found!");
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is now running at port ${port}`);
});
