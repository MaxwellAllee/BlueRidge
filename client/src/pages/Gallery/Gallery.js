import React, { Component } from 'react';
import API from '../../lib/API';
import './assets/css/Gallery.css'


class Gallery extends Component {
 

  state = {
    isLoading: true,
    error: "",
    mounted:false
  }

  componentDidMount() {
    this.props.backChange(true)

  }
  componentWillUnmount(){
    this.props.backChange(false)
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default Gallery;