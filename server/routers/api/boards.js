import express from 'express';
import Board from '../../models/boardModel';
import isLoggedIn from '../helpers/checkAuthMiddleware';
import errorHandler from '../../helpers/errorsHandler';

const router = express.Router();

router.route('/')
  .get(isLoggedIn, (req, res) => {
    const users = req.query.users || [];
    const userId = req.user.userId;

    Board.find({
      $or: [{
        'memberships.id': { $in: users },
      }, {
        'memberships.id': userId,
      }],
    })
      .exec()
      .then((boardsData) => {
        const boards =
          boardsData.filter(({ memberships }) =>
            memberships.some(({ id }) => id === userId));

        res.json(boards);
      })
      .catch(errorHandler(`ERR: finding boards error ${__filename}`));
  });

export default router;
