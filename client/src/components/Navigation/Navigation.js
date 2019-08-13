import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import './Nav.css';
import AuthContext from '../../contexts/AuthContext';
import AuthDropdown from '../../components/AuthDropdown/AuthDropdown';
// import Test from '../../components/test/test'
import logo from './icon1.png'
class Navigation extends Component {
  static contextType = AuthContext;

  state = {
    collapsed: true,
    count: 1,
    redirect: this.props.test,
   
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
    console.log(this.context.user)
    if (this.state.count === 3) {
      this.setState({count :1})
      this.props.click(true)

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
        <nav className='navbar navbar-expand-lg mb-3'style={{height: user && "255px"}}>
          <div className="grid-container">
            <div className="grid-item"></div>
            <div className="grid-item placement">
              <div className="inner-grid">
                <div className="inner-grid-item"><Link className='nav-link' to='/'>Home</Link></div>
                <div className="inner-grid-item"><a href="http://google.com">Gallery</a></div>
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
