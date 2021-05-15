const express = require('express');
const app = express();
app.use(express.static(__dirname + '/html'));
const http = require('http').createServer(app);
const io = require('socket.io')(http);



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html');
});

io.on('connection', (socket) => {
  console.log('user connected');
  var timeouts = [];

  socket.on('message-send', (message) => {
    console.log('message-send: ' + message);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});