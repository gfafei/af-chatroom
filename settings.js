module.exports = {
  dev: process.env.NODE_ENV === 'develop',
  //服务器配置
  server: 'http://104.194.81.171/',
  port: 1350,
  //数据库uri
  db: 'mongodb://127.0.0.1/af-chat',
  //jwt密码
  jwtSecret: 'a43jsf9a',
  //最大信息长度
  maxMessageLength: 1024,
};