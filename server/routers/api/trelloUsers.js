import express from 'express';
import mongoose from 'mongoose';
import _ from 'lodash';
import isLoggedIn from '../helpers/checkAuthMiddleware';
import errorHandler from '../../helpers/errorsHandler';

const Board = mongoose.model('Board');
const router = express.Router();

router.route('/')
  .get(isLoggedIn, (req, res) => {
    const { boards = [] } = req.query;
    const userId = req.user.userId;

    Board.find({
      $or: [{
        boardId: { $in: boards },
      }, {
        'memberships.id': userId,
      }],
    })
      .then((data) => {
        res.json(
          _.uniqBy(
            _.flattenDeep(
              _.map(
                data, 'memberships',
              )
            ), 'id'
          )
        );
      })
      .catch(errorHandler(`ERR: finding boards error ${__filename}`));
  });

router.route('/me')
  .get(isLoggedIn, (req, res) => {
    res.json({
      displayName: req.user.displayName,
      avatarUrl: req.user.avatarUrl,
    });
  });

export default router;
