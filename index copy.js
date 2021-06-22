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


app.get('/', (req, res) => {
  console.log("get");
  res.sendFile(__dirname + '/src/user.php');
});

io.on('connection', (socket) => {
  console.log('user connected');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});