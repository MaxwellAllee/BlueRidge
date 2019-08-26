import React, { Component } from 'react';

import './assets/css/Gallery.css'
import Gall from '../../components/Gall/Gall'

class Gallery extends Component {
 

  state = {
    isLoading: true,
    error: "",
    mounted:false
  }

  render() {
    return (
      <div>
        <Gall/>
      </div>
    );
  }
}

export default Gallery;