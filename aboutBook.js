require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const {bookModel} = require('./models/Books.js');

const seed = async function () {
  console.log(bookModel);
  await bookModel.create({
    title: 'Charolotte\'s Web',
    // description: 'The novel tells the story of a livestock pig named Wilbur and his friendship with a barn spider named Charlotte. When Wilbur is in danger of being slaughtered by the farmer, Charlotte writes messages praising Wilbur (such as Some Pig & Humble) in her web in order to persuade the farmer to let him live.',
    // author:'E. B. White',
    // status: true
  });
  console.log('@@@@@@');
  await bookModel.create({
    title:'Gone with the Wind',
    // description:'The manipulative daughter of a Georgia plantation owner conducts a turbulent romance with a roguish profiteer during the American Civil War and Reconstruction periods.',
    // author:'Margaret Mitchell',
    // status: true
  });
  await bookModel.create({
    title: 'The Other Side of Dark',
    // Description: 'Stacy wakes up in a hospital room, in a body she doesn\'t recognize. Her mother is dead—murdered—and Stacy is recovering from a gunshot wound. She is the sole eyewitness to the crime, but she has only a shadowy memory of the killer\'s face.' ,
    // author: 'Joan Lowry Nixon',
    // status:false
  });
  mongoose.disconnect();
};

seed();
