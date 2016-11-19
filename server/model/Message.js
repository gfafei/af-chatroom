/**
 * Created by afei on 2016/11/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var messageSchema = new Schema({
  creator: ObjectId,
  content: String,
  createTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('message', messageSchema);