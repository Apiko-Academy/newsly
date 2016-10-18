import express from 'express';
import mongoose from 'mongoose';

const Action = mongoose.model('Action');

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
    if (req.query.users && req.query.boards) {
      Action.find(
        { 'author.id': { $in: req.query.users },
          'data.board.id': { $in: req.query.boards },
      }).sort({ createdAt: -1 })
        .then((actions) => {
          res.json(actions);
        })
        .catch(err => console.error(`ERR: finding actions error - ${err.message} - (api/actions.js)`));
    } else if (req.query.boards) {
      Action.find(
        { 'data.board.id': { $in: req.query.boards },
      }).sort({ createdAt: -1 })
        .then((actions) => {
          res.json(actions);
        })
        .catch(err => console.error(`ERR: finding actions error - ${err.message} - (api/actions.js)`));
    } else if (req.query.users) {
      Action.find(
        { 'author.id': { $in: req.query.users },
          'data.board.id': { $in: req.user.idBoards },
      }).sort({ createdAt: -1 })
        .then((actions) => {
          res.json(actions);
        })
        .catch(err => console.error(`ERR: finding actions error - ${err.message} - (api/actions.js)`));
    } else {
      Action.find({ 'data.board.id': { $in: req.user.idBoards } }).sort({ createdAt: -1 })
        .then((actions) => {
          res.json(actions);
        })
        .catch(err => console.error(`ERR: finding actions error - ${err.message} - (api/actions.js)`));
    }
  });

export default router;
