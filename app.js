const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const configPassport = require('./config/passport-jwt-config');
const configDatabase = require('./config/database');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

const userController = require('./controllers/user-controller');
const authController = require('./controllers/auth-controller');

// log to console
app.use(morgan('dev'));

mongoose.connect(configDatabase.database, {
  useMongoClient: true,
});

app.use(passport.initialize());
configPassport();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userController);
app.use('/auth', authController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
