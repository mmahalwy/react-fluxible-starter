import React from 'react';
import { link } from 'react-router';

class Nav extends React.Component {
  render() {
    const selected = this.props.selected;
    const links = this.props.links;

    const linkHTML = Object.keys(links).map((name) => {
      var className = '';
      var link = links[name];

            if (selected === name) {
                className = 'pure-menu-selected';
            }
            return;
            // return (
            //     <li className={className} key={link}>
            //         <NavLink routeName={link.page} activeStyle={{backgroundColor: '#eee'}}>{link.title}</NavLink>
            //     </li>
            // );
        });

    return (
      <ul className="pure-menu pure-menu-open pure-menu-horizontal">
        {linkHTML}
      </ul>
    );
  }
}

Nav.defaultProps = {
  selected: 'home',
  links: {}
};

export default Nav;
