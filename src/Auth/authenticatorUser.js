import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';

/**
 * Redirects to admin dashboard if user is admin
 * @param Component
 * @returns Navigate to admin dashboard
 */
export const AuthenticatorUser = ({ children }) => {
  const location = useLocation()
  let strAuth = useSelector(state => state.user.user);
  let auth = JSON.parse(strAuth);

  if (auth?.user.role ==='ADMIN' ) {
    return <Navigate to='/admin-dashboard' state={{ path: location.pathname }} />
  } 

  return children
}
