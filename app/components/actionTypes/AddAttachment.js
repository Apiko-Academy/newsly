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

const AddAttachment = (props) => {
  const { author, attachment, card, board, date } = props;
  const { avatarHash, fullName } = author;

  return (
    <li className="collection-item avatar">
      <img
        src={getTrelloImageUrl(avatarHash)}
        alt="avatar" className="circle"
      />
      <span className="title">
        { fullName } attached&nbsp;
          <a target="_blank" rel="noopener noreferrer" href={attachment.url}>
            { attachment.name }
          </a>&nbsp;
        to { card.name }
      </span><br />
      <small>{ date } - on board&nbsp;
        <a target="_blank" rel="noopener noreferrer" href={`https://trello.com/b/${board.shortLink}`}>
          { board.name }
        </a>
      </small>
    </li>
  );
};

AddAttachment.propTypes = propTypes;

export default AddAttachment;
