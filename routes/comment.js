/**
 * Created by Administrator on 2017/2/21.
 */
var express = require('express');
var router = express.Router();
var authorized = require('../middleware/auth').authorized;
var User = require('../models/user');

router.post('/comment', (req, res) => {
    var user = req.session.user.name,
        title = req.body.title,
        post = req.body.post,
        date = new Date(),
        time = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    console.log(time);
});

module.exports = router;