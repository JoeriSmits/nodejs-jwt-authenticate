const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const configPassport = require('./config/passport-jwt-config');
const morgan = require('morgan');
const database = require('./middleware/mongoose-database');

const app = express();

const userController = require('./controllers/user-controller');
const authController = require('./controllers/auth-controller');

// log to console
app.use(morgan('dev'));

// Make a mongoose connection to the mongo database
app.use(database);

app.use(passport.initialize());
app.use(configPassport);

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
