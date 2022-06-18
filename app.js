const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const validator = require('express-validator');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// defining our routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const listsRouter = require('./routes/lists');


const app = express();

// address of the frontend app that we are allowed to connect to
const corsOptions = {
  origin: 'http://localhost:4200',
  //origin: 'https://shopping-list-5602a.web.app', // this is firebase url
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));


mongoose
  .connect(
    'mongodb://' +
    process.env.DB_USER +
    ':' +
    process.env.DB_PW +
    '@localhost:27017/shoppingList_db',
    //process.env.MONGODB_URL, // address of MongodbAtlas database has been saved in .env file
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      autoIndex: false
    }
  )
  // confirming if database works
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection error: ' + err);
  });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// this is how we connect to our routes. App.use is middleware
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/lists', listsRouter);

module.exports = app;
