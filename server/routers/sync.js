import express from 'express';
import Trello from 'node-trello'; // trello api wrapper
import Promise from 'bluebird';
import date from 'date-and-time'; // date parser

import Board from './../models/boardModel';
import Action from './../models/actionModel';

const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    res.status(200);
    next();
  } else {
    res.status(403).redirect('/');
  }
}

function getBoards(req, res, next) {
  console.log('fetching boards');
  const trello = new Trello(process.env.TRELLO_CONSUMER_KEY, req.user.token);
  const getAsync = Promise.promisify(trello.get);
  Board.remove({ 'memberships.id': req.user.userId })
    .then(() => {
      getAsync.call(trello, `/1/member/me/boards`, { filter: 'open' })
        .filter(board => board.memberships.length > 1)
        .map(board => new Board({
          boardId: board.id,
          title: board.name,
          url: board.shortUrl,
          memberships: [],
        }).save()
          .then(savedBoard => getAsync.call(trello, `/1/boards/${savedBoard.boardId}/members`, { fields: ['fullName', 'username', 'avatarHash'] }))
            .then(members => Board.update({ boardId: board.id }, { memberships: members })
              .catch(err => console.error(`ERR: updating board error - ${err.message}`)))
            .catch(err => console.error(`ERR: fetching members error - ${err.message}`))
          .catch(err => console.error(`ERR: saving board error - ${err.message}`))
        )
        .then(() => { next(); })
        .catch(err => console.error(`ERR: fetching boards error - ${err.message}`));
    })
    .catch(err => console.error(`ERR: removing boards error - ${err.message}`));
}

function getActions(req, res, next) {
  console.log('fetching actions');
  const trello = new Trello(process.env.TRELLO_CONSUMER_KEY, req.user.token);
  const getAsync = Promise.promisify(trello.get);
  const findAsync = Promise.promisify(Board.find);
  findAsync.call(Board, { 'memberships.id': req.user.userId }, 'boardId')
    .map(board => getAsync.call(trello, `/1/boards/${board.boardId}/actions`, {
      limit: 100,
      filter: [
        'createCard',
        'createBoard',
        'createList',
        'commentCard',
        'addAttachmentToCard',
        'deleteAttachmentFromCard',
        'addMemberToBoard',
      ],
    })
      .map((action) => {
        const dateObject = date.parse(action.date, 'YYYY/MM/DD HH:mm:ss');
        return Action.update(
          { actionId: action.id },
          {
            actionId: action.id,
            type: action.type,
            date: date.format(dateObject, 'MMM DD, YY at HH:mm'),
            createdAt: action.date,
            author: action.memberCreator,
            data: action.data,
          },
          { upsert: true, new: true })
            .catch(err => console.error(`ERR: saving actions error - ${err.message}`));
      })
    )
    .then(() => { next(); })
    .catch(err => console.error(`ERR: getting boards from db erro - ${err.message}`));
}

router.route('/')
  .get([isLoggedIn, getBoards, getActions], (req, res) => {
    console.log('Done with fetching trello data. Redirecting to main page..');
    res.redirect('/');
  });

export default router;
