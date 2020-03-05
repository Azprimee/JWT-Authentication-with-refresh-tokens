import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import passport from 'passport';
import User from '../models/User';
import { Strategy as LocalStrategy } from 'passport-local';

import jwtstrategy from 'passport-jwt';
import extractjwt from 'passport-jwt';

const JwtStrategy = jwtstrategy.Strategy;
const ExtractJwt = extractjwt.ExtractJwt;

export default () => {
  var options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = process.env.JWT_SECRET;

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      function(email, password, done) {
        User.findOne({ email: email }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
    )
  );

  passport.use(
    new JwtStrategy(options, function(jwt_payload, done) {
      User.findOne({ _id: jwt_payload.id }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
