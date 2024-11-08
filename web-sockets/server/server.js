const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  // options
});

io.on("connection", (socket) => {
    console.log('new connection established => socket details: ');
    // console.log(socket);
});

io.on("newNamespace", (namespace) => {
    console.log('new connection established (in new_namespace) => socket details: ');
    // console.log(socket);
});

io.on('message', (data) => {
    console.log('Received message:', data);
  });

httpServer.listen(3000);