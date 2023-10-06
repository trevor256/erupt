const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let players = [];

io.on('connection', (socket) => {
  console.log(`A user connected with ID: ${socket.id}`);
  players.push({ x: 200, y: 200 });

  io.emit('players', players);

  socket.on('position', (position) => {
    console.log(`Received position update from ${socket.id}:`, position);
    players[players.length - 1] = position; // NOTE: This logic is simplistic and for example purposes only. 
    io.emit('players', players);
  });

  socket.on('disconnect', () => {
    console.log(`User with ID ${socket.id} disconnected`);
    players.pop(); // NOTE: This logic is simplistic and for example purposes only. 
    io.emit('players', players);
  });
});

server.listen(3001, () => {
  console.log('Server is listening on *:3001');
});
