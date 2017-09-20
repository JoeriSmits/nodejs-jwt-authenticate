const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const securityConfig = require('./security-config');

const User = require('../models/user');

module.exports = function() {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = securityConfig.jwtSecret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.id}, (err, user) => {
          if(err) return done(err, false);
          // If we found a user we return it else return false
          return user ? done(null, user) : done(null, false);
        });
    }));
};
