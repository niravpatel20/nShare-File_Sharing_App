require('dotenv').config();
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

const connectDB = require('./config/db');
connectDB();

app.use(express.json());
app.use('/api/files/', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));


app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
})