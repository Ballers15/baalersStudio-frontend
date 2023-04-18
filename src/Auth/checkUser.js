import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';


/**
 * Redirects to respective dashboards according to user role
 * @param Component
 * @returns Redirects according to user role
 */
export const CheckUser = ({ children }) => {
  const location = useLocation()
  let strAuth = useSelector(state => state.user.user);
  let auth = JSON.parse(strAuth);

  if (auth?.user?.role === 'ADMIN') {
    return <Navigate to='/admin-dashboard' state={{ path: location.pathname }} />
  } 
  else if (auth?.user?.role ==='USER' ) {
    return <Navigate to='/' state={{ path: location.pathname }} />
  } 
  else {
    // console.log('passed succesfully')
  }

  return children
}
