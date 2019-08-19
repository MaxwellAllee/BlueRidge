import React, { Component } from 'react';
import API from '../../lib/API';
import './Gall.css'
import Modal from 'react-modal';
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
class Gall extends Component {
  state = {
    photos: {},
    mainPhoto: "",
    clickedPhoto:"",
    modalIsOpen: false
  };

  componentDidMount() {
    API.Photos.allPhotos().then(res => {
      console.log(res.data)
      this.setState({ photos: res.data, mainPhoto:res.data[0].photoName, clickedPhoto:res.data[0].photoName })
    })
  }
  hoverAction = photo => {
    this.setState({mainPhoto:photo})
  }
  handleSubmit = event => {

  }
  switchBack =()=>{
    this.setState({mainPhoto:this.state.clickedPhoto})
  }
  selectThis =(photo)=>{
    this.setState({clickedPhoto:photo})
  }
  openModal=()=> {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal=()=> {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal=()=> {
    this.setState({modalIsOpen: false});
  }
  render() {
    let photos = this.state.photos
    return (
      <div className='Gall'>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <img src={`uploads/${this.state.mainPhoto}`} onClick={this.openModal} className="mainPhoto" alt="main photo" />
        </Modal>
        <div class="gallGrid">
        {photos.length ? (photos.map(filez => {
          return (


            <div>
              <div>
                <img src={`uploads/${filez.photoName}`} className="gallPhoto" onMouseOver={()=>{this.hoverAction(filez.photoName)}} onMouseOut={this.switchBack} onClick={()=>{this.selectThis(filez.photoName)}} alt={filez._id} />
              </div>

            </div>)
        })) : (
            <h3>No Photos!</h3>
          )}
        
          <div class="item1"></div>
          <div class="item2"></div>
          <div class="item3"></div>
          <div class="focus"><img src={`uploads/${this.state.mainPhoto}`} onClick={this.openModal} className="mainPhoto" alt="main photo" /></div>
          

        </div>
      </div>
    )
  }
}

export default Gall;

