
var path = require('path');
var express = require('express');
var app = express();
var router = express.Router();
var phpExpress = require('php-express')({
    binPath: 'php'
});
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.use('/', express.static(__dirname));

app.set('views', path.join(__dirname, '/src'));
app.engine('php', phpExpress.engine);
app.set('view engine', 'php');

app.all(/.+\.php$/, phpExpress.router);

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

function getAllUsers(callback) {
  // var result;
  var sql = 'SELECT USERS.UserId, USERS.Username, USERS.Password, PERMISSIONS.Groupname FROM USERS,PERMISSIONS WHERE USERS.PermissionId = PERMISSIONS.PermissionId';
  dbConnection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    console.log(rows[0].Username);
    callback(rows);
  });
}
function getProduct(productId,callback){
  var sql = 'SELECT * FROM PRODUCTS WHERE ProductId = '+productId;
  dbConnection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    callback(rows);
  });
}
function getAllProducts(callback){
  var sql = 'SELECT PRODUCTS.ProductId, PRODUCTS.Name, PRODUCTS.Description, PRODUCTS.InStorage, PRODUCTS.Price, PRODUCTS.Rating, PRODUCERS.ProducerName FROM PRODUCTS, PRODUCERS WHERE PRODUCTS.ProducerId = PRODUCERS.ProducerId ORDER BY Name ';    
  dbConnection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    callback(rows);
  });
}

function getAllPermissions(callback) {
  dbConnection.query('SELECT * FROM PERMISSIONS', function (err, rows, fields) {
    if (err) throw err;
    callback(rows);
  });
}
function getAllPurchasesOfUser(userId,callback){
  var sql = 'SELECT PRODUCTS.Name, PRODUCERS.ProducerName, USERS.Username, PURCHASES.Amount, PURCHASES.totalPrice, PURCHASES.Timestamp FROM PURCHASES, PRODUCTS, PRODUCERS, USERS WHERE PURCHASES.UserId = '+userId+' AND PURCHASES.ProductId = PRODUCTS.ProductId AND PRODUCTS.ProducerId = PRODUCERS.ProducerId AND PURCHASES.UserId = USERS.UserId'; 
  dbConnection.query(sql , function (err, rows, fields) {
    if (err) throw err;
    console.log(rows[1].ProducerName);
    callback(rows);
  });
}
// getAllUsers();
// getAllPurchasesOfUser(1);


function addUser(user,callback){
  dbConnection.query('INSERT INTO USERS(Username,Password,PermissionId) VALUES (?,?,?)',[user.Username,user.Password,user.PermissionId], function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}
function addPurchase(purchase,callback){
  dbConnection.query('INSERT INTO PURCHASES(ProductId,UserId,Amount,totalPrice) VALUES (?,?,?,?)',[purchase.ProductId,purchase.UserId,purchase.Amount,purchase.totalPrice], function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}
function addProduct(product,callback){
  dbConnection.query('INSERT INTO PRODUCTS(Name,ProducerId,InStorage,Price,Description,Rating) VALUES (?,?,?,?)',[product.Name,product.ProducerId,product.InStorage,product.Price], function (err, rows, fields) {
    if (err) throw err;
    
    callback('success');
  });
}
function addProducer(producer,callback){
  dbConnection.query('INSERT INTO PRODUCER(ProducerName) VALUES (?)',[producer.ProducerName], function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}

function deleteUser(userId,callback){
  dbConnection.query('DELETE FROM USERS WHERE UserId = '+userId, function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}
function deletePurchase(purchaseId,callback){
  dbConnection.query('DELETE FROM PURCHASES WHERE PurchaseId = ' + purchaseId, function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}
function deleteProduct(productId,callback){
  dbConnection.query('DELETE FROM PRODUCTS WHERE ProductId = ' + productId, function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}
function deleteProducer(producerId,callback){
  dbConnection.query('DELETE FROM PRODUCERS WHERE ProducerId = ' + producerId, function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}

function editUser(user,callback){
  dbConnection.query("UPDATE USERS SET Username ='"+user.Username+", Password = "+user.Password+", PermissionId =" +user.PermissionId+ "' WHERE UserId = " + user.UserId, function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });  
}
function editPurchase(purchase,callback){
  dbConnection.query("UPDATE PURCHASES SET ProductId ='"+purchase.ProductId+", UserId = "+purchase.UserId+", Amount =" +purchase.Amount+ ", totalPrice = "+purchase.totalPrice+"' WHERE PurchaseId = " + purchase.purchaseId, function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });  
}
function editProduct(product,callback){
  dbConnection.query("UPDATE PRODUCTS SET Name ='"+product.Name+", Description = "+product.Description+", ProducerId =" +product.ProducerId+ ", InStorage = "+product.InStorage+", Price = "+product.Price+", Rating = "+product.Rating+"' WHERE ProductId = " + product.ProductId, function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });  
}
function editProducer(producer,callback){
  dbConnection.query("UPDATE PRODUCERS SET ProducerName ='"+producer.ProducerName+"' WHERE ProducerId = " + producer.ProducerId, function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });  
}

function connectionCheck(){
  getAllPermissions(function(result){
    console.log("db connection stable");
  });
}
setInterval(connectionCheck,60000,'connection');

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

  socket.on('getAllUsersForLogin', (message) => {
    console.log('get All Users');
    getAllUsers(function(result){
      socket.emit("giveAllUsersForLogin",result);
    });   
  });

  socket.on('getAllUsersForRegistration', (message) => {
    console.log('get All Users');
    getAllUsers(function(result){
      socket.emit("giveAllUsersForRegistration",result);
    });   
  });

  socket.on('addUser', (user) => {
    console.log(user);
    addUser(user);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});