import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import { auth } from '../firebase';
import Nav from '../components/Nav';
import Plan from '../components/Plan';
import 'react-toastify/dist/ReactToastify.css';
import './ProfileScreen.css';

function ProfileScreen() {
  const user = useSelector(selectUser);

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

  const [show, hide] = useState(true);

  useEffect(() => {
    const notify = () =>
      toast.info('Click Netflix for Home Screen', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    notify();
  }, []);

  const [show2, hide2] = useState(true);

  useEffect(() => {
    const notify = () =>
      toast.info('Click Avatar for Profile Screen', {
        position: isMobile ? 'top-left' : 'top-right',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    notify();
  }, []);

  return (
    <div className='profileScreen'>
      <Nav />
      <ToastContainer />
      {show}
      {hide}
      <ToastContainer />
      {show2}
      {hide2}
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
