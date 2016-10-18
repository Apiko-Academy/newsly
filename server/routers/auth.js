import express from 'express';
import passport from 'passport';

const router = express.Router();

router.route('/trello')
  .get(passport.authenticate('trello'));

router.route('/trello/callback')
  .get(passport.authenticate('trello', {
    successRedirect: '/sync',
    failureRedirect: '/error/',
  }));

export default router;
