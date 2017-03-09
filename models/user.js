/**
 * Created by home on 2016/12/31.
 */
var mongoose = require('mongoose');

//用户表
var UserSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String
});



module.exports = mongoose.model('User', UserSchema);