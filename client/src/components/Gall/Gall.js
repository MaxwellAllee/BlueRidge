import React, { Component } from 'react';
import API from '../../lib/API';
class Gall extends Component {
  state = {
    photos: {}
  };

  componentDidMount() {
    API.Photos.allPhotos().then(res => {
      console.log(res.data)
      this.setState({ photos: res.data })
    })
  }

  handleSubmit = event => {

  }

  render() {
    let photos = this.state.photos
    return (
      <div className='Gall'>
        {photos.length ? (photos.map(filez => {
          return (


            <div>
              <div>
                <img src={`uploads/${filez.photoName}`} alt={filez._id} />
              </div>

            </div>)
        })) : (
            <h3>No Photos!</h3>
          )}
      </div>
    )
  }
}

export default Gall;

