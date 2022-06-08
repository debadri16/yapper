const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const { addUser, removeUser, getAllUsers } = require('./rooms');

// check for auth
io.use((socket, next) => {
  // get the token from client
  const token = socket.handshake.auth.token;

  if (token === 'j6k^j,.4m5') {
    next();
  } else {
    next(new Error("Unauthorized"));
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("login", user => {
    addUser(socket.id, user)
    console.log(getAllUsers());
  });

  // disconnect event listener
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // input event listener
  socket.on('chat message', (msg) => {
    console.log(msg)
  })
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});