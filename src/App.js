import { Route, Switch } from 'react-router-dom';
import { Component } from 'react';

import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassowrd';

import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const initialState = {
  input: '',
  imageUrl: '',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  updateState = (key, value) => this.setState({ [key]: value });

  render() {
    return (
      <div className='App'>
        <Particles className='particles' params={particlesOptions} />
        <Navigation updateState={this.updateState} isSignedIn={this.state.user?.id !== ''} />

        {this.state.user?.id === '' ? (
          <Switch>
            <Route exact path='/signin'>
              <Signin updateState={this.updateState} />
            </Route>
            <Route path='/register'>
              <Register updateState={this.updateState} />
            </Route>
            <Route path='/forgot-password'>
              <ForgotPassword />
            </Route>
            <Route path='/reset-password/:token'>
              <ResetPassword />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path='/'>
              <Home user={this.state.user} />
            </Route>
          </Switch>
        )}
      </div>
    );
  }
}

export default App;
