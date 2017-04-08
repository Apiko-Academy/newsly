import React, { PropTypes } from 'react';

const propTypes = {
  author: PropTypes.shape({
    avatarHash: PropTypes.string,
    fullName: PropTypes.string,
  }),
  card: PropTypes.shape({
    name: PropTypes.string,
  }),
  board: PropTypes.shape({
    name: PropTypes.string,
    shortLink: PropTypes.string,
  }),
  text: React.PropTypes.string,
  date: React.PropTypes.string,
};

const CommentCard = (props) => {
  const { author, card, text, date, board } = props;
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
      <span className="title">
        <span>{ author.fullName }</span>&nbsp;
        on <u>{ card.name }:</u>
      </span>
      <blockquote>{ text }</blockquote>
      <small>{ date } - on board&nbsp;
        <a target="_blank" rel="noopener noreferrer" href={`https://trello.com/b/${board.shortLink}`}>
          { board.name }
        </a>
      </small>
    </li>
  );
};

CommentCard.propTypes = propTypes;

export default CommentCard;
