import React, { Component } from 'react';

class test extends Component {
  state = {

  };


  render() {
    const { email, password } = this.state;

    return (
        <div>
            
            {this.props.test}
            <button onClick={this.props.anotherTest}>click</button>
        </div>
    )}
}

export default test;

