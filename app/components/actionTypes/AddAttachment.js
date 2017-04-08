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
  attachment: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  date: React.PropTypes.string,
};

const AddAttachment = (props) => {
  const { author, attachment, card, board, date } = props;
  const { avatarHash } = author;
  const avatarUrl = avatarHash ?
    `http://trello-avatars.s3.amazonaws.com/${avatarHash}/50.png` :
    'img/default_user_icon.png';

  return (
    <li className="collection-item avatar">
      <img
        src={avatarUrl}
        alt="avatar" className="circle"
      />
      <span className="title">
        { author.fullName } attached&nbsp;
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
