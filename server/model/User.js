/**
 * Created by afei on 2016/11/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,//用户名
  password: String,
  registerTime: Date,
  lastLoginTime: Date,
  nickname: String, //昵称
  phone: String,
  email: String,
});

module.exports = mongoose.model('user', userSchema);

