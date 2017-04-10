/* eslint-disable no-undef, no-else-return, react/forbid-prop-types */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Navbar from './Navbar';
import Filter from './Filter';
import Action from './Action';
import * as actions from '../actions';

const propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  users: PropTypes.array,
  boards: PropTypes.array,
  trelloActions: PropTypes.array,
  currentUser: PropTypes.object,
  filter: PropTypes.object,
};

const MainLayout = (props) => {
  const { currentUser, users, boards, trelloActions, actions: { updateFilters }, filter } = props;

  const handleSelect = type =>
    (event, index, value) => {
      const updatedFilter = Object.assign({}, filter, {
        [type]: value,
      });

      updateFilters(updatedFilter);
    };

  return (
    <div>
      <Navbar
        displayName={currentUser.displayName}
        avatarUrl={currentUser.avatarUrl}
      />
      <div className="row">
        <div className="col s3">
          <h1 className="mainHeader center">news filter</h1>
          <Filter
            handleSelect={handleSelect}
            users={users}
            boards={boards}
            filter={filter}
          />
        </div>
        <div className="col s9">
          <h1 className="mainHeader center">news feed</h1>
          <ul className="collection">
            { trelloActions.map(a => (
              <Action
                key={a._id}
                type={a.type}
                author={a.author}
                data={a.data}
                date={a.date}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

MainLayout.propTypes = propTypes;

const mapStateToProps = ({ users, user, boards, actions: trelloActions, filter }) => ({
  users,
  boards,
  trelloActions,
  currentUser: user,
  filter,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
