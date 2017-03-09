/**
 * Created by home on 2016/12/31.
 */
var express = require('express');
var sha1 = require('sha1');
var User = require('../models/user');
var auth = require('../middleware/auth');
var router = express.Router();
var unauthorized = require('../middleware/auth').unauthorized;

    //注册页面
    router.get('/register',unauthorized, (req, res) => {
        res.render('register', { title: '注册'});
    });

//处理注册
    router.post('/register',unauthorized, (req, res) => {
        var name = req.body.name,
            password = req.body.password,
            repassword = req.body.repassword,
            email = req.body.email;
        //验证信息
        try {
            if (!(name.length >= 1 && name.length <= 10)) {
                throw new Error('名字请限制在 1-10 个字符');
            }
            if (repassword != password) {
                throw new Error('密码和确认密码不一致');
            }
            if (email == '' || email.indexOf('@') === -1) {
                throw new Error('邮箱不得为空或邮箱格式有误');
            }

        } catch (e) {
            req.flash('error', e.message);
            return res.redirect('/register');
        }

        password = sha1(password);

        //检验用户名是否重复
        User.findOne({name: name}, (err, user) => {
            if (err) {
                req.flash('error', err);
                return res.redirect('/register');
            }
            if (user) {
                req.flash('error', '用户名已存在');
                return res.redirect(303, '/register');
            }

            //创建新用户
            new User({
                name: name,
                password: password,
                email: email
            }).save((err, user) => {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/register');
                }
                delete user.password;
                req.session.user = user;
                req.flash('success', '注册成功');
                return res.redirect('/');
            });
        });
    });

module.exports = router;