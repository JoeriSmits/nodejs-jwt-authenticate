const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const securityConfig = require('../config/security-config');

// set up a mongoose model
const UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function(next) {
  if(!this.isModified('password') || !this.isNew) return;

  const user = this;
  bcrypt.genSalt(securityConfig.saltRounds, (err, salt) => {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(providedPassword, next) {
  bcrypt.compare(providedPassword, this.password, (err, isMatch) => {
    if(err) return next(err);
    // We have a match
    next(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
