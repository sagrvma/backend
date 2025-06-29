const express = require("express");

const app = express(); //Creates the express application instance

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world using Express JS!");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

/* 
RAW NODEJS EQUIVALENT OF THE ABOVE

const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Hello world using Express JS!");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running at port 3000");
});

*/
