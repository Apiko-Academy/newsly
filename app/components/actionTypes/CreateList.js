import React from 'react';

const CreateList = props => (
  <li className="collection-item avatar">
    <img
      src={props.author.avatarHash ?
      `http://trello-avatars.s3.amazonaws.com/${props.author.avatarHash}/50.png` :
      `img/default_user_icon.png`}
      alt="avatar" className="circle"
    />
    <span className="title">{props.author.fullName}</span>&nbsp;
    added <strong>{props.list.name}</strong> to&nbsp;
    <a target="_blank" rel="noopener noreferrer" href={`https://trello.com/b/${props.board.shortLink}`}>
      {props.board.name}
    </a> board
    <br />
    <small>{props.date}</small>
  </li>
);

CreateList.propTypes = {
  author: React.PropTypes.object,
  board: React.PropTypes.object,
  list: React.PropTypes.object,
  date: React.PropTypes.string,
};

export default CreateList;
