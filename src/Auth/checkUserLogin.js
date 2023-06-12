import {  useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';


/**
 * 
 * @param Component
 * @returns Redirects to login if user is not logged in
 */
export const CheckUserLogin = ({ children }) => {
  let strAuth = useSelector(state => state.user.user);
  let auth = JSON.parse(strAuth);
  const navigate = useNavigate()

  if (auth?.user?.role !== 'USER') {
    navigate('/login')
  }

  return children
}
