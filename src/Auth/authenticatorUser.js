import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';

export const AuthenticatorUser = ({ children }) => {
  const location = useLocation()
  let strAuth = useSelector(state => state.user.user);
  let auth = JSON.parse(strAuth);

  if (auth?.user.role ==='ADMIN' ) {
    return <Navigate to='/admin-dashboard' state={{ path: location.pathname }} />
  } 

  return children
}
