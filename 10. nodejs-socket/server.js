const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
/*
Socket.IO : Enables real time, event driven, bi-directional communication between the client and server.
1. Real-time: Instant data exchange without page refreshes.
2. Bi-directional: Both client and server can initiate communication.
3. Event Driven: Uses custom events for communication.
4. Fallback Support: Works even when WebSockets aren't available. 
*/

const app = express(); // Express initializes app to be a function handler that we can supply to a HTTP server.

const server = http.createServer(app); //HTTP server wrapping Express

//Initiate socket.io and attach this to the http server
const io = socketIO(server); //socket.io attached to the http server

app.use(express.static("public")); //Serve static files from the "public folder"

/*What is this architecture?
Express App -> HTTP Server -> Socket.IO
1.Express (app) - Handles all the http requests (REST apis, static files).
2. HTTP Server (server) - Provides the foundation for both HTTP and WebSocket protocols
3. Socket.IO (io) - Adds real time bi-directional communication on top of HTTP server
*/

const users = new Set();

io.on("connection", (socket) => {
  console.log("A user is now connected.");

  //Handle when a user joins the chat
  socket.on("join", (userName) => {
    users.add(userName);
    socket.userName = userName;

    //Broadcast to all clients/users that a new user has joined
    io.emit("userJoined", userName);

    //Send the updated list to all the clients
    io.emit("usersList", Array.from(users));
  });

  //Handle incoming chat messages
  socket.on("chatMessage", (message) => {
    //Broadcast the recieved message to all connected users/clients

    io.emit("chatMessage", message);
  });
  //Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user is disconnected.");

    users.forEach((user) => {
      if (user === socket.userName) {
        users.delete(user);

        io.emit("userLeft", user);
        io.emit("usersList", Array.from(users));
      }
    });
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(
    `Server is now running successfully on  http://localhost:${PORT}`
  );
});
