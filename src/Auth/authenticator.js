import { Navigate, useLocation } from 'react-router-dom'
// import { useAuth } from './authProvider'

export const Authenticator = ({ children }) => {
  const location = useLocation()
  let strAuth = localStorage.getItem('_u');
  let wallet = localStorage.getItem('isConnected');
  let auth = JSON.parse(strAuth);
  const prev = sessionStorage.getItem('before login')

  if (auth?.user?.role!=='USER' && !wallet || auth?.user?.role === null) {
    return <Navigate to='/login' state={{ path: location.pathname }} />
  } else if (auth?.user.role==='USER' && wallet) {
    return <Navigate to={prev} state={{ path: location.pathname }} />
  } else {
    console.log('passed succesfully')
  }

  return children
}
