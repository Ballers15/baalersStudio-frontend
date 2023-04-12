import { Navigate, useLocation } from 'react-router-dom'
import { getUser } from '../Services/User';

export const AuthenticatorUser = ({ children }) => {
  const location = useLocation()
  let strAuth = getUser();
  let auth = JSON.parse(strAuth);

  if (auth?.user.role ==='ADMIN' ) {
    return <Navigate to='/admin-dashboard' state={{ path: location.pathname }} />
  } 

  return children
}
