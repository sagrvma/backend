const express = require("express");

const app = express();

//Middleware in expressJS are special functions that sit between the incoming HTTP request and the outgoing response.
//They can be thought of as interceptors that can examine, modify or control the flow of data throughout my application.
const myFirstMiddleware = (req, res, next) => {
  console.log("This first middleware will run on every request");
  next(); //Passes control to the next middleware/route handler
  //If we don't call next() here, the request will get stuck in the middleware and not reach our subsequent middleware or routes.
  //Then the request will eventually timeout.
};

app.use(myFirstMiddleware); //app.use() without a path means this middleware runs for every request to every route.

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is now running on port ${port}`);
});

/* 
1. Key Concepts
2. Middleware executes in order - First defined, first executed
3. Always call next() unless you're ending the response, for eg in redirects, errors, or when sending an early response
4. app.use() applies to all routes below it
5. Middleware can modify req and res objects
6. Great for cross-cutting concerns like logging, authentication, etc.
*/
