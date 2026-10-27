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

function useSyncSignedInUserToStore() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((signedInUser) => {
      if (signedInUser) {
        dispatch(login({ uid: signedInUser.uid, email: signedInUser.email }));
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);
}

function App() {
  useSyncSignedInUserToStore();

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
