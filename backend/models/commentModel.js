const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    content: String,
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { _id: true }); // This will automatically add an _id field to each reply

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    content: {
        type: String,
    },
    replies: [replySchema], // Use the replySchema here
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;
