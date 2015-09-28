import React from 'react';

class Home extends React.Component {
    render() {
      console.log(this.props);
        return (
            <div>
                <h2>Home</h2>
                <p>Welcome to the site!</p>
            </div>
        );
    }
}

export default Home;
