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
const { addUser, removeUser, getUsers, disconnectUser, banUser, getUserDetail } = require('./rooms');

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

  // for explicit leaving
  socket.on("leave room", room => {
    removeUser(room, socket.id);
    socket.leave(room);

    // inform everyone else
    socket.in(room).emit('user left', socket.id);
    console.log('user left');
  });

  // getting kicked
  socket.on("kick user", (room, userId) => {
    removeUser(room, userId);
    // need to test this line
    socket.id = userId;
    socket.leave(room);

    // inform everyone else
    socket.in(room).emit('user kicked', getUserDetail(room, socket.id));
  });

  // getting banned
  socket.on("ban user", (room, userId) => {
    banUser(room, userId);
    // need to test this line
    socket.id = userId;
    socket.leave(room);

    // inform everyone else
    socket.in(room).emit('user banned', getUserDetail(room, socket.id));
  });

  // disconnect event listener
  // socket room will be automatically be left when this event is emitted
  socket.on('disconnect', () => {
    // just clearing custom objects
    let room = disconnectUser(socket.id);

    // inform everyone else
    if (room !== null) {
      socket.in(room).emit('user left', socket.id);
    }

    console.log('user disconnected');
  });

});

server.listen(5000, () => {
  console.log('listening on *:5000');
});