import React, { Component } from 'react';
import PhotoForm from '../../components/PhotoForm/PhotoForm'


class addPhoto extends Component {
  render() {
    return (
      <div className='Home'>
       <h1>Uploade Image</h1>
       <PhotoForm/>
      </div>
    );
  }
}

export default addPhoto;