import React, { Component } from 'react';
import PhotoForm from '../../components/PhotoForm/PhotoForm'


class addPhoto extends Component {
  render() {
    return (
      <div className='addPhoto'>
       <h1>Upload Image</h1>
       <PhotoForm/>
      </div>
    );
  }
}

export default addPhoto;