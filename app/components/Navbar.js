import React, { PropTypes } from 'react';

const propTypes = {
  displayName: PropTypes.string,
  avatarUrl: PropTypes.string,
};

const Navbar = (props) => {
  const { avatarUrl, displayName } = props;
  return (
    <div className="navbar-fixed">
      <nav className="white">
        <div className="nav-wrapper">
          <span className="brand-logo center">Trello News Feed</span>
          <ul className="right">
            <li>
              <span className="currentUser">
                { displayName }
              </span>
            </li>
            <li>
              <img
                className="currentUserImg circle"
                src={avatarUrl}
                alt={displayName}
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
};

Navbar.propTypes = propTypes;

export default Navbar;
