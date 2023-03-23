import { useState,useEffect, createContext, useContext } from 'react'
import {userLogin} from '../Services/Auth'
import { useNavigate } from 'react-router-dom'
import Loader from "../Components/Loader";
import Toaster from "../Components/Toaster";
const AuthContext = createContext(null);

export default function AuthProvide({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [toaster, showToaster] = useState(false);
  const setShowToaster = (param) => showToaster(param);
  const navigate = useNavigate()
  const prev = sessionStorage.getItem('before login')

  useEffect(() => {
    let _u = localStorage.getItem('_u');
    if (JSON.parse(_u)) {
      setUser(JSON.parse(_u));
    } else {
      setUser(null);
    }
  }, []) 
  
  const login = async (data) => {
    setLoading(true);
    try {
      const login = await userLogin(data);
      setLoading(false);
      if (login.error) {
      console.log(login)
      setToasterMessage(login?.message||'Something Went Worng');
      setShowToaster(true);
    } 
      else {
        if (login?.data?.user?.role === 'ADMIN') {
          setUser(login.data);
          localStorage.setItem('_u', JSON.stringify(login.data))
          setToasterMessage('Login Succesfully !!');
          setShowToaster(true);
          navigate('/admin-dashboard')
        } 
        else {
          setUser(login.data);
          localStorage.setItem('_u', JSON.stringify(login.data))
          setToasterMessage('Login Succesfully !!');
          setShowToaster(true);
          navigate(prev)
        }
      }
    } catch (error) {
      console.log(error)
      setToasterMessage(error?.response?.data?.message||'Something Went Worng');
      setShowToaster(true);
      setLoading(false);
    }
  }

  const logout =  () => {
    setUser(null);
    localStorage.clear(); 
    navigate('/login');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
      {loading ? <Loader /> : null}
      {toaster && <Toaster
                    message={toasterMessage}
                    show={toaster}
                    close={() => showToaster(false)} />
                }
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

