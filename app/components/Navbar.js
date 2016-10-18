import React from 'react';

const Navbar = props => (
  <div className="navbar-fixed">
    <nav className="white">
      <div className="nav-wrapper">
        <span className="brand-logo center">Trello News Feed</span>
        <ul className="right">
          <li>
            <span className="currentUser">
              {props.displayName}
            </span>
          </li>
          <li>
            <img
              className="currentUserImg circle"
              src={props.avatarUrl}
              alt={props.displayName}
            />
          </li>
        </ul>
        <ul className="left">
          <li>
            <a href="/sync">
              <i className="material-icons large i">replay</i>
            </a>
          </li>
          <li>
            <a href="/logout">
              <i className="material-icons large i">power_settings_new</i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);


Navbar.propTypes = {
  displayName: React.PropTypes.string,
  avatarUrl: React.PropTypes.string,
};

export default Navbar;
