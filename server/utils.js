/**
 * Created by afei on 2016/11/17.
 */
var mongoose = require('mongoose');
var Control = require('./control');
var User = Control.User;
module.exports = {
  checkLogin: function (username, password, callback) {
    User.findOneByUserName(username, function (err, user) {
      if (err || !user) {
        return callback('用户名不存在')
      }
      if (password != user.password) {
        return callback('密码不正确')
      } else {
        return callback(null, user)
      }
    });
  },

  checkSignUp: function (username, password, callback) {
    if (!/^\S{6,}$/.test(password)) {
      return callback('密码至少6位');
    }
    User.findOneByUserName(username, function (err, user) {
      if (err || user) {
        return callback('用户名已存在')
      } else {
        return callback();
      }
    });
  },

  signUp: function (username, password, callback) {
    User.createUser({
      username: username,
      password: password
    }, callback);
  },

  DBConnect: function (db) {
    mongoose.connect(db, function (err) {
      if (err) {
        throw err;
      }
    });
  }
};