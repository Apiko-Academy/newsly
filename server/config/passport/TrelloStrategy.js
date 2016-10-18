import passport from 'passport';
import { Strategy as TrelloStrategy } from 'passport-trello';
import TrelloUser from './../../models/userModel';

export default () => {
  passport.use(new TrelloStrategy({
    consumerKey: process.env.TRELLO_CONSUMER_KEY,
    consumerSecret: process.env.TRELLO_CONSUMER_SECRET,
    callbackURL: process.env.TRELLO_CALLBACK_URL,
    trelloParams: {
      scope: 'read,write,account',
      name: 'Trello News Feed',
      expiration: 'never',
    },
  }, (accessToken, token, tokenSecret, profile, done) => {
    TrelloUser.findOne({ userId: profile.id })
      .then((foundUser) => {
        if (foundUser) {
          TrelloUser.findOneAndUpdate({ userId: profile.id }, {
            $set: { token: accessToken },
          })
            .then(updatedUser => done(null, updatedUser))
            .catch(err => console.error(`ERR: updating user's token error - ${err.message}`));
        } else {
          new TrelloUser({
            token: accessToken,
            userId: profile.id,
            username: profile._json.username,
            displayName: profile._json.fullName,
            avatarUrl: profile._json.avatarHash ? `http://trello-avatars.s3.amazonaws.com/${profile._json.avatarHash}/50.png` : `img/default_user_icon.png`,
            idBoards: profile._json.idBoards,
          }).save()
            .then(savedUser => done(null, savedUser))
            .catch(err => console.error(`ERR: saving new user to db error - ${err.message}`));
        }
      })
      .catch(err => console.error(`ERR: db error - ${err.message}`));
  }));
};
