/**
 * Created by afei on 2016/11/17.
 */
var MessageModel = require('../model').Message;

module.exports = {
  createMessage: function (message, callback) {
    new MessageModel(message).save(callback);
  }
};