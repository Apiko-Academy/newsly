import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardHeader } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import styles from './styles';

const propTypes = {
  handleSelect: PropTypes.func,
  boards: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  filter: PropTypes.shape({
    users: PropTypes.arrayOf(PropTypes.string),
    boards: PropTypes.arrayOf(PropTypes.string),
  }),
};

const Filter = (props) => {
  const { boards, users, filter, handleSelect } = props;
  const { users: pickedUsers, boards: pickedBoards } = filter;

  const getUsers = () => users.map(user =>
    <MenuItem value={user.id} primaryText={user.fullName} key={user.id} />);
  const getBoards = () => boards.map(board =>
    <MenuItem value={board.boardId} primaryText={board.title} key={board.boardId} />);

  return (
    <Paper>
      <Card style={styles.cardStyles}>
        <CardHeader title="Boards" style={styles.cardHeaderStyles} />
        <SelectField
          onChange={handleSelect('boards')}
          value={pickedBoards}
          style={styles.selectFieldStyles}
          multiple
        >
          { getBoards() }
        </SelectField>
      </Card>
      <Card style={styles.cardStyles}>
        <CardHeader title="Users" style={styles.cardHeaderStyles} />
        <SelectField
          style={styles.selectFieldStyles}
          onChange={handleSelect('users')}
          value={pickedUsers}
          multiple
        >
          { getUsers() }
        </SelectField>
      </Card>
    </Paper>
  );
};

Filter.propTypes = propTypes;

export default Filter;
