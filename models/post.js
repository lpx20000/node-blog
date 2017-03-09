/**
 * Created by home on 2016/12/31.
 */
var mongoose = require('mongoose');
var markdown = require('markdown').markdown;
//文章表
var PostSchema = mongoose.Schema({
    name: String,
    title: String,
    post: String,
    time: Date,
});

// PostSchema.methods.markdownToHtml = (posts) => {
//     posts.forEach((post) => {
//         return {
//             name: post.name,
//             post: markdown.toHTML(post.post),
//             title: post.title,
//             time: post.time
//         };
//     });
// };



module.exports = mongoose.model('Post', PostSchema);