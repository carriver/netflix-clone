import { useState } from 'react';
import { Link } from 'react-router';
import SignUpScreen from './SignUpScreen';
import { useIsMobile } from '../hooks/useIsMobile';
import Wordmark from '../components/Wordmark';
import DemoNotice from '../components/DemoNotice';
import './LoginScreen.css';

function LoginScreen() {
  const isMobile = useIsMobile();

  const [isSignInFormOpen, setIsSignInFormOpen] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div className={`${isMobile ? 'loginScreen--mobile' : 'loginScreen'}`}>
      <div className='loginScreen__bg'>
        <Link to='/' className='loginScreen__logoLink' aria-label='Back to browsing'>
          <Wordmark className='loginScreen__logo' />
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
        <DemoNotice />
        {isSignInFormOpen ? (
          <SignUpScreen email={email} />
        ) : (
          <>
            <h1>Browse movies and shows, demo style.</h1>
            <h2>A streaming app built for a developer portfolio.</h2>
            <h3>
              Titles come from TMDB. Sign in with the demo account above to try
              profiles and test-mode subscriptions.
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
