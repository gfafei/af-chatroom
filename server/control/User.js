/**
 * Created by afei on 2016/11/17.
 */
var UserModel = require('../model').User;

module.exports = {
  findOneByUserName: function (username, callback) {
    UserModel.findOne({
      username: username,
    }, callback)
  },

  createUser: function (user, callback) {
    new UserModel(user).save(callback);
  }
};