const express = require('express');
const app = express();
app.use(express.static(__dirname + '/html'));
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var mysql = require('mysql');
var dbConnection = mysql.createConnection({
  host: 'remotemysql.com',
  port: '3306',
  user: 'YEfPnCDIbs',
  password: 'U1j9QBQ531',
  database: 'YEfPnCDIbs'
});
var hasDBConntection = false;

dbConnection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  hasDBConntection = true;
});

function getAllUsers() {
  var result;
  dbConnection.query('SELECT * FROM USERS', function (err, rows, fields) {
    if (err) throw err;
    console.log(rows[0].Username);
    result = rows;
  });
  
  return result;
}
function getAllProducts(){
  var result;
  dbConnection.query(
    'SELECT PRODUCTS.Name, PRODUCTS.InStorage, PRODUCTS.Price, PRODUCERS.ProducerName FROM PRODUCTS, PRODUCERS WHERE PRODUCTS.ProducerId = PRODUCERS.ProducerId ORDER BY Name ', function (err, rows, fields) {
    if (err) throw err;
    console.log(rows[0].ProducerName);
    result = rows;
  });
  
  return result;
}

function getAllPurchasesOfUser(userId){
  var result;
  dbConnection.query('SELECT PRODUCTS.Name, PRODUCERS.ProducerName, USERS.Username, PURCHASES.Amount, PURCHASES.totalPrice, PURCHASES.Timestamp FROM PURCHASES, PRODUCTS, PRODUCERS, USERS WHERE PURCHASES.UserId = '+userId+' AND PURCHASES.ProductId = PRODUCTS.ProductId AND PRODUCTS.ProducerId = PRODUCERS.ProducerId AND PURCHASES.UserId = USERS.UserId' , function (err, rows, fields) {
    if (err) throw err;
    console.log(rows[1].ProducerName);
    result = rows;
  });

  return result;
}
getAllUsers();
getAllProducts();
getAllPurchasesOfUser(1);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html');
});

io.on('connection', (socket) => {
  console.log('user connected');

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