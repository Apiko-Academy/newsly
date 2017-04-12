import React, { PropTypes } from 'react';
import getTrelloImageUrl from '../../helpers/getTrelloAvatarUrl';

const propTypes = {
  author: PropTypes.shape({
    avatarHash: PropTypes.string,
    fullName: PropTypes.string,
  }),
  board: PropTypes.shape({
    shortLink: PropTypes.string,
    name: PropTypes.string,
  }),
  date: PropTypes.string,
};

const CreateBoard = ({ author, date, board }) => {
  const { avatarHash, fullName } = author;
  const { shortLink, name } = board;

  return (
    <li className="collection-item avatar">
      <img
        src={getTrelloImageUrl(avatarHash)}
        alt="avatar"
        className="circle"
      />
      <span className="title">{ fullName }</span>&nbsp;
      created&nbsp;
      <a target="_blank" rel="noopener noreferrer" href={`https://trello.com/b/${shortLink}`}>
        { name }
      </a>&nbsp;
      <small>{ date }</small>
    </li>
  );
};

CreateBoard.propTypes = propTypes;

export default CreateBoard;
