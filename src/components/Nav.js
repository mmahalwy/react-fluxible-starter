import React from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {
  render() {
    return (
      <div className="navbar">
        <div className="container">
          <ul className="navigation-left navbar-list">
            <li>
              <Link to="/" className="logo">
              </Link>
            </li>
          </ul>
          <ul className="navigation-right navbar-list">
            <li>
              <Link to="/about" style={{color: '#fff'}}>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Nav.defaultProps = {
  selected: 'home',
  links: {}
};

export default Nav;
