import React, { Component } from 'react';
import './TextBox.css'
class TextBox extends Component {
  state = {
    text: ""
  };


  render() {

    return (
      <div className='TextBox'>
        <div className='jumbotron'>
          <h2>Notes for the day:</h2>
          <div className='content'>
            {this.props.text}
          </div>

        </div>
      </div>
    )
  }
}

export default TextBox;
