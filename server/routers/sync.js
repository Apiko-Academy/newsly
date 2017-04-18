import express from 'express';
import Trello from 'node-trello'; // trello api wrapper
import Promise from 'bluebird';
import date from 'date-and-time'; // date parser
import winston from 'winston';
import errorHandler from '../helpers/errorsHandler';
import isLoggedIn from './helpers/checkAuthMiddleware';

import Board from '../models/boardModel';
import Action from '../models/actionModel';

const router = express.Router();

function getBoards(req, res, next) {
  winston.info('Fetching boards');

  const trello = new Trello(process.env.TRELLO_CONSUMER_KEY, req.user.token);
  const getAsync = Promise.promisify(trello.get);
  Board
    .remove({ 'memberships.id': req.user.userId })
    .exec()
    .then(() => {
      getAsync.call(trello, `/1/member/me/boards`, { filter: 'open' })
        .filter(board => board.memberships.length > 1)
        .map(board =>
          new Board({
            boardId: board.id,
            title: board.name,
            url: board.shortUrl,
            memberships: [],
          }).save()
            .then(savedBoard =>
              getAsync.call(trello, `/1/boards/${savedBoard.boardId}/members`, {
                fields: ['fullName', 'username', 'avatarHash'],
              }).catch(errorHandler('ERR: fetching members')))
            .then((members) => {
              Board.update({ boardId: board.id }, {
                memberships: members,
              }).exec().catch(errorHandler('ERR: updating board'));
            })
            .catch(errorHandler('ERR: saving board'))
        )
        .then(() => {
          next();
        })
        .catch(errorHandler('ERR: fetching boards'));
    })
    .catch(errorHandler('ERR: removing boards'));
}

function getActions(req, res, next) {
  winston.info('Fetching actions');

  const trello = new Trello(process.env.TRELLO_CONSUMER_KEY, req.user.token);
  const getAsync = Promise.promisify(trello.get);

  Board
    .find(Board, { 'memberships.id': req.user.userId }, 'boardId')
    .exec()
    .map(board => getAsync
      .call(trello, `/1/boards/${board.boardId}/actions`, {
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

        return Action.update({
          actionId: action.id,
        }, {
          actionId: action.id,
          type: action.type,
          date: date.format(dateObject, 'MMM DD, YY at HH:mm'),
          createdAt: action.date,
          author: action.memberCreator,
          data: action.data,
        }, {
          upsert: true,
          new: true,
        }).exec().catch(errorHandler('ERR: saving actions'));
      }))
    .then(() => next())
    .catch(errorHandler('ERR: getting boards from db'));
}

router.route('/')
  .get([isLoggedIn, getBoards, getActions], (req, res) => {
    winston.info('Done with fetching trello data. Redirecting to main page..');
    res.redirect('/');
  });

export default router;
