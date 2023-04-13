import { useState,useEffect, createContext, useContext } from 'react'
import {userLogin} from '../Services/Auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector  } from "react-redux";
import { setLoadingFalse, setLoadingTrue, setUserData, setUserNull, setWalletAddressNull } from "../Components/Redux/actions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setIsClaimed, setLoading } from '../Components/Redux/reducer';

const AuthContext = createContext(null);

export default function AuthProvide({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const prev = sessionStorage.getItem('before login')
  let strAuth = useSelector(state => state.user.user)
  

  // useEffect(() => {
  //   let _u = JSON.parse(strAuth)
  //   if (_u) {
  //    dispatch( setUserData(_u))
  //   } else {
  //    dispatch( setUserNull())
  //   }
  // }, []) 

const [passErrorMsg,setPassErrorMsg]= useState(null)
  
  const login = async (data) => {
    dispatch(setLoadingTrue());
    try {
      const login = await userLogin(data);
      dispatch(setLoadingFalse());
      if (login.error) {
      toast.dismiss()    
      toast.error(login?.message||'Something went worng');
    } 
      else {
        if (login?.data?.user?.role === 'ADMIN') {
          dispatch(setUserData(JSON.stringify(login.data)))
          toast.dismiss()    
          toast.success('Login Succesfully !!');
          navigate('/admin-dashboard')
        } 
        else {
          dispatch(setUserData(JSON.stringify(login.data)))
          toast.dismiss()    
          toast.success('Login Succesfully !!');
          navigate(prev)
        }
      }
    } catch (error) {
      // console.log('err in login',error)
      toast.dismiss()    
      toast.error(error ||'Something went worng during login');
      dispatch(setLoadingFalse());
      setPassErrorMsg(error || 'Incorrect Password')
      navigate('/login')
    }
  }

  const logout =  () => {
    // console.log("hiii logout");
    dispatch(setUserNull());
    dispatch(setWalletAddressNull());
    dispatch(setIsClaimed(false));
    dispatch(setLoading(false));    navigate('/login');
  }

  return (
    <AuthContext.Provider value={{ passErrorMsg, setPassErrorMsg, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

