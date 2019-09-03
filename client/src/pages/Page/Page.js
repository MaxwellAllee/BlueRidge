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
    update:false,
    start: 0,
    finish: 0
  }
  componentDidMount(){
    console.log('mounted')
    this.fetchPage(this.props.location.pathname.split('/')[2],)

  };
  componentWillReceiveProps(nextProps) {
    if(this.props.location !== nextProps.location) {
      console.log('refreshed')
      this.fetchPage(nextProps.location.pathname.split('/')[2],)
    }
  }
  fetchPage=(page)=>{
    API.Pages.onePage(page).then((results)=>{
      this.setState({
        pageInfo:results.data, 
        blog: results.data.blog, 
        update: true,
        start: results.data.startingMiles,
        finish: results.data.finishMiles,
        section: results.data.section
      })
     
    })
  }
  render() {
    const finish = this.state.finish
    const start = this.state.start
    const sect = this.state.section
    return (

      <div className='Page'>
        
        <div className='pageGrid'>
          <div><Map mileage={{start, finish, sect}}/></div>
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
