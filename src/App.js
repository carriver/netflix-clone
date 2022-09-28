import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
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

  const user = useSelector(selectUser);

  return (
    <div className='app'>
      <BrowserRouter>
        {!user ? (
          <HomeScreen />
        ) : (
          <Routes>
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/' element={<HomeScreen />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
