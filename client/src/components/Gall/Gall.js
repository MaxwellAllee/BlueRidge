import React, { Component } from 'react';
import API from '../../lib/API';
import './Gall.css'
import Modal from 'react-modal';
import moment from 'moment'
import AuthContext from '../../contexts/AuthContext';
const test = process.env.test
const customStyles = {

  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
class Gall extends Component {
  static contextType = AuthContext;
  state = {
    photos: {},
    mainPhoto: "",
    clickedPhoto: "",
    modal: "",
    modalIsOpen: false,
    newest: false,
    sectionPhoto: true,
    present: false,
    smile:'',
    intial: true
  };

  componentDidMount() {
    this.renderPhotos(this.props.location)
  }
componentWillReceiveProps(nextProps) {
  if(this.props.count !== nextProps.count) {
    this.renderPhotos(this.props.location)
  }
  if(this.props.location !== nextProps.location) {
        this.renderPhotos(nextProps.location)
      }
}

renderPhotos = (location) => {
 
  if (location !== 'gallery') {
    this.setState({ sectionPhoto: false })
  }

  API.Photos.allPhotos(location).then(res => {
    let photoz = res.data

    if (photoz.length) {
      console.log('getting photos')
      this.setState({ photos: photoz, mainPhoto: photoz[photoz.length-1].photoName, clickedPhoto: photoz[photoz.length-1].photoName, present: true })
      this.sort()
    }
    else {

      this.setState({ present: false })
    }
    this.sort()
  })
  
}
handleDelete(id){

  API.Photos.deleted(this.context.authToken, id).then(results => {
    results && this.renderPhotos(this.props.location)
  }
  )
}
hoverAction = photo => {
  this.setState({ mainPhoto: photo })
}
handleSubmit = event => {

}
switchBack = () => {
  this.setState({ mainPhoto: this.state.clickedPhoto })
}
selectThis = (photo) => {
  this.setState({ clickedPhoto: photo })
}
openModal = (photo) => {

  this.setState({ modalIsOpen: true, modal: photo });
}

afterOpenModal = () => {
  // references are now sync'd and can be accessed.
  this.subtitle.style.color = '#f00';
}

closeModal = () => {
  this.setState({ modalIsOpen: false });
}
sort = () => {

  let holder = this.state.photos
if (this.state.newest){
  holder.sort(function (a, b) {
    a = moment(a.createdAt).unix();
    b = moment(b.createdAt).unix();
    console.log(a,b)
    return b-a;
  })}
  else{
    holder.sort(function (a, b) {
    a = moment(a.createdAt).unix();
    b = moment(b.createdAt).unix();
    console.log(a,b)
    return a-b;
  })}
  this.setState({ photos: holder, newest: !this.state.newest })
}
render() {
  let photos = this.state.photos
  const { user } = this.context;
  console.log(test,'this is test')
  return (
    <div className='Gall'>
      {this.state.present && photos[0].photoName ? (
        <div>
          {this.state.pageLoading}
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel=" Modal"
          >

            <img src={`https://firebasestorage.googleapis.com/v0/b/bikeappalachia.appspot.com/o/${this.state.modal}?alt=media`}
              ref={subtitle => this.subtitle = subtitle}
              className="modalPhoto" alt={`Modal of ${this.state.modal}`} />
          </Modal>

          <div id='switch'>
            Sort By: {this.state.newest ? <span onClick={this.sort} className="switch"> Newest</span> :
              <span onClick={this.sort} className="switch"> Oldest</span>}
          </div>
          <div className="gallGrid">

            {this.state.present && photos[0].photoName ? (photos.map(filez => {

              return (
                <div key={filez.id}>
                  <img src={`https://firebasestorage.googleapis.com/v0/b/bikeappalachia.appspot.com/o/${filez.photoName}?alt=media`} className="gallPhoto"
                    onMouseOver={() => { this.hoverAction(filez.photoName) }} onMouseOut={this.switchBack}
                    onClick={() => { this.openModal(filez.photoName) }} alt={filez._id} />
                  {user && <button type="button" className="btn btn-danger" onClick={() => { this.handleDelete(filez.id) }}>Delete</button>}
                </div>
              )
            })) : (
                <h3>No Photos!</h3>
              )}


            {this.state.sectionPhoto && <div className="focus"><img src={`https://firebasestorage.googleapis.com/v0/b/bikeappalachia.appspot.com/o/${this.state.mainPhoto}?alt=media`}
              onClick={() => { this.openModal(this.state.mainPhoto) }} className="mainPhoto"
              alt={`main ${this.state.mainPhoto + Math.floor(Math.random() * 10)}`} /></div>}


          </div></div>) :
        (<div></div>)

      }
    </div>
  )
}
}

export default Gall;

