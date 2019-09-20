import React, { Component } from 'react';
import './NotFound.css'

class NotFound extends Component {
  componentDidMount(){
    this.props.back('four')
  }
  componentWillUnmount(){
    this.props.back('home')
  }
  render() {
    return (
      <div className='NotFound'>
        <h1>Oops!</h1>
        <h2 className="nF">Page Not Found</h2>
        <h3> Go to the home to fix the flat</h3>
      </div>
    )
  }
};

export default NotFound