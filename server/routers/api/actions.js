import express from 'express';
import mongoose from 'mongoose';
import isLoggedIn from '../helpers/checkAuthMiddleware';
import errorHandler from '../../helpers/errorsHandler';

const Action = mongoose.model('Action');

const router = express.Router();

router.route('/')
  .get(isLoggedIn, (req, res) => {
    const { users = [], boards = [] } = req.query;
    const userQuery = users.length ?
      { $in: users } : { $nin: users };
    const boardsQuery = boards.length ?
      { $in: boards } : { $nin: boards };

    Action
      .find({
        'author.id': userQuery,
        'data.board.id': boardsQuery,
      })
      .sort({ createdAt: -1 })
      .exec()
      .then(data => res.json(data))
      .catch(errorHandler(`ERR: finding actions error ${__filename}`));
  });

export default router;
