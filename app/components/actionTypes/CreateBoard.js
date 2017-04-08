import React, { PropTypes } from 'react';

const propTypes = {
  author: PropTypes.shape({
    avatarHash: PropTypes.string,
    fullName: PropTypes.string,
  }),
  board: PropTypes.shape({
    shortLink: PropTypes.string,
    name: PropTypes.string,
  }),
  date: React.PropTypes.string,
};

const CreateBoard = (author, date, board) => {
  const { avatarHash, fullName } = author;
  const { shortLink, name } = board;
  const avatarUrl = avatarHash ?
    `http://trello-avatars.s3.amazonaws.com/${avatarHash}/50.png` :
    `img/default_user_icon.png`;

  return (
    <li className="collection-item avatar">
      <img
        src={avatarUrl}
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
