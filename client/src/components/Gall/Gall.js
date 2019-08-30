import React, { Component} from 'react';
import API from '../../lib/API';
import './Gall.css'
import Modal from 'react-modal';
import moment from 'moment'


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
    modal:"",
    modalIsOpen: false,
    newest: true,
    sectionPhoto: true,
    present:false
  };

  componentDidMount() {
   this.renderPhotos(this.props.location)
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.location !== nextProps.location) {
     
      this.renderPhotos(nextProps.location)
    }
  }
  renderPhotos =(location)=>{
    if(location !== 'gallery'){
      this.setState({sectionPhoto:false})
    }
    API.Photos.allPhotos(location).then(res => {
      let photoz = res.data
      console.log(photoz.length)
      if(photoz.length) {

        console.log(res.data,'photos')
      this.setState({ photos: photoz, mainPhoto:photoz[0].photoName, clickedPhoto:photoz[0].photoName, present: true })}
      else{

        this.setState({present:false})}
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
  openModal=(photo)=> {
    
    this.setState({modalIsOpen: true, modal: photo});
  }
 
  afterOpenModal=()=> {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal=()=> {
    this.setState({modalIsOpen: false});
  }
  sort = ()=>{
    let holder = this.state.photos
    console.log(holder)
      holder.sort(function(a, b) {
       console.log(moment(a.createdAt).unix())
        a = moment(a.createdAt).unix();
        b = moment(a.createdAt).unix();
        return a<b ? -1 : a>b ? 1 : 0;
    })
      this.setState({photos:holder, newest:!this.state.newest})
  }
  render() {
    let photos = this.state.photos
    
    return (
      <div className='Gall'>
        {this.state.pageLoading}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          
          <img src={`/uploads/${this.state.modal}`} 
          ref={subtitle => this.subtitle = subtitle} 
          className="modalPhoto" alt={`Modal of ${this.state.modal}`} />
        </Modal>
        
        <div id='switch'>
          Sort By: {this.state.newest ? <span onClick={this.sort} className="switch"> Oldest</span> : 
          <span onClick={this.sort} className="switch"> Newest </span>}
        </div>
        <div className="gallGrid">
        
        {this.state.present && photos[0].photoName ? (photos.map(filez => {
          
          return (

                <img src={`/uploads/${filez.photoName}`} className="gallPhoto" key={filez.id}
                onMouseOver={()=>{this.hoverAction(filez.photoName)}} onMouseOut={this.switchBack} 
                onClick={()=>{this.openModal(filez.photoName)}} alt={filez._id} />)
        })) : (
            <h3>No Photos!</h3>
          )}
        
          
          {this.state.sectionPhoto && <div className="focus"><img src={`uploads/${this.state.mainPhoto}`} 
          onClick={()=>{this.openModal(this.state.mainPhoto)}} className="mainPhoto" 
          alt={`main ${this.state.mainPhoto + Math.floor(Math.random()*10)}`} /></div>}
          

        </div>
      </div>
    )
  }
}

export default Gall;

