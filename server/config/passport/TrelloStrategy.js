import passport from 'passport';
import { Strategy as TrelloStrategy } from 'passport-trello';
import TrelloUser from '../../models/userModel';
import errorHandler from '../../helpers/errorsHandler';

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
    const { id: userId, _json } = profile;
    const { username, fullName, avatarHash, idBoards } = _json;

    TrelloUser.findOne({ userId })
      .exec()
      .then((foundUser) => {
        if (foundUser) {
          TrelloUser.findOneAndUpdate({ userId }, {
            $set: { token: accessToken },
          })
            .exec()
            .then(updatedUser => done(null, updatedUser))
            .catch(errorHandler('ERR: updating user\'s token error'));
        } else {
          new TrelloUser({
            userId,
            username,
            idBoards,
            token: accessToken,
            displayName: fullName,
            avatarUrl: avatarHash ?
              `http://trello-avatars.s3.amazonaws.com/${avatarHash}/50.png` :
              `img/default_user_icon.png`,
          }).save()
            .then(savedUser => done(null, savedUser))
            .catch(errorHandler('ERR: saving new user to db error'));
        }
      })
      .catch(errorHandler('ERR: db error'));
  }));
};
