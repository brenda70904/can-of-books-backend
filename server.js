require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Books = require('./models/Books');
const verifyUser = require('./auth');

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
app.put('/books/:id', putBooks);

// verifyUser(request, async (err, user) => {
//   if (err) {
//     //console.log(err);
//     res.send('invalid token');
//   } else {
//     // insert try catch logic here, check syntax immediately
//   }
// });

async function getBooks(req, res, next) {

  verifyUser(req, async (err, user) => {
    console.log(user);
    if (err) {
      //console.log(err);
      res.send('invalid token');
    } else {

      try {
        let result = await Books.find();
        res.status(200).send(result);
      } catch (error) {
        next(error);
      }
    }
  });
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
    res.status(200).send('book deleted');
  } catch (error) {
    next(error);
  }
}

async function putBooks(req, res, next) {
  try {
    let id = req.params.id;
    let updatedBook = req.body;
    let newBook = await Books.findByIdAndUpdate(id, updatedBook, { new: true, overwrites: true });
    res.status(200).send(newBook);
  } catch (error) {
    next(error);
  }
}

app.get('*', (req, response) => {
  response.status(404).send('Not availabe');
});

app.use((error, req, res) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
