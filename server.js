
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const mongoose = require('mongoose');
const Book =require('./models/Books');

const PORT = process.env.PORT || 3001;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

mongoose.connect(process.env.DB_URL);

app.get('/test', (request, response) => {
  response.send('test request received');
});

app.get('/books',getBooks);

async function getBooks(req, res, next) {
  try {
    let result = await Book.find();
    res.send(result);
  } catch (error) {
  next(error); 
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
