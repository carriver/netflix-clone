import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import { auth } from '../firebase';
import Nav from '../components/Nav';
import Plan from '../components/Plan';
import 'react-toastify/dist/ReactToastify.css';
import { useIsMobile } from '../hooks/useIsMobile';
import './ProfileScreen.css';

const NAVIGATION_HINT_TOAST_OPTIONS = {
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

function useNavigationHintToasts(isMobile) {
  useEffect(() => {
    toast.info('Click Netflix for Home Screen', {
      ...NAVIGATION_HINT_TOAST_OPTIONS,
      position: 'top-left',
      autoClose: 5000,
    });
    toast.info('Click Avatar for Profile Screen', {
      ...NAVIGATION_HINT_TOAST_OPTIONS,
      position: isMobile ? 'top-left' : 'top-right',
      autoClose: 8000,
    });
    // Shown once per visit; later resizes must not re-trigger them.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function ProfileScreen() {
  const isMobile = useIsMobile();

  useNavigationHintToasts(isMobile);

  const user = useSelector(selectUser);

  return (
    <div className='profileScreen'>
      <Nav />
      <ToastContainer />

      <div
        className={`${
          isMobile ? 'profileScreen__bodyMobile' : 'profileScreen__body'
        }`}>
        <h1>Edit Profile</h1>

        <div className='profileScreen__info'>
          <img src={require('../img/avatar.png')} alt='avatar' />

          <div className='profileScreen__details'>
            <h2>{user.email}</h2>

            <div className='profileScreen__plans'>
              <h3>Plans</h3>
              <Plan />

              <button
                onClick={() => auth.signOut()}
                className='profileScreen__signOut'>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
