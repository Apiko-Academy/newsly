import React, { PropTypes } from 'react';
import getTrelloImageUrl from '../../helpers/getTrelloAvatarUrl';

const propTypes = {
  author: PropTypes.shape({
    avatarHash: PropTypes.string,
    fullName: PropTypes.string,
  }),
  board: PropTypes.shape({
    name: PropTypes.string,
    shortLink: PropTypes.string,
  }),
  list: PropTypes.shape({
    name: PropTypes.string,
  }),
  date: PropTypes.string,
};

const CreateList = (props) => {
  const { author, board, list, date } = props;
  const { avatarHash, fullName } = author;

  return (
    <li className="collection-item avatar">
      <img
        src={getTrelloImageUrl(avatarHash)}
        alt="avatar" className="circle"
      />
      <span className="title">{fullName}</span>&nbsp;
      added <strong>{ list.name }</strong> to&nbsp;
      <a target="_blank" rel="noopener noreferrer" href={`https://trello.com/b/${board.shortLink}`}>
        { board.name }
      </a> board
      <br />
      <small>{ date }</small>
    </li>
  );
};

CreateList.propTypes = propTypes;

export default CreateList;
