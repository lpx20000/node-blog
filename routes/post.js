/**
 * Created by home on 2016/12/31.
 */
var express = require('express');
var router = express.Router();
var authorized = require('../middleware/auth').authorized;
var Post = require('../models/post');
var User = require('../models/user');

//发表文章
router.get('/post',authorized, (req, res) => {
    res.render('post', { 'title': '发表'});
});

//删除某一篇文章
router.get('/post/remove/:id', authorized, (req, res) => {
    var id = req.params.id;
    var name = req.session.user.name;
    Post.remove({_id: id, name: name}, (err) => {
        if (err) {
            req.flash('err', '您无权限删除该文章');
            return res.redirect('back');
        }
        req.flash('success', '修改成功');
        return res.redirect('/');
    });
});

//更新文章
router.post('/post/:id/update', authorized, (req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    var user = req.session.user.name;
    var post = req.body.post;
    if (user != name) {
        req.flash('err', '请不要修改不是你的文章');
        return res.redirect('back');
    }
    Post.update({_id: id}, {$set: {post: post}}, (err) => {
        if (err) {
            req.flash('err', '操作失败,请重试...');
            return res.redirect('back');
        }
        req.flash('success', '修改成功');
        return res.redirect('/');
    });
});

//编辑文章页面
router.get('/post/edit/:id', authorized, (req, res) => {
    var id = req.params.id;
    var user = req.session.user.name;
    Post.findById(id, (err, post) => {
        if (err) {
            req.flash('err', '操作失败,请重试...');
            return res.redirect('back');
        }
        if (post.name != user) {
            req.flash('err', '请不要修改不是你的文章');
            return res.redirect('back');
        }

        res.render('edit', {title: '编辑文章', post: post});
    });
});

//文章详情
router.get('/post/:title/name/:name', (req, res) => {
    var title = req.params.title;
    var name = req.params.name;
    Post.find({title:title, name:name}, (err, post) => {
        if (err) {
            req.flash('err', '操作失败,请重试...');
            return res.redirect('back');
        }

        res.render('article', {title: '文章详情', post: post[0]});
    });
});

//用户名下所有文章
router.get('/posts/:name', (req, res) => {
    //查找用户所有文章
    var name = req.params.name;
    User.find({name:name}, (err, user) => {
        if (err) {
            req.flash('err', '操作失败,请重试...');
            return res.redirect('/');
        }
        if (!user) {
            req.flash('err', '用户不存在');
            return res.redirect('/');
        }
    });
    Post.find({name:name}, (err, posts) => {
        if (err) {
            req.flash('err', '操作失败,请重试...');
            return res.redirect('/');
        }
        // var allPosts = {
        //   posts: posts.map((post) => {
        //     return {
        //         name: post.name,
        //         title: post.title,
        //         post: post.post,
        //         time: post.time
        //     }
        //   })
        // };
        res.render('index', {title: '用户文章', posts: posts});
    });
});

//发表文章
router.post('/post',authorized, (req, res) => {

    var user = req.session.user.name,
        title = req.body.title,
        post = req.body.post,
        date = new Date(),
        time = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        console.log(time);
    // 校验参数
    try {
        if (!title.length) {
            throw new Error('请填写标题');
        }
        if (!post.length) {
            throw new Error('请填写内容');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }
    new Post({
        name: user,
        title: title,
        post: post,
        time: time
    }).save((err, post) => {
        console.log(err);
        if (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
        req.flash('success', '发布成功');
        return res.redirect('/');
    });
});

module.exports = router;