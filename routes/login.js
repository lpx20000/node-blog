/**
 * Created by home on 2016/12/31.
 */
var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var User = require('../models/user');
var unauthorized = require('../middleware/auth').unauthorized;
var authorized = require('../middleware/auth').authorized;

router.get('/login',unauthorized, (req, res) => {
    res.render('login', {'title': '登录'});
});

router.post('/login',unauthorized, (req, res) => {
    var name = req.body.name,
        password = req.body.password;

    try {
        if (!(name.length >= 1 && name.length <= 10)) {
            throw new Error('名字长度不对,请重新输入');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/login');
    }

    password = sha1(password);
    //
    User.findOne({name: name}, (err, user) => {
        if (err) {
            req.flash('error', err);
            return res.redirect('/login');
        }
        if (!user) {
            req.flash('error', '用户不存在，请重新输入');
            return res.redirect('/login');
        }
        if (user.password != password) {
            req.flash('error', '用户名或密码输入错误');
            return res.redirect('/login');
        }
        delete user.password;
        req.flash('success', '登录成功');
        req.session.user = user;
        res.redirect('/');
    });
});

router.get('/logout',authorized, (req, res) => {
    req.session.user = null;
    req.flash('success', '退出成功');
    res.redirect('/');
});

module.exports = router;