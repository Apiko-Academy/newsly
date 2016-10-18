import React from 'react';
import axios from 'axios';

class AddMemberToBoard extends React.Component {
  constructor(props) {
    super(props);
    this.memberAdded = '';
    axios.get(`/api/users/`)
      .then((users) => {
        this.memberAdded = users.data.filter(m => m.id === this.props.idMemberAdded)[0].fullName;
      });
  }
  render() {
    return (
      <li className="collection-item avatar">
        <img
          src={this.props.author.avatarHash ?
          `http://trello-avatars.s3.amazonaws.com/${this.props.author.avatarHash}/50.png` :
          `img/default_user_icon.png`}
          alt="avatar" className="circle"
        />
        <span className="title">
          {this.props.author.fullName} added {this.memberAdded} to&nbsp;
          <a target="_blank" rel="noopener noreferrer" href={`https://trello.com/b/${this.props.board.shortLink}`}>
            {this.props.board.name}
          </a>
        </span>
        <small>
          {this.props.date}
        </small>
      </li>
    );
  }
}

AddMemberToBoard.propTypes = {
  idMemberAdded: React.PropTypes.string,
  author: React.PropTypes.object,
  board: React.PropTypes.object,
  date: React.PropTypes.string,
};

export default AddMemberToBoard;
