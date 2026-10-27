import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUpScreen from './SignUpScreen';
import backgroundImg from '../img/loginBackground.png';
import { useIsMobile } from '../hooks/useIsMobile';
import logoImg from '../img/logo.png';
import './LoginScreen.css';

function LoginScreen() {
  const isMobile = useIsMobile();

  const [isSignInFormOpen, setIsSignInFormOpen] = useState(false);
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
        <Link to='/' className='loginScreen__logoLink'>
          <img
            className='loginScreen__logo'
            src={logoImg}
            alt='Back to browsing'
          />
        </Link>
        <button onClick={() => setIsSignInFormOpen(true)} className='loginScreen__button'>
          Sign in
        </button>
        <div className='loginScreeen__gradient' />
      </div>
      <div
        className={`${
          isSignInFormOpen
            ? 'loginScreen__bodySignIn'
            : isMobile
            ? 'loginScreen__bodyMobile'
            : 'loginScreen__body'
        }`}>
        {isSignInFormOpen ? (
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
                  onClick={() => setIsSignInFormOpen(true)}
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
