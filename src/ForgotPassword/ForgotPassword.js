import React from 'react';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ForgotPasswordLink: '',
      email: '',
    };
  }

  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  onSubmitSignIn = event => {
    event.preventDefault();
    fetch('http://localhost:3001/sendResetPassowrdLink', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ForgotPasswordLink: this.state.ForgotPasswordLink,
        email: this.state.email,
      }),
    })
      .then(response => response.text())
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
                  Email
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='email'
                  name='email-address'
                  id='email-address'
                  onChange={this.onEmailChange}
                />
              </div>
            </fieldset>
            <div className=''>
              <input
                onClick={this.onSubmitSignIn}
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                value='send reset link'
              />
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default ForgotPassword;
