var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');
var settings = require('../settings');
var moment = require('moment');

moment.locale('zh-cn');

app.use(express.static(path.join(__dirname, '../public')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../web/index.html'));
});

var USERS = [
  {
    username: 'afei',
    password: 'afei',
  }, {
    username: 'zxc',
    password: 'zxc',
  }, {
    username: 'zy',
    password: 'zy',
  }, {
    username: 'ln',
    password: 'ln'
  }, {
    username: 'xlz',
    password: 'xlz',
  }
];

function checkLogin(username, password) {
  var valid = false;
  USERS.forEach(function (user) {
    if (user.username === username) {
      if (user.password === password) {
        valid = true;
      }
      return false;
    }
  });
  return valid;
}

io.sockets.on('connection', function (socket) {
  socket.on('message', function (data) {
    io.sockets.emit('message', {
      message: data.message,
      user: socket.user,
      time: moment().format('HH:mm'),
    });
  });

  socket.on('signIn', function (data) {
    if (checkLogin(data.username, data.password)) {
      var user = {
        id: socket.id,
        username: data.username,
      };
      socket.emit('signIn', {
        user: user ,
        status: 'success',
      });
      socket.user = user;
    } else {
      socket.emit('signIn', {
        err: '用户名或密码错误',
        status: 'fail',
      });
    }

  });
});

server.listen(settings.port, function () {
  console.log('running on port %s', settings.port);
});