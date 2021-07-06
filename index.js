//setup
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/src'));
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const url = require('url');
const multer = require('multer');
const fs = require('fs');

//DB-Connection
const mysql = require('mysql');
var dbConnection = mysql.createConnection({
  host: 'remotemysql.com',
  port: '3306',
  user: 'YEfPnCDIbs',
  password: 'U1j9QBQ531',
  database: 'YEfPnCDIbs'
});
var hasDBConntection = false;
var pId = undefined;

dbConnection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  hasDBConntection = true;
});



//SQL-SELECTS
function getAllUsers(callback) {
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
function getRatingByProduct(productId, callback) {
  var sql = 'SELECT RATING.ProductId, RATING.RatingId, RATING.UserId, RATING.Stars, RATING.Comment, RATING.Timestamp, USERS.Username FROM RATING, USERS WHERE RATING.UserId = USERS.UserId AND RATING.ProductId = ' + productId+" ORDER BY Timestamp DESC";
  dbConnection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    callback(rows);
  });
}
function getRatingByUser(username, callback) {
  var sql = "SELECT RATING.ProductId, RATING.RatingId, RATING.UserId, RATING.Stars, RATING.Comment, RATING.Timestamp, USERS.Username, PRODUCTS.Name FROM RATING, USERS, PRODUCTS WHERE RATING.UserId = USERS.UserId AND USERS.Username = " + "'" + username + "'" + "AND PRODUCTS.ProductId = RATING.ProductId";
  dbConnection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    callback(rows);
  });
}
function getAllProducers(callback) {
  var sql = 'SELECT * FROM PRODUCERS ORDER BY ProducerName';
  dbConnection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    callback(rows);
  });
}
function getProducerByName(name, callback) {
  var sql = "SELECT * FROM PRODUCERS WHERE ProducerName = '" + name + "'";
  dbConnection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    callback(rows[0]);
  });
}
function getAllProducts(callback) {
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

function getAllPurchases(callback) {
  dbConnection.query('SELECT * FROM PURCHASES', function (err, rows, fields) {
    if (err) throw err;
    callback(rows);
  });
}

function getAllProducers(callback) {
  dbConnection.query('SELECT * FROM PRODUCERS', function (err, rows, fields) {
    if (err) throw err;
    console.log(rows[1].ProducerName);
    callback(rows);
  });
}

//SQL-INSERTS
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
  dbConnection.query('INSERT INTO PRODUCTS(Name,ProducerId,InStorage,Price,Description,Rating) VALUES (?,?,?,?,?,?)', [product.Name, product.ProducerId, product.InStorage, product.Price, product.Description, '0'], function (err, rows, fields) {
    if (err) throw err;
    callback({ code: 'success', pId: rows.insertId });
  });
}

function addProducer(producer, callback) {
  dbConnection.query('INSERT INTO PRODUCERS(ProducerName) VALUES (?)', [producer], function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}

function addRating(rating, callback) {
  dbConnection.query('INSERT INTO RATING(UserId,ProductId,Stars,Comment) VALUES (?,?,?,?)', [rating.UserId, rating.ProductId, rating.Stars, rating.Comment], function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}

//SQL-DELETES
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

function deleteProduct(productId, callback) {
  dbConnection.query('DELETE FROM PRODUCTS WHERE ProductId = ' + productId, function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}

function deleteProducer(producerId, callback) {
  dbConnection.query('DELETE FROM PRODUCERS WHERE ProducerId = ' + producerId, function (err, rows, fields) {
    if (err && err.errno == 1217) {
      callback('hasProducts');
    }
    else if (err) {
      callback('error');
    }
    else {
      callback('success')
    };
  });
}

//SQL-UPDATES
function editUserRole(username, permissionId, callback) {
  dbConnection.query("UPDATE USERS SET PermissionId = " + permissionId + " WHERE Username = " + "'" + username + "'", function (err, rows, fields) {
    if (err) throw err;
    callback('success');
  });
}

function editProduct(product, callback) {
  dbConnection.query("UPDATE PRODUCTS SET Name ='" + product.Name + "', Description = '" + product.Description + "', ProducerId ='" + product.ProducerId + "', InStorage = '" + product.InStorage + "', Price = '" + product.Price + "' WHERE ProductId = " + product.ProductId, function (err, rows, fields) {
    if (err) throw err;
    callback({ code: 'success', pId: product.ProductId });
  });
}

function changeRating(product, callback) {
  dbConnection.query("UPDATE PRODUCTS SET Name ='" + product.Name + "', Description = '" + product.Description + "', ProducerId ='" + product.ProducerId + "', InStorage = '" + product.InStorage + "', Price = '" + product.Price + "', Rating= '" + product.Rating + "' WHERE ProductId = " + product.ProductId, function (err, rows, fields) {
    if (err) throw err;
    callback({ code: 'success', pId: product.ProductId });
  });
}

//keeping connection stable with regular request, necessary for remotemysql.com
function connectionCheck() {
  getAllPermissions(function (result) {
  });
}
setInterval(connectionCheck, 60000, 'connection');

//Image-saving
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/imgs')
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, pId + ".jpg");
  }
})
const upload = multer({ storage });
app.post('/upload', upload.array('avatar'), (req, res) => {
  res.redirect(url.format({
    pathname: 'product-detail.html',
    query: {
      "pid": pId,
      "mode": 2
    }
  }));
});

//return main file for '/'
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

//connection with frontend
io.on('connection', (socket) => {
  console.log('user connected');

  //communication with frontend: socket.on => listen, socket.emit => send
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
    getAllUsers(function (result) {
      socket.emit("giveAllUsers", result);
    });
  });

  socket.on('getAllUsersForSearch', (message) => {
    console.log('get All Users');
    getAllUsers(function (result) {
      socket.emit("giveAllUsersForSearch", result);
    });
  });

  socket.on('getAllPurchases', (message) => {
    console.log('get All Purchases');
    getAllPurchases(function (result) {
      socket.emit("giveAllPurchases", result);
    });
  });

  socket.on('getAllPurchasesOfUser', (userId) => {
    console.log('get All Purchases');
    getAllPurchasesOfUser(userId, function (result) {
      socket.emit("giveAllPurchasesOfUser", result);
    });
  });

  socket.on("getAllRatingsOfUser", (username) => {
    console.log(username);
    getRatingByUser(username, function (result) {
      socket.emit("giveAllRatingsOfUser", result);
    })
  });

  socket.on('getAllProducers', (message) => {
    console.log('get All Producers');
    getAllProducers(function (result) {
      socket.emit("giveAllProducers", result);
    });
  });

  socket.on('getAllUsersForLogin', (message) => {
    console.log('get All Users');
    getAllUsers(function (result) {
      socket.emit("giveAllUsersForLogin", result);
    });
  });

  socket.on('getAllUsersForRegistration', (message) => {
    console.log('get All Users');
    getAllUsers(function (result) {
      socket.emit("giveAllUsersForRegistration", result);
    });
  });

  socket.on('addUser', (user) => {
    console.log(user);
    addUser(user, function (message) {
      console.log(message);
    });
  });

  socket.on('deleteUser', (userId) => {
    console.log(userId);
    deleteUser(userId, function (message) {
      console.log(message);
    });
  });

  socket.on('deleteProducer', (producerName) => {
    getProducerByName(producerName, function (result) {
      if (result == null) {
        console.log("noProducerFound");
        socket.emit('deleteProducerRequest', "Producer does not exist");
      }
      else {
        var producerId = result.ProducerId;
        deleteProducer(producerId, function (message) {
          if (message == "success") {
            message = "Producer was successfully deleted";
          } else if(message =="error") {
            message = "Producer could not be deleted";
          }else if(message=="hasProducts"){
            message = "Producer could not be deleted: This Producer is still offering Products";
          }
          socket.emit('deleteProducerRequest', message);
        })
      }
    });
  });
  socket.on("addNewProducer", (producerName) => {
    getProducerByName(producerName, function (result) {
      console.log(result);
      if (result) {
        socket.emit("addProducerRequest", "Producer already exists");
      } else {
        addProducer(producerName, function (result) {
          if (result = "success") {
            socket.emit("addProducerRequest", "Producer was successfully saved");
          } else {
            socket.emit("addProducerRequest", "Producer could not be saved");
          }
        })
      }
    });
  });

  socket.on('deleteUserByUsername', (username) => {
    console.log(username);
    deleteUserByUsername(username, function (message) {
      console.log(message);
    });
  });

  socket.on('editUserRole', (username, permissionId) => {
    console.log(username);
    editUserRole(username, permissionId, function (message) {
      console.log(message);
    });
  });

  socket.on('addProduct', (product) => {
    console.log(product);
    addProduct(product, function (message) {
      console.log(message);
    });
  });

  socket.on('deleteProduct', (productId) => {
    console.log(productId);
    deleteProduct(productId, function (message) {
      fs.unlink(__dirname + "/src/imgs/" + productId + ".jpg", function (err) {
        if (err) {
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
  socket.on('getProducers', (id) => {
    getAllProducers(function (result) {
      socket.emit('giveProducers', result);
    })
  })
  socket.on("getRatingsForProduct", (pId) => {
    console.log(pId);
    getRatingByProduct(pId, function (result) {
      socket.emit("giveRatingsForProduct", result);
    })
  });
  socket.on("getRatingsForUser", (username) => {
    getRatingByProduct(username, function (result) {
      socket.emit("giveRatingsForUser");
    })
  })
  socket.on("saveRating", (rating) => {
    addRating(rating, function (result) {
      if (result = "success") {
        getRatingByProduct(rating.ProductId, function (result) {
          console.log(result);
          var avg = 0;
          result.forEach((r) => avg = avg + parseInt(r.Stars));
          avg = avg / result.length;
          console.log(avg);
          avg = Math.ceil(avg);
          console.log(avg);
          getProduct(rating.ProductId, function (product) {
            product[0].Rating = avg;

            var p = { ProductId: product[0].ProductId, Name: product[0].Name, Description: product[0].Description, InStorage: product[0].InStorage, Price: product[0].Price, Rating: product[0].Rating, ProducerId: product[0].ProducerId };
            console.log(p);
            changeRating(p, function (result) {
              socket.emit("RatingSaved", result.code);
            })
          })
        })
      } else {
        socket.emit("RatingSaved", result);
      }
    });
  });
  socket.on("editProduct", (product) => {
    if (product.ProductId) {
      editProduct(product, function (result) {
        if (result.code = "success") {
          pId = result.pId
        }
        socket.emit("ProductEdited", result);
      })
    } else {
      addProduct(product, function (result) {
        if (result.code = "success") {
          pId = result.pId
        }
        socket.emit("ProductEdited", result);
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
            editProduct(product, function (result) {
              socket.emit('PurchaseRequest', result);
            });
          } else {
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
