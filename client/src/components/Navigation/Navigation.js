import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import './Nav.css';
import AuthContext from '../../contexts/AuthContext';
import AuthDropdown from '../../components/AuthDropdown/AuthDropdown';
import API from '../../lib/API';
import logo from './icon1.png'
class Navigation extends Component {
  static contextType = AuthContext;

  state = {
    collapsed: true,
    count: 1,
    redirect: this.props.test,
    availablePages:[]
  }
  componentDidMount (){
    API.Pages.allPages().then(res => {
      let holder = res.data.map(pages => pages.pageName)
      
      this.setState({ availablePages: res.data.map(pages => pages.pageName) });

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
      this.setState({count : 1})
      this.props.click(true)
      setTimeout(()=>{console.log(this.props.test)},5000)
    }
    else {
      this.setState({ count: this.state.count + 1 })
    }
    
  }
  render() {
    const { user } = this.context;
    // const { collapsed } = this.state;
    // const {styleUpdate} = this.state;
    // const targetClass = `collapse navbar-collapse ${!collapsed && 'show'}`;
    // const togglerClass = `navbar-toggler ${collapsed && 'collapsed'}`;

    return (
      <div className='Navigation'>
       
        <Route exact path="/" render={() => (
          this.props.test ? (
            <Redirect to="/login" />
            
          ):(null)
        )} />
        {/* style={{height: user && "255px"}} */}
        <nav className='navbar navbar-expand-lg mb-3'className={user&&'loggedIn'} >
          <div className="grid-container">
            <div className="grid-item"></div>
            <div className="grid-item placement">
              <div className="inner-grid">
                <div className="inner-grid-item"><Link className='nav-link' to='/'>Home</Link></div>
                <div className="inner-grid-item"><Link className='nav-link' to='/gallery'>Gallery</Link></div>
                <div className="inner-grid-item"><img src={logo} alt="icon" className="icon" onClick={this.login} /></div>
                <div className="inner-grid-item"><a href="http://google.com">Latest Update</a></div>
                <div className="inner-grid-item"><a href="http://google.com">Archive</a></div>
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
