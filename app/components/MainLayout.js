/* eslint-disable no-undef, no-else-return, react/forbid-prop-types */
import React, { Component } from 'react';
import axios from 'axios';
import update from 'react-addons-update';
import qsp from 'query-string-parser';
import Navbar from './Navbar';
import Filter from './Filter';
import Action from './Action';

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      currentUser: {},
      users: [],
      boards: [],
      actions: [],
      filter: {
        users: [],
        boards: [],
      },
    };
    axios.get(`/api/boards`)
      .then((boards) => {
        this.setState({
          boards: boards.data,
        });
        $('#boardSelect').material_select();
        return axios.get(`/api/actions`)
          .then((actions) => {
            this.setState({
              actions: actions.data,
            });
            return axios.get(`/api/users`)
              .then((users) => {
                this.setState({
                  users: users.data,
                });
                $('#userSelect').material_select();
                return axios.get(`/api/users/me`)
                  .then((me) => {
                    this.setState({
                      currentUser: me.data,
                    });
                  }).catch(err => console.error(`ERR: fetching current user data error - ${err.message}`));
              }).catch(err => console.error(`ERR: fetching users data error - ${err.message}`));
          }).catch(err => console.error(`ERR: fetching actions data error - ${err.message}`));
      }).catch(err => console.error(`ERR: fetching boards data error - ${err.message}`));
  }
  handleSelect(event) {
    if (event.target.id === 'boardSelect') {
      this.setState({
        filter: update(this.state.filter, {
          boards: { $set:
            Array.prototype.map.call(event.target.selectedOptions, opt => opt.value) } }),
      });
    } else if (event.target.id === 'userSelect') {
      this.setState({
        filter: update(this.state.filter, {
          users: { $set:
            Array.prototype.map.call(event.target.selectedOptions, opt => opt.value) } }),
      });
    }
    const query = qsp.toQuery(this.state.filter);
    axios.get(`/api/actions/?${query}`)
      .then((actions) => {
        this.setState({
          actions: actions.data,
        });
      })
      .catch(err => console.error(`ERR: getting filtered actions error - ${err.message}`));
    axios.get(`/api/boards/?${query}`)
      .then((boards) => {
        this.setState({
          boards: boards.data,
        });
        if (event.target.id === 'userSelect') {
          $('#boardSelect').material_select();
        }
      })
      .catch(err => console.error(`ERR: getting filtered boards error - ${err.message}`));
    axios.get(`/api/users/?${query}`)
      .then((users) => {
        this.setState({
          users: users.data,
        });
        if (event.target.id === 'boardSelect') {
          $('#userSelect').material_select();
        }
      })
      .catch(err => console.error(`ERR: getting filtered users error - ${err.message}`));
  }
  render() {
    const { currentUser, users, boards, actions } = this.state;

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
              handleSelect={this.handleSelect}
              users={users}
              boards={boards}
            />
          </div>
          <div className="col s9">
            <h1 className="mainHeader center">news feed</h1>
            <ul className="collection">
              {actions.map(a => (
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
  }
}

export default MainLayout;
