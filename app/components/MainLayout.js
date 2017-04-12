/* eslint-disable no-undef, no-else-return, react/forbid-prop-types */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Navbar from './Navbar';
import Filter from './Filter';
import Action from './Action';
import * as trelloActions from '../actions';

const propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  users: PropTypes.array,
  boards: PropTypes.array,
  actionsList: PropTypes.array,
  currentUser: PropTypes.object,
  filter: PropTypes.object,
};

const MainLayout = (props) => {
  const { currentUser, users, boards, actionsList, actions, filter } = props;
  const { updateFilters, fetchAllData } = actions;

  const handleSelect = type =>
    (event, index, value) => {
      const updatedFilter = Object.assign({}, filter, {
        [type]: value,
      });

      updateFilters(updatedFilter);
    };

  const getActionsList = () => actionsList.map(a => (
    <Action
      key={a._id}
      type={a.type}
      author={a.author}
      users={users}
      data={a.data}
      date={a.date}
    />
  ));

  return (
    <div>
      <Navbar
        fetchAllData={fetchAllData}
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
            { getActionsList() }
          </ul>
        </div>
      </div>
    </div>
  );
};

MainLayout.propTypes = propTypes;

const mapStateToProps = ({ users, user, boards, actions: actionsList, filter }) => ({
  users,
  boards,
  actionsList,
  currentUser: user,
  filter,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(trelloActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
