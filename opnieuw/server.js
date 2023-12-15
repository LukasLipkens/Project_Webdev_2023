const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

// Keep track of all connected clients
const clients = new Set();

server.on('connection', ws => {
  // Add new clients to the set
  clients.add(ws);

  ws.on('message', message => {
    // Broadcast the message to all clients
    for (const client of clients) {
      // Check if the client is open before sending the message
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  ws.on('close', () => {
    // Remove closed clients from the set
    clients.delete(ws);
  });
});

console.log('Server started at ws://localhost:8080');