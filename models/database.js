/**
 * Created by home on 2016/12/31.
 */
var mongoose = require('mongoose');
var credential = require('../lib/credential');

//数据库其他配置
var opt = {
  server: {
      socketOptions: {
          keepAlive: 1
      }
  }
};

//连接数据库并导出
module.exports = mongoose.connect(credential.mongoose.development.connectionString, opt);