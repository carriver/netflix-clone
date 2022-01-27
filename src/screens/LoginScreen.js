import React, { useEffect, useState } from 'react';
import SignUpScreen from './SignUpScreen';
import backgroundImg from '../img/loginBackground.png';
import './LoginScreen.css';

function LoginScreen() {
  // Hook to detect if screen size has changed
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        const ismobile = window.innerWidth < 700;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);

  // Hooks to set the Sign In state and store email input value
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div
      className={`${isMobile ? 'loginScreen--mobile' : 'loginScreen'}`}
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <div className='loginScreen__bg'>
        <img
          className='loginScreen__logo'
          src={require('../img/logo.png')}
          alt=''
        />
        <button onClick={() => setSignIn(true)} className='loginScreen__button'>
          Sign in
        </button>
        <div className='loginScreeen__gradient' />
      </div>
      <div
        className={`${
          signIn
            ? 'loginScreen__bodySignIn'
            : isMobile
            ? 'loginScreen__bodyMobile'
            : 'loginScreen__body'
        }`}>
        {signIn ? (
          <SignUpScreen email={email} />
        ) : (
          <>
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div
              className={`${
                isMobile ? 'loginScreen__inputMobile' : 'loginScreen__input'
              }`}>
              <form>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type='email'
                  placeholder='Email Address'
                />
                <button
                  type='button'
                  onClick={() => setSignIn(true)}
                  className={`${
                    isMobile
                      ? 'loginScreen__getStartedMobile'
                      : 'loginScreen__getStarted'
                  }`}>
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
