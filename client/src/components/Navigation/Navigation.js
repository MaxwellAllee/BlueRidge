import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import './Nav.css';
import AuthContext from '../../contexts/AuthContext';
import AuthDropdown from '../../components/AuthDropdown/AuthDropdown';
import logo from './icon1.png'
import API from '../../lib/API';
import Archive from '../Archive/Archive'

class Navigation extends Component {
  static contextType = AuthContext;

  state = {
    collapsed: true,
    count: 1,
    redirect: this.props.test,
    pageNames:[],
    latestPage:''
  }
  componentDidMount(){
    API.Pages.sortPages().then((results)=>{
      this.setState({availablePages:results.availablePages, pageNames:results.pageNames,latestPage : results.pageNames[0]})
    })
    
  }
  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }

  login = () => {
    console.log(this.state.count)
    if (this.state.count === 3) {
      this.setState({ count: 1 })
      this.props.click(true)
      setTimeout(() => { console.log(this.props.test) }, 5000)
    }
    else {
      this.setState({ count: this.state.count + 1 })
    }

  }
  render() {
    
    const { user } = this.context;
    let latest = '/page/'+this.state.latestPage
    return (
      <div className='Navigation'>

        <Route exact path="/" render={() => (
          this.props.test ? (
            <Redirect to="/login" />

          ) : (null)
        )} />
        <nav className='navbar navbar-expand-lg mb-3' id={user && 'loggedIn'} >
          <div className="grid-container">
            <div className="grid-item"></div>
            <div className="grid-item placement">
              <div className="inner-grid">
                <div className="inner-grid-item"><Link className='nav-link' to='/'>Home</Link></div>
                <div className="inner-grid-item"><Link className='nav-link' to='/gallery'>Gallery</Link></div>
                <div className="inner-grid-item"><img src={logo} alt="icon" className="icon" onClick={this.login} /></div>
                <div className="inner-grid-item"><Link className='nav-link' to={latest}>Latest Page</Link></div>
                <div className="inner-grid-item"><Archive {...this.state}/></div>
              </div>
              {user &&
                <div className="inner-grid-item linkColor"><AuthDropdown onClick={this.toggleCollapse} /></div>}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;
