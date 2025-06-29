//Creating an ExpressJS application with EJS Templating for server-side rendering.
//Allows us to create dynamic HTML pages by passing data from our server to our templates.

const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
//Sets ejs as the template engine, allows rendering of .ejs files
//View Engine:
//A view engine is a template processing system that enables us to:
//1. Generate dynamic HMTL from templates
//2. Embed data from our server into HTML pages
//3. Create reusable template files instead of writing static HTML
//4. Seperate logic from presentation(server logic vs HTML structure)

//A view engine can be thought of as a "HTML generator", that takes template files(with placeholders for data),
// data from our server and combines them to produce the final HTML, sent to the browser.

app.set("views", path.join(__dirname, "templates"));
//Sets views directory, the templates will be stored in /.views/ folder

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
  res.render("home", { title: "Home", products: products });
  //Passes title and products to the template
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
  //Passes title to the template
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is now running at port ${port}`);
});
