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
const { addUser, removeUser, getUsers } = require('./rooms');

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

  // will work for create and join
  socket.on("enter room", user => {
    addUser(socket.id, user)

    // joining in the room
    socket.join(user.room);

    // send users data of that room to everyone in the room
    io.in(user.room).emit('users', getUsers(user.room))
  });

  // disconnect event listener
  socket.on('disconnect', () => {
    console.log('user disconnected');
    
    // to leave from a room
    // socket.leave(<room id>)
    // remove the user from the room it is in
    // hint: you might have to modify rooms.js

  });

});

server.listen(5000, () => {
  console.log('listening on *:5000');
});