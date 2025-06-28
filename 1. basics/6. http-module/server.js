const http = require("http");

const server = http.createServer((req, res) => {
  //this callback runs for every incoming HTTP request i.e everytime someone makes a request to my server.
  console.log("req", req);
  //Request Object (req):
  //Contains all the information about the incoming HTTP request.
  //Includes URLs, headers, HTTP method (GET, POST etc.), query paramters and more.
  //Warning: Logging the entire req object gives a massive output!

  //Response Object (res):
  //MY tool for sending data back to the client.
  //Used to set headers, status codes and response body.
  res.writeHead(200, { "Content-Type": "text/plain" });
  //writeHead sets the status code and the headers for the HTTP response.
  //Must be called before sending any response body with res.write() or res.end().

  res.end("Hello node js from http module!");
  //sends the response body and closes the connection.
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is litening on port ${port}`);
});
//Makes our HTTP server start listening for incoming connections on the specified port.
//Transforms our server from just existing in memory to actually be able to recieve and handle HTTP requests from clients.
