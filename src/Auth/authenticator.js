import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './authProvider'

export const Authenticator = ({ children }) => {
  const location = useLocation()
  const auth = useAuth()
  console.log(auth)
  if (!auth?.user) {
    return <Navigate to='/login' state={{ path: location.pathname }} />
  }
  return children
}
