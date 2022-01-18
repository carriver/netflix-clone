import React, { useEffect, useState } from 'react';
import './Nav.css';

function Nav() {
  const [show, handleShow] = useState(false);

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
    <div className={`nav ${show && 'nav_bg'}`}>
      <div className='nav_content'>
        <img
          className='nav_logo'
          src={require('../img/logo.png')}
          alt='logo'
        />
        <img
          className='nav_avatar'
          src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
          alt='avatar'
        />
      </div>
    </div>
  );
}

export default Nav;
