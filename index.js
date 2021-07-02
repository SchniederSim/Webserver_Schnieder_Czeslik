
var path = require('path');
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/src/css'));
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
const url = require('url'); 
var pId = undefined;
const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/imgs')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        // or 
        // uuid, or fieldname
        cb(null, pId+".jpg");
    }
})
const upload = multer({ storage }); // or simply { dest: 'uploads/' }
app.use(express.static('public'))

app.post('/upload', upload.array('avatar'), (req, res) => {
  //return res.sendFile(__dirname + '/src/product-list.php');
    // res.json({ status: 'OK', uploaded: req.files.length });
    res.redirect(url.format({
      pathname:'product-detail.php',
      query: {
        "pid": pId,
        "mode": 2
      }
    }));
    //(__dirname + '/src/product-detail.php'+'?pid='+pId+'&mode=2');
});
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

function login(username, password) {
  var user = undefined;
  var sql = 'SELECT * FROM USERS WHERE Username = ' + username + ' AND Password = ' + password;
  dbConnection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    if (rows) {
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

function getUserId(username, callback) {
  var sql = 'SELECT USERS.UserId FROM USERS WHERE Username = ' + "'" + username + "'";
  dbConnection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    callback(rows[0].UserId);
  });
}

function getProduct(productId, callback) {
  var sql = 'SELECT PRODUCTS.ProductId, PRODUCTS.Name, PRODUCTS.Description, PRODUCTS.InStorage, PRODUCTS.Price, PRODUCTS.Rating, PRODUCTS.ProducerId, PRODUCERS.ProducerName FROM PRODUCTS, PRODUCERS WHERE PRODUCTS.ProducerId = PRODUCERS.ProducerId AND ProductId = ' + productId;
  dbConnection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    callback(rows);
  });
}
function getAllProducers(callback) {
  var sql = 'SELECT * FROM PRODUCERS';
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
function getAllPurchasesOfUser(userId, callback) {
  var sql = 'SELECT PRODUCTS.Name, PRODUCERS.ProducerName, USERS.Username, PURCHASES.Amount, PURCHASES.totalPrice, PURCHASES.Timestamp FROM PURCHASES, PRODUCTS, PRODUCERS, USERS WHERE PURCHASES.UserId = ' + userId + ' AND PURCHASES.ProductId = PRODUCTS.ProductId AND PRODUCTS.ProducerId = PRODUCERS.ProducerId AND PURCHASES.UserId = USERS.UserId';
  dbConnection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    callback(rows);
  });
}

function getAllPurchases(callback){
  dbConnection.query('SELECT * FROM PURCHASES' , function (err, rows, fields) {
    if (err) throw err;
    callback(rows);
  });
}

function getAllProducers(callback){
  dbConnection.query('SELECT * FROM PRODUCERS' , function (err, rows, fields) {
    if (err) throw err;
    console.log(rows[1].ProducerName);
    callback(rows);
  });
}


// getAllUsers();
// getAllPurchasesOfUser(1);


function addUser(user, callback) {
  dbConnection.query('INSERT INTO USERS(Username,Password,PermissionId) VALUES (?,?,?)', [user.Username, user.Password, user.PermissionId], function (err, rows, fields) {
    if (err) throw err;
    console.log(rows.insertId);
    callback('success');
  });
}
function addPurchase(purchase, callback) {
  dbConnection.query('INSERT INTO PURCHASES(ProductId,UserId,Amount,totalPrice) VALUES (?,?,?,?)', [purchase.ProductId, purchase.UserId, purchase.Amount, purchase.totalPrice], function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}
function addProduct(product, callback) {
  dbConnection.query('INSERT INTO PRODUCTS(Name,ProducerId,InStorage,Price,Description) VALUES (?,?,?,?,?)', [product.Name, product.ProducerId, product.InStorage, product.Price,product.Description], function (err, rows, fields) {
    if (err) throw err;
    callback({code:'success',pId:rows.insertId});
  });
}
function addProducer(producer, callback) {
  dbConnection.query('INSERT INTO PRODUCER(ProducerName) VALUES (?)', [producer.ProducerName], function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}

function deleteUser(userId, callback) {
  dbConnection.query('DELETE FROM USERS WHERE UserId = ' + userId, function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}

function deleteUserByUsername(username, callback) {
  dbConnection.query('DELETE FROM USERS WHERE Username = ' + "'" + username + "'", function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}

function deletePurchase(purchaseId, callback) {
  dbConnection.query('DELETE FROM PURCHASES WHERE PurchaseId = ' + purchaseId, function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}
function deleteProduct(productId, callback) {
  dbConnection.query('DELETE FROM PRODUCTS WHERE ProductId = ' + productId, function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}
function deleteProducer(producerId, callback) {
  dbConnection.query('DELETE FROM PRODUCERS WHERE ProducerId = ' + producerId, function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}

function editUser(user, callback) {
  dbConnection.query("UPDATE USERS SET Username =" + user.Username + ", Password = " + user.Password + ", PermissionId =" + user.PermissionId + " WHERE UserId = " + user.UserId, function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}

function editUserRole(username, permissionId, callback) {
  dbConnection.query("UPDATE USERS SET PermissionId = " + permissionId + " WHERE Username = " + "'" + username + "'", function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}

function editPurchase(purchase, callback) {
  dbConnection.query("UPDATE PURCHASES SET ProductId =" + purchase.ProductId + ", UserId = " + purchase.UserId + ", Amount =" + purchase.Amount + ", totalPrice = " + purchase.totalPrice + " WHERE PurchaseId = " + purchase.purchaseId, function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}
function editProduct(product, callback) {
  dbConnection.query("UPDATE PRODUCTS SET Name ='" + product.Name + "', Description = '" + product.Description + "', ProducerId ='" + product.ProducerId + "', InStorage = '" + product.InStorage + "', Price = '" + product.Price + "' WHERE ProductId = " + product.ProductId, function (err, rows, fields) {
    if (err) throw err;
    callback({code: 'success',pId: product.ProductId});
  });
}
function editProducer(producer, callback) {
  dbConnection.query("UPDATE PRODUCERS SET ProducerName =" + producer.ProducerName + " WHERE ProducerId = " + producer.ProducerId, function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}

function connectionCheck() {
  getAllPermissions(function (result) {
    console.log("db connection stable");
  });
}
setInterval(connectionCheck, 60000, 'connection');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('image', (img) =>{
    console.log("image");
    console.log(img.name);
  })
  socket.on('getAllProducts', (message) => {
    console.log('get All Products');
    getAllProducts(function (result) {
      socket.emit("giveAllProducts", result);
    });
  });

  socket.on('getUserId', (username) => {
    console.log('get user ID');
    getUserId(username, function (result) {
      socket.emit("giveUserId", result);
    });
  });

  socket.on('getAllUsers', (message) => {
    console.log('get All Users');
    getAllUsers(function(result){
      socket.emit("giveAllUsers",result);
    });   
  });
  
  socket.on('getAllPurchases', (message) => {
    console.log('get All Purchases');
    getAllPurchases(function(result){
      socket.emit("giveAllPurchases",result);
    });   
  });

  socket.on('getAllPurchasesOfUser', (userId) => {
    console.log('get All Purchases');
    getAllPurchasesOfUser(userId, function(result){
      socket.emit("giveAllPurchasesOfUser",result);
    });   
  });

  socket.on('getAllProducers', (message) => {
    console.log('get All Producers');
    getAllProducers(function(result){
      socket.emit("giveAllProducers",result);
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
    addUser(user, function(message){
      console.log(message);
    });
  });

  socket.on('deleteUser', (userId) => {
    console.log(userId);
    deleteUser(userId, function(message){
      console.log(message);
    });
  });


  socket.on('deleteUserByUsername', (username) => {
    console.log(username);
    deleteUserByUsername(username, function(message){
      console.log(message);
    });
  });

  socket.on('editUserRole', (username, permissionId) => {
    console.log(username);
    editUserRole(username, permissionId, function(message){
      console.log(message);
    });
  });

  socket.on('addProduct', (product) => {
    console.log(product);
    addProduct(product, function(message){
      console.log(message);
    });
  });
  
  socket.on('deleteProduct', (productId) => {
    console.log(productId);
    deleteProduct(productId, function(message){
      fs.unlink(__dirname+"/src/imgs/"+productId+".jpg", function(err){
        if(err){
          console.log(err);
        }
      });
      console.log(message);
    });
  });

  socket.on('getProduct', (id) => {
    console.log('get Product ' + id);
    getProduct(id, function (result) {
      socket.emit("giveProduct", result);
    })
  });
  socket.on('getProducers', (id) =>{
    getAllProducers(function(result){
      console.log(result[0].ProducerName);
      socket.emit('giveProducers',result);
    })
  })
  socket.on("editProduct",(product) => {
    if(product.ProductId){
      editProduct(product,function(result){
        if(result.code="success"){
          pId = result.pId
        }
        socket.emit("ProductEdited",result);
      })
    }else{
      addProduct(product,function(result){
        if(result.code="success"){
          pId = result.pId
        }
        socket.emit("ProductEdited",result);
      })
    }
  })
  socket.on('addPurchase', (purchase) => {
    console.log(purchase.ProductId);
    getProduct(purchase.ProductId, function (result) {
      var product = result[0];
      console.log(product.ProducerId);
      console.log(purchase.Amount);
      var totalPrice = product.Price * purchase.Amount;
      purchase.totalPrice = totalPrice;
      if (product.InStorage >= purchase.Amount) {
        addPurchase(purchase, function (result) {
          if (result = "success") {
            product.InStorage = product.InStorage - purchase.Amount;
            editProduct(product,function(result){
              socket.emit('PurchaseRequest', result);
            });
          }else{
            socket.emit('PurchaseRequest', result);
          }        
        })
      }
    })
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});