import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';

export const AuthenticatorAdmin = ({ children }) => {
  const location = useLocation()
  let strAuth = useSelector(state => state.user.user);
  let auth = JSON.parse(strAuth);

  if (auth?.user.role!=='ADMIN' ) {
    return <Navigate to='/' state={{ path: location.pathname }} />
  } 

  return children
}
