import { Navigate, useLocation } from 'react-router-dom'
// import { useAuth } from './authProvider'

export const Authenticator = ({ children }) => {
  const location = useLocation()
  // const auth = useAuth()
  let strAuth = localStorage.getItem('_u');
  let wallet = localStorage.getItem('isConnected');
  let auth = JSON.parse(strAuth);

  if (auth?.user.role!=='USER' && !wallet) {
    return <Navigate to='/login' state={{ path: location.pathname }} />
  } else if (auth?.user.role==='USER' && !wallet) {
    return <Navigate to='/metamask' state={{ path: location.pathname }} />
  } else {
    console.log('passed succesfully')
  }

  return children
}
