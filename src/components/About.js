import React from 'react';

class About extends React.Component {
  render() {
    const style = require('styles/Home.scss');

    return (
      <div className={style.heroCopy}>
        <h1>This is a really cool about page</h1>
      </div>
    );
  }
}

About.displayName = 'About';

export default About;
