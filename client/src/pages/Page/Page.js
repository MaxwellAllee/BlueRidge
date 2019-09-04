import React, { Component } from 'react';
import API from '../../lib/API';
import Gall from '../../components/Gall/Gall'
import TextBox from '../../components/TextBox/TextBox'
import Map from '../../components/Map/Map'
import Stats from '../../components/Stats/Stats'
import './Page.css'
class Page extends Component {
  state = {
    mounted: false,
    pageInfo: {},
    pageName: '',
    blog: "",
    count: 0,
    update: false,
    start: 0,
    finish: 0,
    four04: true
  }
  componentDidMount() {
    this.fetchPage(this.props.location.pathname.split('/')[2])
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      console.log('refreshed')
      this.fetchPage(nextProps.location.pathname.split('/')[2])
    }
  }
  fetchPage = (page) => {
    API.Pages.onePage(page).then((results) => {
      results.data && results.data !== null ? (
        this.setState({
          four04:false,
          pageInfo: results.data,
          pageName: results.data.pageName,
          blog: results.data.blog,
          update: true,
          start: results.data.startingMiles,
          finish: results.data.finishMiles,
          section: results.data.section
        })) :
        (this.setState({ four04: true })
        )

    })
  }
  render() {
    const finish = this.state.finish
    const start = this.state.start
    const sect = this.state.section
    return (

      <div className='Page'>
        {this.state.four04 ? (
          <div className="jumbotron for0for">
            <h2 className="nF">Page Not Found</h2>
            <h3> Go to the home to fix the flat</h3>

          </div>):(
        <div className='pageGrid'>
            <div className="map"><Map mileage={{ start, finish, sect }} style={'height : 75%'}/></div>
            <div className='main'><TextBox name={this.state.pageName} text={this.state.blog}  /></div>
            <div className='stats'><Stats {...this.state.pageInfo}/></div>
            <div className='galleryArea'>
              <Gall location={this.props.location.pathname.split('/')[2]} />
            </div>
          </div>
          )}
      </div>
        );
        }
      }
      
      export default Page;
