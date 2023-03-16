import { Navigate, useLocation } from 'react-router-dom'

export const CheckUser = ({ children }) => {
  const location = useLocation()
  let strAuth = localStorage.getItem('_u');
  let auth = JSON.parse(strAuth);

  if (auth?.user?.role === 'ADMIN') {
    return <Navigate to='/admin-dashboard' state={{ path: location.pathname }} />
  } else if (auth?.user?.role==='USER' ) {
    return <Navigate to='/' state={{ path: location.pathname }} />
  } else {
    console.log('passed succesfully')
  }

  return children
}
