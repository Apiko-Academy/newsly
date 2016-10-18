import express from 'express';
import Board from './../../models/boardModel';

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
    if (req.query.users) {
      Board.find({ 'memberships.id': { $in: req.query.users } })
        .then((boardsData) => {
          const boards = boardsData.filter(b => b.memberships.some(m => m.id === req.user.userId));
          res.json(boards);
        })
        .catch(err => console.error(`ERR: finding boards error - ${err.message} (api/boards.js)`));
    } else {
      Board.find({ 'memberships.id': req.user.userId })
        .then((boards) => {
          res.json(boards);
        })
        .catch(err => console.error(`ERR: finding boards error - ${err.message} (api/boards.js)`));
    }
  });

export default router;
