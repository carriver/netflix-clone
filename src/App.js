import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from './features/userSlice';
import { auth } from './firebase';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RequireAuth from './components/RequireAuth';
import RedirectIfSignedIn from './components/RedirectIfSignedIn';
import './App.css';

function App() {
  const dispatch = useDispatch();

  // Adds an observer or listener for changes to the user's sign-in state.
  // If the user is signed in, it dispatches the login action to the
  // Redux store and stores the user id and email in the userSlice,
  // to be used throughout the App. If the user is logged out,
  // the logout action is dispatched to reset the user to null.

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          }),
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route
            path='/login'
            element={
              <RedirectIfSignedIn>
                <LoginScreen />
              </RedirectIfSignedIn>
            }
          />
          <Route
            path='/profile'
            element={
              <RequireAuth>
                <ProfileScreen />
              </RequireAuth>
            }
          />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
