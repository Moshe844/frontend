import React from 'react';
import './Signin.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
    };
  }

  showToast1 = message => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  onEmailChange = event => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = event => {
    event.preventDefault();

    // eslint-disable-next-line
    let regex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/g;
    const isEmailValid = this.state.signInEmail.match(regex);
    const signInEmail1 = this.state.signInEmail;
    const signInPassword1 = this.state.signInPassword;

    if (!signInEmail1 || !signInPassword1) {
      return this.showToast1('please fill in the required fields');
    }
    if (!isEmailValid) {
      return this.showToast1();
    }
    fetch('https://ancient-sea-46547.herokuapp.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Invalid email address or password');
        return response.json();
      })
      .then(user => {
        if (user.id) {
          this.props.updateState('user', user);
        }
      })
      .catch(error => this.showToast1(error.message));
  };

  logInAsGuest = () => {
    this.setState({ signInEmail: 'moshe@gmail.com', signInPassword: 'Moshe6700' });
  };

  render() {
    return (
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
        <ToastContainer />
        <main className='pa4 black-80'>
          <form className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f1 fw6 ph0 mh0'>Sign In</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Email
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black'
                  type='email'
                  name='email-address'
                  id='email-address'
                  onChange={this.onEmailChange}
                  value={this.state.signInEmail}
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='password'>
                  Password
                </label>
                <input
                  className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black'
                  type='password'
                  name='password'
                  id='password'
                  onChange={this.onPasswordChange}
                  value={this.state.signInPassword}
                />
              </div>
            </fieldset>
            <div className=''>
              <input
                onClick={this.onSubmitSignIn}
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                value='Sign in'
              />
            </div>
            <div className=''>
              <input
                onClick={this.logInAsGuest}
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='button'
                value='log in as guest'
              />
            </div>
            <div className='lh-copy mt3'>
              <Link to='/register' className='f6 link dim black db pointer'>
                Register
              </Link>
            </div>
            <div className='lh-copy mt3'>
              <Link to='/forgot-password' className='f6 link dim black db pointer'>
                Forgot Passowrd?
              </Link>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default Signin;
