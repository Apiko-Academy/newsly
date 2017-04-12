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
  list: PropTypes.shape({
    name: PropTypes.string,
  }),
  date: PropTypes.string,
};

const CreateCard = (props) => {
  const { author, card, list, date } = props;
  const { avatarHash, fullName } = author;

  return (
    <li className="collection-item avatar">
      <img
        src={getTrelloImageUrl(avatarHash)}
        alt="avatar" className="circle"
      />
      <span className="title">{ fullName }
        added { card.name } to { list.name }
      </span><br />
      <small>{ date }</small>
    </li>
  );
};

CreateCard.propTypes = propTypes;

export default CreateCard;
