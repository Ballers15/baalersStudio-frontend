import { useState,useEffect, createContext, useContext } from 'react'
import {userLogin} from '../Services/Auth'
import { Navigate,useNavigate, useLocation, Link } from 'react-router-dom'

const AuthContext = createContext(null)

export default function AuthProvide({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  const location = useLocation()
  const redirectPath = location.state?.path || '/'

  useEffect(() => {
    let _u = localStorage.getItem('_u');
    if (JSON.parse(_u)) {
      setUser(JSON.parse(_u));
    } else {
      setUser(null);
    }
  }, []) 
  
  const login = async (data) => {
    // setLoading(true);
    try {
      const login = await userLogin(data);
      // setLoading(false);
      if (login.error) {
        // show toaster
      } else {
        // show toaster
        setUser(login.data);
        navigate(redirectPath, { replace: true })

        localStorage.setItem('_u', JSON.stringify(login.data))
      }
    } catch (error) {
      // setLoading(false);
    }
  }

  const logout =  () => {
    setUser(null);
    localStorage.clear(); 
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
