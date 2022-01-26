import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';

function Nav() {
  const [show, handleShow] = useState(false);

  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => {
      window.removeEventListener('scroll', transitionNavBar);
    };
  }, []);

  return (
    <div className={`nav ${show && 'nav__bg'}`}>
      <div className='nav__content'>
        <img
          onClick={() => navigate('/')}
          className='nav__logo'
          src={require('../img/logo.png')}
          alt='logo'
          title='Home'
        />
        <img
          onClick={() => navigate('/profile')}
          className='nav__avatar'
          src={require('../img/avatar.png')}
          alt='avatar'
          title='Edit Profile'
        />
      </div>
    </div>
  );
}

export default Nav;
