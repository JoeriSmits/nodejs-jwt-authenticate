const express = require('express');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jwt-simple');
const securityConfig = require('../config/security-config');

const User = require('../models/user');

/* GET users listing. */
router.post('/register', function(req, res, next) {
  const {name, password} = req.body;

  const newUser = new User({name: name, password: password});
  // save the user
  newUser.save(function(err) {
    if (err) return res.json({success: false, msg: 'Username already exists.'});
    // Successful
    res.json({success: true, msg: 'Successful created new user.'});
  });
});

router.post('/login', function(req, res, next) {
  User.findOne({name: req.body.name}, function(err, user) {
    if(err) throw err;
    if(!user) return res.send({success: false, msg: 'Authentication failed.'});

    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.send({success: false, msg: 'Authentication failed.'});
      }
      // if user is found and password is right create a token
      const token = jwt.encode(_.omit(user, 'password'), securityConfig.jwtSecret);
      // return the information including token as JSON
      res.json({success: true, token: `JWT ${token}`});
    });
  });
});

module.exports = router;
