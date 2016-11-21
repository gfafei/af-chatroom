/**
 * Created by afei on 2016/11/17.
 */
var MessageModel = require('../model').Message;
var UserModel = require('../model').User;
var async = require('async');
var moment = require('moment');
module.exports = {
  createMessage: function (message, callback) {
    new MessageModel(message).save(callback);
  },

  findLastMessagesByTime: function (time, callback) {
    MessageModel.find({
      createTime: { $lt: time },
    }, null, {
      limit: 20,
      sort: { createTime: -1 }
    }, function (err, messages) {
      var _messages = [];
      async.each(messages, function (message, cb) {
        UserModel.findOne({
          _id: message.creator,
        }, function (err, user) {
          message = message.toObject();
          message.creator = user;
          message.createTime = moment(message.createTime).format('HH:mm');
          _messages.push(message);
          cb(err);
        });
      }, function (err) {
        callback(err, _messages);
      });
    });
  }
};