import React from "react";
import './TextBox.css'
function TextBox(props){

    return (
      <div className='TextBox'>
        <div className='jumbotron'>
          <h2>Notes for {props.name}:</h2>
          <div className='content'>
            <p>{props.text.split('<p>').map(text =><p> {text}</p>)}</p>
          </div>

        </div>
      </div>
    )
  }

export default TextBox;
