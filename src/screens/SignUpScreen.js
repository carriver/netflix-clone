import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './SignUpScreen.css';

function SignUpScreen({ email }) {
  const navigate = useNavigate();

  // Hooks that store values from input fields
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Event handler for registering a new user using
  // Firebase Authentication, storing the credentials in the database
  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        navigate('/profile');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // Event handler for validating credentials and signing in existing users
  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        navigate('/profile');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className='signUpScreen'>
      <form>
        <h1>Sign In</h1>
        <input
          defaultValue={email}
          ref={emailRef}
          type='email'
          placeholder='Email'
          required
        />
        <input
          ref={passwordRef}
          type='password'
          placeholder='Password'
          required
        />
        <button type='submit' onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className='signUpScreen__gray'>New to Netflix? </span>
          <span className='signUpScreen__link' onClick={register}>
            Sign up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;
