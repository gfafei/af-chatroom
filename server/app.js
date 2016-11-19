var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');
var settings = require('../settings');
var moment = require('moment');
var Utils = require('./utils');
var Message = require('./control').Message;
var async = require('async');

Utils.DBConnect(settings.db);
app.use(express.static(path.join(__dirname, '../public')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../web/index.html'));
});

io.sockets.on('connection', function (socket) {
  socket.on('message', function (data) {
    Message.createMessage({
      content: data.message,
      creator: socket.user._id,
      createTime: new Date(),
    });
    io.sockets.emit('message', {
      message: data.message,
      user: socket.user,
      time: moment().format('HH:mm'),
    });
  });

  socket.on('signIn', function (data) {
    Utils.checkLogin(data.username, data.password, function (err, doc) {
      if (err) {
        socket.emit('signIn', {
          err: err,
          status: 'fail',
        });
      } else {
        var user = doc.toObject();
        user.id = socket.id;
        socket.emit('signIn', {
          user: user,
          status: 'success',
        });
        socket.user = user;
      }
    });
  });

  socket.on('signUp', function (data) {
    async.series({
      check: function (callback) {
        Utils.checkSignUp(data.username, data.password, callback);
      },
      signUp: function (callback) {
        Utils.signUp(data.username, data.password, callback);
      }
    }, function (err, results) {
      if (err) {
        socket.emit('signUp', {
          status: 'fail',
          err: err
        });
      } else {
        socket.emit('signUp', {
          status: 'success',
        });
        var user = results.signUp.toObject();
        user.id = socket.id;
        socket.user = user;
      }
    });
  });
});

server.listen(settings.port, function () {
  console.log('running on port %s', settings.port);
});