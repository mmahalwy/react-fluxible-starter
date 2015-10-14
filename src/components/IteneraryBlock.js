import React from 'react';

class IteneraryBlock extends React.Component {
  render() {
    return (
      <div>
        <img src={'https://d2fijpsef22722.cloudfront.net/photos/small/' + this.props.itenerary.main_photo_url} />
        <h2>{this.props.itenerary.name}</h2>
        <p>{this.props.itenerary.description}</p>
      </div>
    );
  }
}

export default IteneraryBlock;
