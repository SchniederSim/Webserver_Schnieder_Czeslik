const express = require('express');
const app = express();
app.use(express.static(__dirname + '/src'));
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

function login(username,password){
  var user = undefined;
  var sql = 'SELECT * FROM USERS WHERE Username = '+username+' AND Password = '+password;
  dbConnection.query(sql, function(err, rows, fields){
    if(err) throw err;
    if(rows){
      user = rows[0];
    }
  });
  return user;
}

function getAllUsers() {
  var result;
  var sql = 'SELECT USERS.UserId, USERS.Username, USERS.Password, PERMISSIONS.Groupname FROM USERS,PERMISSIONS WHERE USERS.PermissionId = PERMISSIONS.PermissionId';
  dbConnection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    console.log(rows[0].Username);
    result = rows;
  });
  return result;
}
function getProduct(productId){
  var result;
  var sql = 'SELECT * FROM PRODUCTS WHERE ProductId = '+productId;
  dbConnection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    result = rows[0];
  });
  return result;
}
function getAllProducts(callback){
  var sql = 'SELECT PRODUCTS.ProductId, PRODUCTS.Name, PRODUCTS.Description, PRODUCTS.InStorage, PRODUCTS.Price, PRODUCTS.Rating, PRODUCERS.ProducerName FROM PRODUCTS, PRODUCERS WHERE PRODUCTS.ProducerId = PRODUCERS.ProducerId ORDER BY Name ';    
  dbConnection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    console.log(rows[0].ProducerName);
    callback(rows);
  });
}

function getAllPermissions() {
  var result;
  dbConnection.query('SELECT * FROM PERMISSIONS', function (err, rows, fields) {
    if (err) throw err;
    result = rows;
  });
  return result;
}
function getAllPurchasesOfUser(userId){
  var result;
  var sql = 'SELECT PRODUCTS.Name, PRODUCERS.ProducerName, USERS.Username, PURCHASES.Amount, PURCHASES.totalPrice, PURCHASES.Timestamp FROM PURCHASES, PRODUCTS, PRODUCERS, USERS WHERE PURCHASES.UserId = '+userId+' AND PURCHASES.ProductId = PRODUCTS.ProductId AND PRODUCTS.ProducerId = PRODUCERS.ProducerId AND PURCHASES.UserId = USERS.UserId'; 
  dbConnection.query(sql , function (err, rows, fields) {
    if (err) throw err;
    console.log(rows[1].ProducerName);
    result = rows;
  });
  return result;
}
getAllUsers();
getAllPurchasesOfUser(1);

function addUser(user){
  dbConnection.query('INSERT INTO USERS(Username,Password,PermissionId) VALUES (?,?,?)',[user.Username,user.Password,user.PermissionId], function (err, rows, fields) {
    if (err) throw err;

  });
}
function addPurchase(purchase){
  dbConnection.query('INSERT INTO PURCHASES(ProductId,UserId,Amount,totalPrice) VALUES (?,?,?,?)',[purchase.ProductId,purchase.UserId,purchase.Amount,purchase.totalPrice], function (err, rows, fields) {
    if (err) throw err;

  });
}
function addProduct(product){
  dbConnection.query('INSERT INTO PRODUCTS(Name,ProducerId,InStorage,Price,Description,Rating) VALUES (?,?,?,?)',[product.Name,product.ProducerId,product.InStorage,product.Price], function (err, rows, fields) {
    if (err) throw err;

  });
}
function addProducer(producer){
  dbConnection.query('INSERT INTO PRODUCER(ProducerName) VALUES (?)',[producer.ProducerName], function (err, rows, fields) {
    if (err) throw err;

  });
}

function deleteUser(userId){
  dbConnection.query('DELETE FROM USERS WHERE UserId = '+userId, function (err, rows, fields) {
    if (err) throw err;

  });
}
function deletePurchase(purchaseId){
  dbConnection.query('DELETE FROM PURCHASES WHERE PurchaseId = ' + purchaseId, function (err, rows, fields) {
    if (err) throw err;

  });
}
function deleteProduct(productId){
  dbConnection.query('DELETE FROM PRODUCTS WHERE ProductId = ' + productId, function (err, rows, fields) {
    if (err) throw err;

  });
}
function deleteProducer(producerId){
  dbConnection.query('DELETE FROM PRODUCERS WHERE ProducerId = ' + producerId, function (err, rows, fields) {
    if (err) throw err;

  });
}

function editUser(user){
  // dbConnection.query('UPDATE USERS SET WHERE ProducerId = ' + producerId, function (err, rows, fields) {
  //   if (err) throw err;

  // });  
}
function editPurchase(purchase){}
function editProduct(product){}
function editProducer(producer){}

setInterval(getAllUsers,60000,'connection');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('getAllProducts', (message) => {
    console.log('get All Products');
    getAllProducts(function(result){
      socket.emit("giveAllProducts",result);
    });   
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});