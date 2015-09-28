import React from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {
  render() {
    return (
      <ul className="pure-menu pure-menu-open pure-menu-horizontal">
        <li>
          <Link to="/about">
            About
          </Link>
        </li>
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
      </ul>
    );
  }
}

Nav.defaultProps = {
  selected: 'home',
  links: {}
};

export default Nav;
