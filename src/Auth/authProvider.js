import { useState,useEffect, createContext, useContext } from 'react'
import {userLogin} from '../Services/Auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../Components/Redux/actions";
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext(null);

export default function AuthProvide({ children }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
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
const [passErrorMsg,setPassErrorMsg]= useState(null)
  
  const login = async (data) => {
    dispatch(setLoadingTrue());
    try {
      const login = await userLogin(data);
      dispatch(setLoadingFalse());
      if (login.error) {
      console.log(login,'./././')
      toast.error(login?.message||'Something Went Worng');
    } 
      else {
        if (login?.data?.user?.role === 'ADMIN') {
          setUser(login.data); 
          localStorage.setItem('_u', JSON.stringify(login.data))
          toast.success('Login Succesfully !!');
          navigate('/admin-dashboard')
        } 
        else {
          setUser(login.data);
          localStorage.setItem('_u', JSON.stringify(login.data))
          toast.success('Login Succesfully !!');
          navigate(prev)
        }
      }
    } catch (error) {
      // console.log('err in login',error)
      toast.error(error ||'Something Went Worng during login');
      dispatch(setLoadingFalse());
      setPassErrorMsg(error || 'Incorrect Password')
      navigate('/login')
    }
  }

  const logout =  () => {
    console.log("hiii logout");
    setUser(null);
    localStorage.clear(); 
    navigate('/login');
  }

  return (
    <AuthContext.Provider value={{ passErrorMsg, setPassErrorMsg, login, logout }}>
      {children}
      <ToastContainer  theme="colored"/>
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

