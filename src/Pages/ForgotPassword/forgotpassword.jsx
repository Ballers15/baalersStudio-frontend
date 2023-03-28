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
  const [toasterColor, setToasterColor] = useState('primary')
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
        setLoading(false);
      if (response.error) {
          setToasterMessage(response?.error?.message || 'Something Went Worng in getting token')
          setShowToaster(true)
          setToasterColor('danger')
        } else {
          setToasterMessage(response?.message || 'Verified link created')
          setShowToaster(true)
          setToasterColor('success')
          setErrorMsg(null)
          setToken(response?.data?.token)
          if(response?.data?.token.length){
            createLink(response?.data?.token)
        }
        }
      } catch (error) {
        setToasterMessage(error?.response?.data?.message || 'Something Went Worng in getting token')
        setShowToaster(true)
        setToasterColor('danger')
        setLoading(false)
      }
    } 
    else {
      console.log('Form is invalid ------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    }
     
  }

  const createLink = async (data) => {
    if(data.length){

      setLoading(true);

      try {
          const passwordLink=(await forgotPasswordLink(data))
          setLoading(false);
          if (passwordLink.error) {
            setToasterMessage(passwordLink?.error?.message || 'Something Went Worng in generating link')
            setShowToaster(true)
            setToasterColor('danger')
          } else {
            setToasterMessage(passwordLink?.message || 'link verified')
            setShowToaster(true)
            setToasterColor('success')
            setNewPass(true)
          }
        } catch (error) {
          setToasterMessage(error?.response?.data?.message || 'Something Went Worng link')
          setShowToaster(true)
          setToasterColor('danger')
          setLoading(false);
        }
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
    setLoading(true);

    try {
      const changePass=(await changePassword(changePassData))
      setLoading(false);

      if (changePass.error) {
        setToasterMessage(changePass?.error?.message || 'Something Went Worng')
        setShowToaster(true)
        setToasterColor('danger')
      } else {
        setToasterMessage(changePass?.message || 'Password changed successfully!')
        setShowToaster(true)
        setToasterColor('success')
        setErrorMsg(null)
        setLoading(true)
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      }
    } catch (error) {
      setToasterMessage(error?.response?.data?.message || 'Something Went Worng')
      setShowToaster(true)
      setToasterColor('danger')
      setLoading(false);
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
                <Form.Control required type="email"  placeholder="EMAIL" value={email} onChange={({ target }) => setEmail(target.value)}  ></Form.Control>
                <Form.Control.Feedback type="invalid"> <span> {email && 'Valid E-mail is required !'} </span> <span> {!email && 'E-mail is required'} </span> </Form.Control.Feedback>
                <Form.Control.Feedback> <span className="custom-error-msg"> {errorMsg && 'Valid E-mail is required !'}</span> </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className="playBtn">  <button type="submit" onClick={handleSubmit} > <span></span>PROCEED  </button> </div>
          </Form> 
        </div>
      </div> }
    
    { newPass === true && <div className='update-password'>
    <h2 className="login-head">SET NEW <br/>PASSWORD </h2>
     <p>Please enter your new password.</p>
          <Form noValidate validated={validated} onSubmit={updatePassword} >
              <Row className="mb-3">
                <Form.Group className='pb-4'>
                  {/* <Form.Label className="small-lable">Password</Form.Label> */}
                  <Form.Control required type="password" placeholder="PASSWORD" value={password} onChange={({ target }) => setPassword(target.value)} minLength='8' ></Form.Control>
                  <Form.Control.Feedback type="invalid">Password is required (8 character)</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='pb-4'>
                  {/* <Form.Label className="small-lable">Confirm Password</Form.Label> */}
                  <Form.Control required type="password" placeholder="CONFIRM PASSWORD" value={repeatPassword} onChange={({ target }) => setRepeatPassword(target.value)} minLength='8' ></Form.Control>
                  <Form.Control.Feedback type="invalid">Password is required (8 character)</Form.Control.Feedback>
                </Form.Group>

              </Row>
              <div className="playBtn">  <button type="submit"  onClick={updatePassword} > <span></span>CONTINUE  </button> </div>
                {/* <div> <button type="submit"  className="forgot-submit-button" onClick={updatePassword} > Submit </button> </div> */}
          </Form> 
        </div> }
        {loading ? <Loader /> : null} {toaster && ( <Toaster message={toasterMessage} show={toaster} close={() => showToaster(false)} bg={toasterColor} /> )}
      </div>
    </React.Fragment>
  )
}

export default ForgotPassword
