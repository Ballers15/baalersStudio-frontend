import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';

/**
 * This Component redirects user to previous page after login
 * @param Component
 * @returns navigate to /login or previous page
 */
export const Authenticator = ({ children }) => {
  const location = useLocation()
  let strAuth = useSelector(state => state.user.user);
  let wallet = useSelector(state => state.wallet.walletAddress)
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
