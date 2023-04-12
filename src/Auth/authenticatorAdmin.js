import { Navigate, useLocation } from 'react-router-dom'
import { getUser } from '../Services/User';

export const AuthenticatorAdmin = ({ children }) => {
  const location = useLocation()
  let strAuth = getUser();
  let auth = JSON.parse(strAuth);

  if (auth?.user.role!=='ADMIN' ) {
    return <Navigate to='/' state={{ path: location.pathname }} />
  } 

  return children
}
