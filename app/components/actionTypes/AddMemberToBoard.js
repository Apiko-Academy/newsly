import React, { Component, PropTypes } from 'react';
import axios from 'axios';

const propTypes = {
  idMemberAdded: PropTypes.string,
  author: PropTypes.shape({
    avatarHash: PropTypes.string,
    fullName: PropTypes.string,
  }),
  board: PropTypes.shape({
    shortLink: PropTypes.string,
    name: PropTypes.string,
  }),
  date: PropTypes.string,
};

class AddMemberToBoard extends Component {
  constructor(props) {
    super(props);
    this.memberAdded = '';
    axios.get(`/api/users/`)
      .then((users) => {
        this.memberAdded = users.data.filter(m => m.id === this.props.idMemberAdded)[0].fullName;
      });
  }

  render() {
    const { author, board, date } = this.props;
    const { avatarHash } = author;
    const avatarUrl = avatarHash ?
      `http://trello-avatars.s3.amazonaws.com/${avatarHash}/50.png` :
      `img/default_user_icon.png`;

    return (
      <li className="collection-item avatar">
        <img
          src={avatarUrl}
          alt="avatar"
          className="circle"
        />
        <span className="title">
          { author.fullName } added { this.memberAdded } to&nbsp;
          <a target="_blank" rel="noopener noreferrer" href={`https://trello.com/b/${board.shortLink}`}>
            { board.name }
          </a>
        </span>
        <small>
          { date }
        </small>
      </li>
    );
  }
}

AddMemberToBoard.propTypes = propTypes;

export default AddMemberToBoard;
