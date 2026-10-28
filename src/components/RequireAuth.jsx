import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import { selectAuthChecked, selectUser } from '../features/userSlice';

function RequireAuth({ children }) {
  const user = useSelector(selectUser);
  const authChecked = useSelector(selectAuthChecked);
  const location = useLocation();

  // Firebase restores a saved session asynchronously; redirecting before it
  // answers would bounce signed-in users to /login on every page refresh.
  if (!authChecked) return null;
  if (!user) return <Navigate to='/login' replace state={{ from: location }} />;
  return children;
}

export default RequireAuth;
