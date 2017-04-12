import React, { PropTypes } from 'react';
import getTrelloImageUrl from '../../helpers/getTrelloAvatarUrl';

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
  attachment: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  date: PropTypes.string,
};

const DeleteAttachment = (props) => {
  const { author, attachment, card, board, date } = props;
  const { avatarHash, fullName } = author;

  return (
    <li className="collection-item avatar">
      <img
        src={getTrelloImageUrl(avatarHash)}
        alt="avatar" className="circle"
      />
      <span className="title">
        { fullName } removed attachment <u>{ attachment.name }</u>&nbsp;
        from <u>{ card.name }</u>
      </span><br />
      <small>{ date } - on board&nbsp;
        <a target="_blank" rel="noopener noreferrer" href={`https://trello.com/b/${board.shortLink}`}>
          { board.name }
        </a>
      </small>
    </li>
  );
};

DeleteAttachment.propTypes = propTypes;

export default DeleteAttachment;
