import React from 'react';

const CommentCard = props => (
  <li className="collection-item avatar">
    <img
      src={props.author.avatarHash ?
      `http://trello-avatars.s3.amazonaws.com/${props.author.avatarHash}/50.png` :
      `img/default_user_icon.png`}
      alt="avatar" className="circle"
    />
    <span className="title">
      <span>{props.author.fullName}</span>&nbsp;
      on <u>{props.card.name}:</u>
    </span>
    <blockquote>{props.text}</blockquote>
    <small>{props.date} - on board&nbsp;
      <a target="_blank" rel="noopener noreferrer" href={`https://trello.com/b/${props.board.shortLink}`}>
        {props.board.name}
      </a>
    </small>
  </li>
);

CommentCard.propTypes = {
  author: React.PropTypes.object,
  card: React.PropTypes.object,
  board: React.PropTypes.object,
  text: React.PropTypes.string,
  date: React.PropTypes.string,
};

export default CommentCard;
