import React, { Component } from 'react';

export default class HelloWorld extends Component {
  render() {
    const { onClick, color } = this.props;
    return (
      <div className="hello-world" onClick={onClick} style={{color: color}}>Hello World</div>
    );
  }
}

