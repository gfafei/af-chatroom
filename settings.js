// var dev = process.env.NODE_ENV === 'dev';
var dev = process.env.NODE_ENV === 'dev';
module.exports = {
  //生产环境
  product: process.env.NODE_ENV === 'product',
  //数据库uri
  db: process.env.DB_URI || 'mongodb://127.0.0.1/af-chat',
  port: process.env.PORT || 3001,
  host: 'http://afei-gf-af-chatroom.daoapp.io',
};
