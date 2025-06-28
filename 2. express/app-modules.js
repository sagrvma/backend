const express = require("express");

const app = express();

//Application level settings
app.set("view engine", "ejs");
//Configures EJS(Embedded Javascript) as my template engine.
//Means we can render dynamic HTML pages instead of just sending static responses.

//Routing
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/api/data", (req, res) => {
  res.json({
    message: "Data recieved",
    data: req.body,
  });
});

//Error handling middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something went wrong");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is now running at ${port}`);
});
