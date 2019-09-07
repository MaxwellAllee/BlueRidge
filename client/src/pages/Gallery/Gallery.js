import React, { Component } from 'react';

import Gall from '../../components/Gall/Gall'

// Get a reference to the storage service, which is used to create references in your storage bucket

class Gallery extends Component {
 

  state = {
    isLoading: true,
    error: "",
    mounted:false,
    currentPage : 'gallery'
  }

  render() {
    return (
      <div>
        <Gall location={'gallery'}/>
      </div>
    );
  }
}

export default Gallery;