const mongoose = require('mongoose');
const MONGODB_URL = 'mongodb+srv://hrashikeshapandey:Rishi2004@cluster0.dtjmsbf.mongodb.net/blogginAdvanced?retryWrites=true&w=majority'


function Connectdb() {
    mongoose.connect(MONGODB_URL)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('MongoDB connection error:', error);
        });
}

module.exports = { Connectdb };
