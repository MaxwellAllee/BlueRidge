import React, { Component } from 'react';
import API from '../../lib/API';
import Gall from '../../components/Gall/Gall'
import TextBox from '../../components/TextBox/TextBox'
import Map from '../../components/Map/Map'
import './Page.css'
class Page extends Component {
  state = {
    mounted :false,
    pageInfo:{},
    pageName:'',
    blog:"",
    count:0,
    update:false
  }
  componentDidMount(){
    this.fetchPage(this.props.location.pathname.split('/')[2],)

  };
  componentWillReceiveProps(nextProps) {
    if(this.props.location !== nextProps.location) {
      this.fetchPage(nextProps.location.pathname.split('/')[2],)
    }
  }
  fetchPage=(page)=>{
    API.Pages.onePage(page).then((results)=>{
      
      this.setState({pageInfo:results.data, blog: results.data.blog, update: true})
     
    })
  }
  render() {


 
    return (
      <div className='Page'>
        
        <div className='pageGrid'>
          <div><Map mileage={[this.state.pageInfo.startingMiles,this.state.pageInfo.finishMiles]}/></div>
          <div><TextBox text={this.state.blog} /></div>
          <div className='galleryArea'>
            <Gall location={this.props.location.pathname.split('/')[2]}/>
            </div> 
        </div>
      </div>
    );
  }
}

export default Page;
