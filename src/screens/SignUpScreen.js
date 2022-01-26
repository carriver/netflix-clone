import React, { useRef } from 'react';
import { auth } from '../firebase';
import email from './LoginScreen';
import './SignUpScreen.css';

function SignUpScreen({ email }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
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
