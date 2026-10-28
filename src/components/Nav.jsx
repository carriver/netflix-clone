import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Wordmark from './Wordmark';
import avatarImg from '../img/avatar.svg';
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
    <div className={`nav ${show ? 'nav__bg' : ''}`}>
      <div className='nav__content'>
        <Link to='/' className='nav__logo' title='Home'>
          <Wordmark />
        </Link>
        <Link to='/profile' title='Edit Profile'>
          <img className='nav__avatar' src={avatarImg} alt='Your profile' />
        </Link>
      </div>
    </div>
  );
}

export default Nav;
