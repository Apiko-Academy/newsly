import React, { PropTypes } from 'react';

const propTypes = {
  author: PropTypes.shape({
    avatarHash: PropTypes.string,
    fullName: PropTypes.string,
  }),
  card: PropTypes.shape({
    name: PropTypes.string,
  }),
  list: PropTypes.shape({
    name: PropTypes.string,
  }),
  date: React.PropTypes.string,
};

const CreateCard = (props) => {
  const { author, card, list, date } = props;
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
      <span className="title">{ author.fullName }
        added { card.name } to { list.name }
      </span><br />
      <small>{ date }</small>
    </li>
  );
};

CreateCard.propTypes = propTypes;

export default CreateCard;
