import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import API from '../../lib/API';
import TokenStore from '../../lib/TokenStore';
import AuthContext from '../../contexts/AuthContext';
import Navigation from '../../components/Navigation/Navigation';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import Login from '../../pages/Login/Login';
import Secret from '../../pages/Secret/Secret';
import Home from '../../pages/Home/Home';
import addPhoto from '../../pages/addPhoto/addPhoto'
import NotFound from '../../pages/NotFound/NotFound';
import Gallery from '../../pages/Gallery/Gallery'
import addPage from '../../pages/addPage/addPage'
import './App.css';
// import { animationFrameScheduler } from 'rxjs';
import globalBackground from './backgroundImage/background.jpg'
import nightBackground from './backgroundImage/night1.jpg'
class App extends Component {
  
  constructor(props) {
    super(props);

    this.handleLogin = (user, authToken) => {
      TokenStore.setToken(authToken);
      this.setState(prevState => ({ auth: { ...prevState.auth, user, authToken } }));
    };

    this.handleLogout = () => {
      TokenStore.clearToken();
      this.setState(prevState => ({ auth: { ...prevState.auth, user: undefined, authToken: undefined } }));
    }

    this.state = {
      auth: {
        user: undefined,
        authToken: TokenStore.getToken(),
        onLogin: this.handleLogin,
        onLogout: this.handleLogout,
        
        
      },
      another:"test",
      test:false,
      click: (change)=>{
        console.log(change)
        this.setState({test:change})
        
      },
      backChange:(change)=>{
        console.log(change, "clicked")
        if(change){
          this.setState({background:nightBackground})
        }else{
          this.setState({background:globalBackground})
        }
      },
      background: globalBackground
    }
  }
  
  
  componentDidMount() {
    const { authToken } = this.state.auth;
    if (!authToken) return;

    API.Users.getMe(authToken)
      .then(response => response.data)
      .then(user => this.setState(prevState => ({ auth: { ...prevState.auth, user } })))
      .catch(err => console.log(err));
  }

  render() {
    const hiddenLoad ={'backgroundImage' : `url(${nightBackground})`, 'noRepeat': '-9999px -9999px'}
    const bStyle = {'backgroundImage': `url(${this.state.background})`}
    return (
      <AuthContext.Provider value={this.state.auth}>
        <div className='App' style={bStyle}>
          <Navigation {...this.state} />
          <div className='container'>
            <Switch>

              <Route   path='/login' render={(props)=><Login {...props}{...this.state}/>} />
              <Route exact path='/' component={Home} />

              <PrivateRoute path='/secret' component={Secret} />
              <PrivateRoute path='/addphoto' component={addPhoto} />
              <PrivateRoute path='/addpage' component={addPage} />
              <Route exact path='/gallery' component={Gallery}/>
              <Route component={NotFound} />
            </Switch>
          </div>
          <div style={hiddenLoad}></div>
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
