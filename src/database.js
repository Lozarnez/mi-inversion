const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Admin1:4dm1n1@miinv-jroan.mongodb.net/test?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
}).then(db => console.log('Database is connected'))
  .catch(err => console.error(err));