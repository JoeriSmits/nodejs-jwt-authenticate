const express = require('express');
const router = express.Router();
const jwtAuth = require('../middleware/jwt-authenticate');

router.get('/', function(req, res, next) {
  res.send('Hello!');
});

router.get('/profile', jwtAuth, function(req, res, next) {
  res.json({msg: "You made it to the secure area"});
});

module.exports = router;
