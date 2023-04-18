import { useState, createContext, useContext } from 'react'
import {userLogin} from '../Services/Auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch  } from "react-redux";
import { setLoadingFalse, setLoadingTrue, setUserData,   setWalletAddressValue } from "../Components/Redux/actions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setIsClaimed, setLoading } from '../Components/Redux/reducer';

const AuthContext = createContext(null);

export default function AuthProvide({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const prev = sessionStorage.getItem('before login')
  // let strAuth = useSelector(state => state.user.user)
  

  // useEffect(() => {
  //   let _u = JSON.parse(strAuth)
  //   if (_u) {
  //    dispatch( setUserData(_u))
  //   } else {
  //    dispatch( setUserNull())
  //   }
  // }, []) 

const [passErrorMsg,setPassErrorMsg]= useState(null)
  

  /**
   * Login function
   * @param data Object | email and password
   */
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
          navigate(-1)
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

  /**
   * Logout function resets values to default in redux store
   */
  const logout =  () => {
    // console.log("hiii logout");
    dispatch(setUserData(null));
    dispatch(setWalletAddressValue(null));
    dispatch(setIsClaimed(false));
    dispatch(setLoading(false));    
    navigate('/login');
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

