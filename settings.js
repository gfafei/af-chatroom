// var dev = process.env.NODE_ENV === 'dev';
var dev = process.env.NODE_ENV === 'dev';
module.exports = {
  dev: dev,
  //数据库uri
  db: dev ? 'mongodb://104.194.81.171/af-chat' : 'mongodb://127.0.0.1/af-chat',
  host: 'http://afei-gf-af-chatroom.daoapp.io',
};
