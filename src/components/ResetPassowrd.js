import { Component } from 'react';
import { withRouter } from 'react-router';

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      newPassword: '',
      confirmPassword: '',
      resetPasswordToken: '',
    };
  }

  componentDidMount() {
    const token = this.props.match.params.token;

    this.setState({ resetPasswordToken: token });
  }

  resetPassword = event => {
    event.preventDefault();

    const { password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }

    fetch('http://localhost:3005/resetPassword', {
      method: 'post',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  };

  render() {
    return (
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
        <main className='pa4 black-80'>
          <form className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f1 fw6 ph0 mh0'>Please enter your Email</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  New confirmPassword
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='password'
                  name='new-password'
                  id='new-password'
                  onChange={event => this.setState({ password: event.target.value })}
                />
              </div>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Confirm password
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='password'
                  name='comfirm-password'
                  id='confirm-password'
                  onChange={event => this.setState({ confirmPassword: event.target.value })}
                />
              </div>
            </fieldset>
            <div className=''>
              <input
                onClick={this.resetPassword}
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                value='reset-password'
              />
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default withRouter(ResetPassword);
