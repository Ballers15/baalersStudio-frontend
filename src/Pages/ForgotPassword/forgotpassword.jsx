import React from 'react'
import { useState, useEffect } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
import Loader from '../../Components/Loader'
import Toaster from '../../Components/Toaster'
import { changePassword, forgotPassword, forgotPasswordLink } from '../../Services/User'

import './forgotpassword.css'
// import '../Admin/Pool/Pool.css'

const ForgotPassword = () => {
  const [validated, setValidated] = useState(false)
  const [errorMsg,setErrorMsg]= useState(null)
  const [toasterMessage, setToasterMessage] = useState("");
  const setShowToaster = (param) => showToaster(param);
  const [toaster, showToaster] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [repeatPassword,setRepeatPassword]=useState("")
  const [newPass,setNewPass]=useState(false)
  const [token,setToken]=useState("")
  const navigate = useNavigate();

  useEffect(() => {
  emailValidation(email)
  }, [email])
  
  const emailValidation = (e) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,4})+$/
    const tld = e?.split('.')[1]?.length
    if (!e || regex.test(e) === false || tld <= 1) {
      setErrorMsg('Enter a Valid Email !')
      return false
    }
    setErrorMsg(null)
    return true
  }

  const handleSubmit = async (e) => {
    setValidated(true);
    e.preventDefault()
    e.stopPropagation()
    e.preventDefault()

  if (email) {
      let dataToSend = {
          email: email
      }
     
      setLoading(true);

      try {
        const response=await forgotPassword(dataToSend)
        
            console.log('forgot password response',response?.data?.token)
        setLoading(false);

        if (response.error) {
            // console.log('try if block response',response)
          setToasterMessage(response?.error?.message || 'Something Went Worng forgot')
          setShowToaster(true)
        } else {
          setToasterMessage(response?.message || 'Verified Link created')
          setShowToaster(true)
          setErrorMsg(null)
          // console.log("link verified")
          try {
          // console.log("link verified inside password link", forgotPasswordLink(response?.data?.token))
            setLoading(true);
            const passwordLink=(await forgotPasswordLink(response?.data?.token))
            console.log("password link resp",passwordLink)
            setToken(response?.data?.token)
            console.log("after set token",token,"response token",response?.data?.token)

            setLoading(false);
      
            if (passwordLink.error) {
                // console.log('try if block otpResponse',otpResponse)
              setToasterMessage(passwordLink?.error?.message || 'Something Went Worng link')
              setShowToaster(true)
            } else {
              setToasterMessage(passwordLink?.message || 'Link verified change your password')
              setShowToaster(true)
              setErrorMsg(null)
              setNewPass(true)
            }
          } catch (error) {
            setToasterMessage(error?.response?.data?.message || 'Something Went Worng link')
            setShowToaster(true)
            setLoading(false);
          }
         }
      } catch (error) {
          // console.log("error block",error)
        setToasterMessage(error?.response?.data?.message || 'Something Went Worng forgot')
        setShowToaster(true)
        setLoading(false)
      }
    } 
    else {
      console.log('Form is invalid ------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    }
              
  }

  const updatePassword = async (e) =>{
    setValidated(true);
    e.preventDefault()
    e.stopPropagation()
    e.preventDefault()

    let changePassData={
      password: password,
      repeat: repeatPassword,
      token: token
    }
  

    try {
      setLoading(true);
      const changePass=(await changePassword(changePassData))
      setLoading(false);

      if (changePass.error) {
          // console.log('try if block changePass',changePass)
        setToasterMessage(changePass?.error?.message || 'Something Went Worng')
        setShowToaster(true)
      } else {
        // console.log('try else block changePass',changePass?.message)
        setToasterMessage(changePass?.message || 'Password changed successfully!')
        setShowToaster(true)
        setErrorMsg(null)
        // navigate('/login');
        setLoading(true)
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      }
    } catch (error) {
        // console.log("error block",error?.response?.data?.status)
      setToasterMessage(error?.response?.data?.message || 'Something Went Worng')
      setShowToaster(true)
      setLoading(false);

    }
  }



  return (
    <React.Fragment>
      <div className="forgot-page-wrapper">
      {/* <h2>Sign Up</h2> */}
        <div className="forgot-page-container">
          
        
        <Form noValidate validated={validated} onSubmit={handleSubmit} >
              <Row className="mb-2">
                <Form.Group >
                  <Form.Label className="small-lable">Enter email </Form.Label>
                  <Form.Control required type="email" value={email} onChange={({ target }) => setEmail(target.value)}  ></Form.Control>
                  <Form.Control.Feedback type="invalid"> <span> {email && 'Valid E-mail is required !'} </span> <span> {!email && 'E-mail is required'} </span> </Form.Control.Feedback>
                  <Form.Control.Feedback> <span className="custom-error-msg"> {errorMsg && 'Valid E-mail is required !'}</span> </Form.Control.Feedback>
                </Form.Group>
               </Row>
          
          <div> <button type="submit"  className="forgot-submit-button" onClick={handleSubmit} > Submit </button> </div>
          </Form> 

      </div>
    
    { newPass && <div className='update-password'>
          <Form noValidate validated={validated} onSubmit={updatePassword} >
              <Row className="mb-3">
                <Form.Group >
                  <Form.Label className="small-lable">Password</Form.Label>
                  <Form.Control required type="password" value={password} onChange={({ target }) => setPassword(target.value)} minLength='8' ></Form.Control>
                  <Form.Control.Feedback type="invalid">Password is required (8 character)</Form.Control.Feedback>
                </Form.Group>

                <Form.Group >
                  <Form.Label className="small-lable">Confirm Password</Form.Label>
                  <Form.Control required type="password" value={repeatPassword} onChange={({ target }) => setRepeatPassword(target.value)} minLength='8' ></Form.Control>
                  <Form.Control.Feedback type="invalid">Password is required (8 character)</Form.Control.Feedback>
                </Form.Group>

              </Row>
                <div> <button type="submit"  className="forgot-submit-button" onClick={updatePassword} > Submit </button> </div>
          </Form> 
        </div> }
        {loading ? <Loader /> : null} {toaster && ( <Toaster message={toasterMessage} show={toaster} close={() => showToaster(false)} /> )}
      </div>
    </React.Fragment>
  )
}

export default ForgotPassword
