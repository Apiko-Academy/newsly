import React, { PropTypes } from 'react';

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
  date: React.PropTypes.string,
};

const CreateList = (props) => {
  const { author, board, list, date } = props;
  const { avatarHash } = author;
  const avatarUrl = avatarHash ?
    `http://trello-avatars.s3.amazonaws.com/${avatarHash}/50.png` :
    `img/default_user_icon.png`;

  return (
    <li className="collection-item avatar">
      <img
        src={avatarUrl}
        alt="avatar" className="circle"
      />
      <span className="title">{author.fullName}</span>&nbsp;
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
