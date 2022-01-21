import React, { useEffect, useState } from 'react';
import './LoginScreen.css';
import backgroundImg from '../img/loginbg.png';

function LoginScreen() {
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
        <button className='loginScreen__button'>Sign in</button>
        <div className='loginScreeen__gradient' />
      </div>
      <div
        className={`${
          isMobile ? 'loginScreen__bodyMobile' : 'loginScreen__body'
        }`}>
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <h3>
          Ready to watch? Enter your email to create or restart your membership.
        </h3>
        <div
          className={`${
            isMobile ? 'loginScreen__inputMobile' : 'loginScreen__input'
          }`}>
          <form>
            <input type='email' placeholder='Email Address' />
            <button
              className={`${
                isMobile
                  ? 'loginScreen__getStartedMobile'
                  : 'loginScreen__getStarted'
              }`}>
              GET STARTED
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
