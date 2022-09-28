import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ isSignedIn, updateState }) => {
  const logUserOut = () => {
    const initialUserState = {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
    };

    updateState('user', initialUserState);
  };

  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p className='f3 link dim black underline pa3 pointer' onClick={logUserOut}>
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to='/signin' className='f3 link dim black underline pa3 pointer'>
          Sign In
        </Link>
        <Link to='/register' className='f3 link dim black underline pa3 pointer'>
          Register
        </Link>
      </nav>
    );
  }
};

export default Navigation;
