import React from "react";
import './TextBox.css'
function TextBox(props){

    return (
      <div className='TextBox'>
        <div className='jumbotron'>
          <h2>Notes for {props.name}:</h2>
          <div className='content'>
            {props.text}
          </div>

        </div>
      </div>
    )
  }

export default TextBox;
