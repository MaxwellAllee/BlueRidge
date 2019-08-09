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
    count: 0,
    redirect: this.props.loginPage,
    test:"monkey",
    anotherTest: ()=> this.setState({test:"lion"})
    
  }
  clicked=()=>{
    this.setState({test:"lion"})
    console.log("clicked")
  }
  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }
  reset = ()=>{
    this.setState({redirect: false})
  }
  login = () => {
    console.log(this.state.count)
    if (this.state.count === 3) {
      
      this.props.switchLogin()
      console.log(this.state.redirect)
    }
    else {
      this.setState({ count: this.state.count + 1 })
    }

  }
  render() {
    const { user } = this.context;
    const { collapsed } = this.state;
    const {styleUpdate} = this.state
    // const targetClass = `collapse navbar-collapse ${!collapsed && 'show'}`;
    // const togglerClass = `navbar-toggler ${collapsed && 'collapsed'}`;
  
    return (
      <div className='Navigation'>
        <Route exact path="/" render={() => (
          this.state.redirect ? (
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
              {user && <div className="grid-item placement whiteOut"><div className="inner-grid-item"></div><div className="inner-grid-item"></div><div className="inner-grid-item"></div><div className="inner-grid-item linkColor"><AuthDropdown onClick={this.toggleCollapse} /></div></div>}
               {this.state.redirect}
              
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;
