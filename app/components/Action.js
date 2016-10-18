import React from 'react';

import CommentCard from './actionTypes/CommentCard';
import CreateBoard from './actionTypes/CreateBoard';
import CreateList from './actionTypes/CreateList';
import CreateCard from './actionTypes/CreateCard';
import AddAttachment from './actionTypes/AddAttachment';
import DeleteAttachment from './actionTypes/DeleteAttachment';
import AddMemberToBoard from './actionTypes/AddMemberToBoard';

const Action = (props) => {
  const { author, date } = props;
  const { board, list, card, attachment, text, idMemberAdded } = props.data;
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
    case 'addMemberToBoard':
      return (<AddMemberToBoard
        author={author}
        board={board}
        idMemberAdded={idMemberAdded}
      />);
    default:
      return <div />;
  }
};

Action.propTypes = {
  type: React.PropTypes.string,
  author: React.PropTypes.shape,
  data: React.PropTypes.shape,
  date: React.PropTypes.string,
};

export default Action;
