const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // disconnect event listener
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // input event listener
  socket.on('chat message',(msg) => {
    console.log(msg)
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});