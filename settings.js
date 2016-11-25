// var dev = process.env.NODE_ENV === 'dev';
var dev = process.env.NODE_ENV === 'dev';
module.exports = {
  port: 3000,
  //数据库uri
  db: dev ? 'mongodb://104.194.81.171/af-chat' : 'mongodb://127.0.0.1/af-chat',
  //jwt密码
  jwtSecret: 'a43jsf9a',
  //最大信息长度
  maxMessageLength: 1024,
};