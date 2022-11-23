require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Books =require('./models/Books');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

mongoose.connect(process.env.DB_URL);

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3001;




app.get('/test', (request, response) => {
  response.send('test request received');
});

app.get('/books', getBooks);
app.post('/books', postBooks);
app.delete('/books/:id', deleteBooks);

async function getBooks(req, res, next) {
  try {
    let result = await Books.find();
    res.status(200).send(result);
  } catch (error) {
  next(error); 
  }
}

async function postBooks(req, res, next) {
  try {
    let createdBook = await Books.create(req.body);
    res.send(createdBook);
  } catch (error) {
    next(error);
  }
}

async function deleteBooks(req, res, next) {
  try {
    await Books.findByIdAndDelete(req.params.id);
    res.send('book deleted')
  } catch (error) {
    next(error);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

app.use((error, request, response, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
