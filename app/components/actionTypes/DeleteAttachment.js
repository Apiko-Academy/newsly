import React from 'react';

const DeleteAttachment = props => (
  <li className="collection-item avatar">
    <img
      src={props.author.avatarHash ?
      `http://trello-avatars.s3.amazonaws.com/${props.author.avatarHash}/50.png` :
      `img/default_user_icon.png`}
      alt="avatar" className="circle"
    />
    <span className="title">
      {props.author.fullName} removed attachment <u>{props.attachment.name}</u>&nbsp;
      from <u>{props.card.name}</u>
    </span><br />
    <small>{props.date} - on board&nbsp;
      <a target="_blank" rel="noopener noreferrer" href={`https://trello.com/b/${props.board.shortLink}`}>
        {props.board.name}
      </a>
    </small>
  </li>
);

DeleteAttachment.propTypes = {
  author: React.PropTypes.object,
  card: React.PropTypes.object,
  board: React.PropTypes.object,
  attachment: React.PropTypes.object,
  date: React.PropTypes.string,
};

export default DeleteAttachment;
