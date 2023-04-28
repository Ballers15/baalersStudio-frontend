import React from 'react'
import { useState, useEffect } from 'react'
import {  Row, Form } from 'react-bootstrap'
import {  useNavigate, useParams } from 'react-router-dom'
import { changePassword, forgotPasswordLink } from '../../Services/User'
import './resetpassword.css'
import ApiLoader from '../../Components/apiLoader'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../Components/Redux/actions";

const ResetPassword = () => {
  const [validated, setValidated] = useState(false)
  const [passErrorMsg,setPassErrorMsg]= useState(null)
  const [password,setPassword]=useState("")
  const [repeatPassword,setRepeatPassword]=useState("")
  const [newPass,setNewPass]=useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.loading.isLoading)
  const { token } = useParams();

  useEffect(() => {
  console.log(token)
  verifyLink(token)
  }, [])

  /**
   * Match repeat password
   * @param e Event | Value of input
   */
  const confirmRepeatPassword = (e) =>{
    setRepeatPassword(e.target.value)
    // console.log(e.target.value,'//',userDetails.password)
    
    if(e.target.value===password)
    {
      // console.log('inside if detting null')
      setPassErrorMsg(null)
      // return true;
    }
    else{
      setPassErrorMsg('Passwords do not match')
      // return false;
    }
    // console.log('end ',passErrorMsg)
  }
  
  /**
   * Match password
   * @param e Event | Value of input
   */
  const confirmPassword = (e) =>{

    setPassword(e.target.value)
    // console.log(e.target.value,'//',userDetails.repeat)
    
    if(e.target.value===repeatPassword)
    {
      // console.log('inside if detting null')
      setPassErrorMsg(null)
      // return true;
    }
    else{
      setPassErrorMsg('Passwords do not match')
      // return false;
    }
    // console.log('end ',passErrorMsg)
  }

   /**
   * Verify reset password link 
   * @param data 
   */
   const verifyLink = async (data) => {
    if(data.length){

      dispatch(setLoadingTrue());
      try {
          const passwordLink=(await forgotPasswordLink(data))
          dispatch(setLoadingFalse());
          if (passwordLink.error) {
            toast.dismiss()    
            toast.error(passwordLink?.error?.message || 'Something went worng in generating link')
            navigate('/login')
          } else {
            toast.dismiss()    
            toast.success(passwordLink?.message || 'link verified')
            setValidated(false)
            setNewPass(true)
          }
        } catch (error) {
          toast.dismiss()    
          toast.error(error?.response?.data?.message || 'Link Invalid or Expired')
          dispatch(setLoadingFalse());
          navigate('/login')
        }
      }
  }


  /**
   * Update password
   * @param e Event
   */
  const updatePassword = async (e) =>{
    setValidated(true);
    e.preventDefault()
    e.stopPropagation()
    e.preventDefault()

    
   const form = e.currentTarget;
   // console.log(form.checkValidity(),form)
   if (form.checkValidity() === true) {

    let changePassData={
      password: password,
      repeat: repeatPassword,
      token: token
    }
    dispatch(setLoadingTrue());
    try {
      const changePass=(await changePassword(changePassData))
      dispatch(setLoadingFalse());

      if (changePass.error) {
        toast.dismiss()    
        toast.error(changePass?.error?.message || 'Something went worng')
      } else {
        toast.dismiss()    
        toast.success(changePass?.message || 'Password changed successfully!')
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      }
    } catch (error) {
      toast.dismiss()    
      toast.error(error?.response?.data?.message || 'Something went worng')
      dispatch(setLoadingFalse());
    }
  }
}

  return (
    <React.Fragment>
      <div className="forgot-page-wrapper">
    
    { newPass === true && <div className='update-password'>
    <h2 className="login-head">SET NEW <br/>PASSWORD </h2>
     <p>Please enter your new password.</p>
          <Form noValidate validated={validated} onSubmit={updatePassword} >
              <Row className="mb-3">
                <Form.Group className='pb-4'>
                  <Form.Control required type="password" placeholder="PASSWORD" value={password} onChange={(e) => confirmPassword(e)} minLength='8' ></Form.Control>
                  <Form.Control.Feedback type="invalid">Password is required (8 character)</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='pb-4'>
                  <Form.Control required type="password" placeholder="CONFIRM PASSWORD" value={repeatPassword} onChange={(e) => confirmRepeatPassword(e)} ></Form.Control>
                  <span className="custom-error-msg">{passErrorMsg} </span>
                  <Form.Control.Feedback type="invalid">{passErrorMsg ||  'Passwords do not match'}</Form.Control.Feedback>
                </Form.Group>

              </Row>
              <div className="playBtn">  <button type="submit" > <span></span>CONTINUE  </button> </div>
          </Form> 
        </div> }
        {isLoading ? <ApiLoader /> : null} 
      </div>
    </React.Fragment>
  )
}

export default ResetPassword;
