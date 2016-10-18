import passport from 'passport';
import mongoose from 'mongoose';

import TrelloStrategy from './TrelloStrategy';

const CNFUser = mongoose.model('TrelloUser');

export default (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => { done(null, user._id); });
  passport.deserializeUser((id, done) => {
    CNFUser.findById(id, (err, user) => {
      done(err, user);
    });
  });
  TrelloStrategy();
};
