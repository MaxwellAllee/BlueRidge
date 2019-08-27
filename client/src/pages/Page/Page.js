import React, { Component } from 'react';
import API from '../../lib/API';
import Gall from '../../components/Gall/Gall'
import TextBox from '../../components/TextBox/TextBox'
import './Page.css'
class Page extends Component {
  state = {
    mounted :false,
    currentPage:this.props.location.pathname.split('/')[2],
    pageInfo:{},
    blog:"",

  }
  componentDidMount(){
    let page = this.props.location.pathname.split('/')[2]
    API.Pages.onePage(page).then((results)=>{
      console.log(results)
      this.setState({pageInfo:results.data, blog: results.data.blog})
    })

  };

  render() {
   
    return (
      <div className='Page'>
        
        <div className='pageGrid'>
          <div></div>
          <div><TextBox text={this.state.blog} /></div>
          <div className='galleryArea'>
            <Gall location={this.props.location.pathname.split('/')[2] }/>
            </div> 
        </div>
      </div>
    );
  }
}

export default Page;
