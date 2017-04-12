import React, { PropTypes } from 'react';

import CommentCard from './actionTypes/CommentCard';
import CreateBoard from './actionTypes/CreateBoard';
import CreateList from './actionTypes/CreateList';
import CreateCard from './actionTypes/CreateCard';
import AddAttachment from './actionTypes/AddAttachment';
import DeleteAttachment from './actionTypes/DeleteAttachment';
import AddMemberToBoard from './actionTypes/AddMemberToBoard';

const propTypes = {
  type: PropTypes.string,
  author: PropTypes.object,
  users: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.shape({
    board: PropTypes.object,
    list: PropTypes.object,
    card: PropTypes.object,
    attachment: PropTypes.object,
    text: PropTypes.string,
    idMemberAdded: PropTypes.string,
  }),
  date: PropTypes.string,
};

const Action = (props) => {
  const { author, date, data, users } = props;
  const { board, list, card, attachment, text, idMemberAdded } = data;

  switch (props.type) {
    case 'commentCard':
      return (<CommentCard
        author={author}
        board={board}
        card={card}
        date={date}
        text={text}
      />);
    case 'createBoard':
      return (<CreateBoard
        board={board}
        author={author}
        date={date}
      />);
    case 'createList':
      return (<CreateList
        author={author}
        board={board}
        list={list}
        date={date}
      />);
    case 'CreateCard':
      return (<CreateCard
        author={author}
        board={board}
        list={list}
        card={card}
        date={date}
      />);
    case 'addAttachmentToCard':
      return (<AddAttachment
        author={author}
        board={board}
        card={card}
        attachment={attachment}
        date={date}
      />);
    case 'deleteAttachmentFromCard':
      return (<DeleteAttachment
        author={author}
        board={board}
        card={card}
        attachment={attachment}
        date={date}
      />);
    case 'addMemberToBoard': {
      const addedMemberName =
        users.filter(m => m.id === idMemberAdded)[0];
      const userName =
        addedMemberName ? `new member(${addedMemberName.fullName})` : 'new member';

      return (<AddMemberToBoard
        author={author}
        board={board}
        addedMemberName={userName}
      />);
    }
    default:
      return <div />;
  }
};

Action.propTypes = propTypes;

export default Action;
