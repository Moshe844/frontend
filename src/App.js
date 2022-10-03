import { Route, Switch, Redirect } from 'react-router-dom';
import { Component } from 'react';

import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassowrd';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';

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
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    pet: '',
    age: '',
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen,
    }));
  };

  updateState = (key, value) => this.setState({ [key]: value });

  render() {
    const { isProfileOpen, user } = this.state;
    return (
      <div className='App'>
        <Particles className='particles' params={particlesOptions} />
        <Navigation
          updateState={this.updateState}
          isSignedIn={this.state.user?.id !== ''}
          toggleModal={this.toggleModal}
        />
        {isProfileOpen && (
          <Modal>
            <Profile
              isProfileOpen={isProfileOpen}
              toggleModal={this.toggleModal}
              user={user}
              updateState={this.updateState}
            />
          </Modal>
        )}

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
            <Redirect to='/signin' />
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
