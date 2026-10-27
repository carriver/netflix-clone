import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectUser } from '../features/userSlice';

function RedirectIfSignedIn({ children }) {
  const user = useSelector(selectUser);
  const location = useLocation();

  if (user) return <Navigate to={location.state?.from?.pathname ?? '/profile'} replace />;
  return children;
}

export default RedirectIfSignedIn;
