import React, { Component, PropTypes } from 'react';

const propTypes = {
  handleSelect: PropTypes.func,
  boards: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
};

class Filter extends Component {
  componentDidMount() {
    /* eslint-disable no-undef */
    $('#boardSelectWrap').on('change', '#boardSelect', this.props.handleSelect);
    $('#userSelectWrap').on('change', '#userSelect', this.props.handleSelect);
  }
  render() {
    const { boards, users } = this.props;

    return (
      <div>
        <div id="boardSelectWrap" className="card-panel white row">
          <label htmlFor="boardSelect">Boards</label>
          <select id="boardSelect" multiple>
            <option value="selected" disabled>Choose board</option>
            { boards.map(board => (
              <option value={board.boardId} key={board._id}>
                { board.title }
              </option>
            )) }
          </select>
        </div>
        <div id="userSelectWrap" className="card-panel white row">
          <label htmlFor="userSelect">Users</label>
          <select id="userSelect" multiple>
            <option value="selected" disabled>Choose user</option>
            { users.map(user => (
              <option value={user.id} key={user.id}>
                { user.fullName }
              </option>
            )) }
          </select>
        </div>
      </div>
    );
  }
}

Filter.propTypes = propTypes;

export default Filter;
