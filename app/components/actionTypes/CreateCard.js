import React from 'react';

const CreateCard = props => (
  <li className="collection-item avatar">
    <img
      src={props.author.avatarHash ?
      `http://trello-avatars.s3.amazonaws.com/${props.author.avatarHash}/50.png` :
      `img/default_user_icon.png`}
      alt="avatar" className="circle"
    />
    <span className="title">{props.author.fullName}
      added {props.card.name} to {props.list.name}
    </span><br />
    <small>{props.date}</small>
  </li>
);

CreateCard.propTypes = {
  author: React.PropTypes.object,
  card: React.PropTypes.object,
  list: React.PropTypes.object,
  date: React.PropTypes.string,
};

export default CreateCard;
