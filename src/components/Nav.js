import React from 'react';
import { Link } from 'react-router';

const style = require('styles/Nav.scss');

class Nav extends React.Component {
  render() {
    return (
      <div className={style.navbar}>
        <div className="container">
          <ul className={`${style.navigationLeft} ${style.navbarList}`}>
            <li>
              <Link to="/" className={style.logo}>
              </Link>
            </li>
          </ul>
          <ul className={`${style.navigationRight} ${style.navbarList}`}>
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
