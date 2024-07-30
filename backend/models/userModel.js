const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String
    },
    profile: {
        name: {
            type: String,
            trim: true
        },
        bio: {
            type: String,
            trim: true
        },
        avatar: {
            type: String,
            default: 'default-avatar.png'
        },
        socialLinks: {
            facebook: String,
            twitter: String,
            linkedin: String,
            instagram: String
        },
        penName: {
            type: String,
            trim: true
        }
    },
    role: {
        type: String,
        required: true,
        enum: ['Writer', 'Reader'],
        default:'Reader'
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    badges: [{
        name: String,
        description: String,
        awardedAt: {
            type: Date,
            default: Date.now
        }
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

const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;
