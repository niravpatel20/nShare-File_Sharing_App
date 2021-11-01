const mongoose = require('mongoose');

const connectDB = () => {

    mongoose.connect(process.env.MONGOOSE_CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database Connected!');
    }).catch((e) => {
        console.log('Database connection failed!', e);
    })
}

module.exports = connectDB;