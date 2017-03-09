/**
 * Created by home on 2017/1/4.
 */
const express = require('express');
const router = express.Router();
const authorized = require('../middleware/auth').authorized;
const formidable = require('formidable');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const utile = require('util');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const rootPath = path.resolve(__dirname, '../');


 router.get('/upload',authorized, (req, res) => {
     res.render('upload', {
         title: '上传',
         'user': req.session.user
     });
 });

 //处理文件上传
router.post('/upload',authorized , (req, res) => {
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        const form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.maxFieldsSize = 2 * 1024 * 1024;
        form.parse(req, (err, fields, files) => {
            if (err) {
                req.flash('error', '上传出错，请重新上传');
                return res.redirect(303, '/upload');
            }
            //处理图片上传
            for (var i in files) {
                if (files[i].name) {
                    var actualDir = rootPath + '/public/image';
                    fs.existsSync(actualDir) || fs.mkdirSync(actualDir);
                    var uploadFile = files[i];
                    var path = actualDir + '/' +Date.now();
                    fs.existsSync(path) || fs.mkdirSync(path);
                    console.log(uploadFile.name);
                    fs.renameSync(uploadFile.path, path + '/' + uploadFile.name);
                    console.log(uploadFile.name);
                }
            }
            req.flash('success', '上传成功');
            return res.redirect(303, '/upload');
        });

    }

});

module.exports = router;

