import React from 'react';


class Button extends React.Component{
  alertMe() {
    alert('Alert me!')
  }

  render() {
    return (
      <button onClick={this.alertMe.bind(this)} style={this.props.style}>{this.props.children}</button>
    )
  }
}

export default Button;
