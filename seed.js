require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const bookModel = require('./models/Books.js');

const seed = async function () {
  console.log(bookModel);
  await bookModel.create({
    title: 'Charolotte\'s Web',
    img_url: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60",
    description: 'The novel tells the story of a livestock pig named Wilbur and his friendship with a barn spider named Charlotte. When Wilbur is in danger of being slaughtered by the farmer, Charlotte writes messages praising Wilbur (such as Some Pig & Humble) in her web in order to persuade the farmer to let him live.',
    author:'E. B. White',
    status: true
  });
  await bookModel.create({
    title:'Gone with the Wind',
    img_url: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60",
    description:'The manipulative daughter of a Georgia plantation owner conducts a turbulent romance with a roguish profiteer during the American Civil War and Reconstruction periods.',
    author:'Margaret Mitchell',
    status: true
  });
  await bookModel.create({
    title: 'The Other Side of Dark',
    img_url: "https://images.unsplash.com/photo-1447688812233-3dbfff862778?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGRhcmslMjBwb3J0cmFpdCUyMHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60&w=700&q=60",
    description: 'Stacy wakes up in a hospital room, in a body she doesn\'t recognize. Her mother is dead—murdered—and Stacy is recovering from a gunshot wound. She is the sole eyewitness to the crime, but she has only a shadowy memory of the killer\'s face.' ,
    author: 'Joan Lowry Nixon',
    status:false
  });
  mongoose.disconnect();
};

seed();
