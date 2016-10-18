import express from 'express';
import mongoose from 'mongoose';
import _ from 'lodash';

const Board = mongoose.model('Board');
const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    res.status(200);
    next();
  } else {
    res.status(403).redirect('/');
  }
}

router.route('/')
  .get(isLoggedIn, (req, res) => {
    if (req.query.boards) {
      Board.find({ boardId: { $in: req.query.boards } })
        .then((data) => {
          res.json(
            _.uniqBy(
              _.flattenDeep(
                _.map(
                  data, 'memberships'
                )
              ), 'id'
            )
          );
        })
        .catch(err => console.error(`ERR: finding boards error - ${err.message} (api/trelloUsers.js)`));
    } else {
      Board.find({ 'memberships.id': req.user.userId })
        .then((data) => {
          res.json(
            _.uniqBy(
              _.flattenDeep(
                _.map(
                  data, 'memberships'
                )
              ), 'id'
            )
          );
        })
        .catch(err => console.error(`ERR: finding boards error - ${err.message} (trelloUsers.js)`));
    }
  });

router.route('/me')
  .get(isLoggedIn, (req, res) => {
    res.json({
      displayName: req.user.displayName,
      avatarUrl: req.user.avatarUrl,
    });
  });

export default router;
