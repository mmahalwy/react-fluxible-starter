import React from 'react';


class Button extends React.Component{
  alertMe() {
    alert('Alert me!')
  }

  render() {
    return (
      <button onClick={this.alertMe.bind(this)}>{this.props.children}</button>
    )
  }
}

export default Button;
