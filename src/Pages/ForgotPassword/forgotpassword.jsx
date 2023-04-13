import React from 'react'
import { useState, useEffect } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
import { changePassword, forgotPassword, forgotPasswordLink } from '../../Services/User'
import './forgotpassword.css'
import ApiLoader from '../../Components/apiLoader'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../Components/Redux/actions";

const ForgotPassword = () => {
  const [validated, setValidated] = useState(false)
  const [emailErrorMsg,setEmailErrorMsg]= useState(null)
  const [passErrorMsg,setPassErrorMsg]= useState(null)
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [repeatPassword,setRepeatPassword]=useState("")
  const [newPass,setNewPass]=useState(false)
  const [token,setToken]=useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.loading.isLoading)


  const emailValidation = (e) => {
    // console.log("hi i am called");
    setEmail(e.target.value)
    // console.log(userDetails.email)
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,4})+$/
    const tld = e.target.value?.split('.')[1]?.length
    if(e.target.value !== ''){
    if (regex.test(e.target.value) === false || tld <= 1) {
      setEmailErrorMsg('Valid E-mail is required !')
    }
    else{
      setEmailErrorMsg(null)
    }
  }
  else{
    setEmailErrorMsg('Email is  required !')
    }
  }

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

  const handleSubmit = async (e) => {

    setValidated(true);
    e.preventDefault()
    e.stopPropagation()
    e.preventDefault()
    
   const form = e.currentTarget;
    // console.log(form.checkValidity(),form)
    if (form.checkValidity() === true) {
  if (email) {
      let dataToSend = {
          email: email
      }
    dispatch(setLoadingTrue());
      try {
        const response=await forgotPassword(dataToSend)
        dispatch(setLoadingFalse());
      if (response.error) {
        toast.dismiss()    
        toast.error(response?.error?.message || 'Something went worng in getting token')
        } else {
          toast.dismiss()    
          toast.success(response?.message || 'Verified link created')
          setToken(response?.data?.token)
          if(response?.data?.token.length){
            createLink(response?.data?.token)
        }
        }
      } catch (error) {
        toast.dismiss()    
        toast.error(error?.response?.data?.message || 'Something went worng in getting token')
        dispatch(setLoadingFalse());
      }
    } 
    else {
      console.log('Form is invalid ------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    }
  }
}

  const createLink = async (data) => {
    if(data.length){

      dispatch(setLoadingTrue());
      try {
          const passwordLink=(await forgotPasswordLink(data))
          dispatch(setLoadingFalse());
          if (passwordLink.error) {
            toast.dismiss()    
            toast.error(passwordLink?.error?.message || 'Something went worng in generating link')
          } else {
            toast.dismiss()    
            toast.success(passwordLink?.message || 'link verified')
            setValidated(false)
            setNewPass(true)
          }
        } catch (error) {
          toast.dismiss()    
          toast.error(error?.response?.data?.message || 'Something went worng link')
          dispatch(setLoadingFalse());
        }
      }
  }

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
        }, 2000)
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

        {newPass === false && <div className="signup-box">
        <h2 className="login-head">FORGOT  <br/>PASSWORD ?</h2>
        <div className="forgot-page-container">
         <p>No worries, enter your mail ID & we will send you a reset code</p>
          <Form noValidate validated={validated} onSubmit={handleSubmit} >
            <Row className="mb-2">
              <Form.Group >
                <Form.Control required type="email"  placeholder="EMAIL" value={email} onChange={(e) => emailValidation(e) }  ></Form.Control>
                                <Form.Control.Feedback type="invalid">{emailErrorMsg  ? '':'Email is Required!'}</Form.Control.Feedback>
                <span className="custom-error-msg"> {emailErrorMsg} </span>
              </Form.Group>
            </Row>
            <div className="playBtn">  <button type="submit" > <span></span>PROCEED  </button> </div>
          </Form> 
        </div>
      </div> }
    
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

export default ForgotPassword
