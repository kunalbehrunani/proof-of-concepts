// Install the socket.io-client package:
// npm install socket.io-client

const io = require('socket.io-client');

// Connect to the Socket.IO server
const socket = io.connect('http://localhost:3000');
// Replace with your server URL

// Event handlers
socket.on('connect', () => {
  console.log('Connected to the server');
});

socket.on('message', (data) => {
  console.log('Received message:', data);
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});

socket.on('error', (err) => {
    console.log(err);
})

// Send a message to the server
socket.emit('message', 'Hello, server!');
