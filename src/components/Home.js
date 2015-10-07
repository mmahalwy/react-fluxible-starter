import React from 'react';

const style = require('styles/Home.scss');

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className={style.homePicture}>
          <div className={style.heroCopy}>
            <h1>Find the Best Things to Do</h1>
            <h2>Choose from <strong>Thousands</strong> of Activities in <strong>20+</strong> </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
// https://dxvgidz67iahm.cloudfront.net/assets/home/v3/home_2-a2a74d3abb5c9b650cc023d77f213a9e.jpg
