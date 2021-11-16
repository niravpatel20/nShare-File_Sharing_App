require('dotenv').config();
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

const connectDB = require('./config/db');
connectDB();

//cors

const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static('public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use('/api/files/', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));


app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
})