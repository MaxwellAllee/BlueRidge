import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import moment from 'moment'
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
import Page from '../../pages/Page/Page'
import './App.css';
import globalBackground from './backgroundImage/background.jpg'
import nightBackground from './backgroundImage/night1.jpg'
import fourofour from './backgroundImage/404.jpg'
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
      another: "test",
      test: false,
      click: (change) => {
        this.setState({ test: change })

      },
      backChange: (change) => {
        if (change === 'night') this.setState({ background: nightBackground })
        else if (change === 'home') this.setState({ background: globalBackground })
        else if (change === 'four') this.setState({ background: fourofour })
      },
      background: globalBackground,
    }
  }


  componentDidMount() {
    this.rest()
    const { authToken } = this.state.auth;
    if (!authToken) return;

    API.Users.getMe(authToken)
      .then(response => response.data)
      .then(user => this.setState(prevState => ({ auth: { ...prevState.auth, user } })))
      .catch(err => console.log(err));


  }
  rest = () => {
    API.Pages.allPages().then(pages => {
      let holder = pages.data

      holder.sort(function (a, b) {
        a = moment(a.pageName).unix();
        b = moment(b.pageName).unix();

        return a > b ? -1 : a < b ? 1 : 0;
      })

      let names = holder.map(pages => pages.pageName)
      this.setState({ pageNames: names, availablePages: holder })

    })
  }
  render() {
    const bStyle = { 'backgroundImage': `url(${this.state.background})` }
    const hiddenLoad = { 'backgroundImage': `url(${nightBackground})`, 'noRepeat': '-9999px -9999px' }
    return (
      <AuthContext.Provider value={this.state.auth}>
        <div className='App' style={bStyle}>
          <Navigation {...this.state} />
          <div className='container'>
            <Switch>
              <Route path='/login' render={(props) => <Login {...props} {...this.state} />} />
              <Route exact path='/' component={Home} />
              <Route path='/page/' render={(props) => <Page {...props} {...this.state} />} />
              <PrivateRoute path='/secret' component={Secret} />
              <PrivateRoute path='/addphoto' component={addPhoto} />
              <PrivateRoute path='/addpage' component={addPage} />
              <Route exact path='/gallery' render={(props) => <Gallery {...props} back={this.state.backChange} />} />
              <Route render={(props) => <NotFound {...props} back={this.state.backChange} />} />
            </Switch>
          </div>
          <div style={hiddenLoad}></div>
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
