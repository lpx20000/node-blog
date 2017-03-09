var express = require('express');
var router = express.Router();
var register = require('./register');
var login = require('./login');
var post = require('./post');
var upload = require('./upload');
var Post = require('../models/post');
var Comment = require('../models/comment');
var markdown = require('markdown').markdown;


/* GET home page. */
router.get('/', (req, res) => {
    console.log(req.session.user);
    Post.find({}, (err, posts) => {
        if (err) {
            posts = [];
        }
        var content = {
            posts: posts.map((post)=>{
                var comments = [];
                Comment.find({postId: post._id}, (err, comments) => {
                    if (err) {
                        comments = [];
                    }

                });
                return {
                    name: post.name,
                    title: post.title,
                    post: markdown.toHTML(post.post, 'Maruku'),
                    time: post.time.toLocaleString(),
                    comments: ,
                }
            })
        };
        console.log(content);
        res.render('index', {title: '首页', posts: content.posts});
    });

});

//路由分发
router.use(register);
router.use(login);
router.use(post);
router.use(upload);
router.use(comment);

module.exports = router;
