import express from 'express';
import LLMChat from './Ai.js';
import { addUser, removeUser, getUsers, disconnectUser, banUser, getUserDetail } from './rooms.js';
import { createServer } from 'http';
import { Server } from "socket.io";

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// LLMChat().then();

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

    // send newly joined user's details to everyone else
    socket.in(user.room).emit('new user', {...user, userId: socket.id});

    // send users data of that room to everyone in the room
    // io.in(user.room).emit('users', getUsers(user.room))
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

   // sending message
   socket.on("send text", (room, txt) => {
    console.log("msg received from room: " + room + " by: " + socket.id + " msg: " + txt);
    // send to everyone else
    socket.in(room).emit('receive text', {...getUserDetail(room, socket.id), txt});
  });

  // disconnect event listener
  // socket room will be automatically be left when this event is emitted
  socket.on('disconnect', () => {
    // just clearing custom objects
    let userDetails = disconnectUser(socket.id);

    // inform everyone else
    if (userDetails !== null) {
      socket.in(userDetails.room).emit('user left', userDetails);
    }

    console.log('user disconnected');
  });

});

server.listen(5000, () => {
  console.log('listening on *:5000');
});
