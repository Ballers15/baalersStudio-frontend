import { Navigate, useLocation } from 'react-router-dom'

export const AuthenticatorUser = ({ children }) => {
  const location = useLocation()
  let strAuth = localStorage.getItem('_u');
  let auth = JSON.parse(strAuth);

  if (auth?.user.role ==='ADMIN' ) {
    return <Navigate to='/admin-dashboard' state={{ path: location.pathname }} />
  } 

  return children
}
