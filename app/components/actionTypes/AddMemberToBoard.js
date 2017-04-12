import React, { PropTypes } from 'react';
import getTrelloImageUrl from '../../helpers/getTrelloAvatarUrl';

const propTypes = {
  addedMemberName: PropTypes.string,
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

const AddMemberToBoard = (props) => {
  const { author, board, date, addedMemberName } = props;
  const { avatarHash, fullName } = author;

  return (
    <li className="collection-item avatar">
      <img
        src={getTrelloImageUrl(avatarHash)}
        alt="avatar"
        className="circle"
      />
      <span className="title">
        { fullName } added { addedMemberName } to&nbsp;
        <a target="_blank" rel="noopener noreferrer" href={`https://trello.com/b/${board.shortLink}`}>
          { board.name }
        </a>
      </span>
      <small>
        { date }
      </small>
    </li>
  );
};

AddMemberToBoard.propTypes = propTypes;

export default AddMemberToBoard;
