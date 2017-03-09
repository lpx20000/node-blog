/**
 * Created by home on 2017/2/12.
 */
var mongoose = require('mongoose');

var CommentSchema = mongoose.schema({
    postId: Number,
    userId: Date,
    title: String,
    comment: Array,
});


module.exports = mongoose.model('Comment', CommentSchema);