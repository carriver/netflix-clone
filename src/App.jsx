import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router';
import { useDispatch } from 'react-redux';
import { login, logout } from './features/userSlice';
import { watchSignedInUser } from './authService';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RequireAuth from './components/RequireAuth';
import RedirectIfSignedIn from './components/RedirectIfSignedIn';
import './App.css';

// Only signed-in users reach the profile, so its Firestore code loads on demand.
const ProfileScreen = lazy(() => import('./screens/ProfileScreen'));

function useSyncSignedInUserToStore() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = watchSignedInUser((signedInUser) => {
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
                <Suspense fallback={null}>
                  <ProfileScreen />
                </Suspense>
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
