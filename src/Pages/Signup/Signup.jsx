import React from 'react'
import { useState, useEffect } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
import { useAuth } from '../../Auth/authProvider'
import Loader from '../../Components/Loader'
import Toaster from '../../Components/Toaster'
import { checkUserName, registerUser, userLogin, userSignup, verifyOtp } from '../../Services/User'
import './Signup.css'
// import '../Admin/Pool/Pool.css'

const Signup = () => {
  const [validated, setValidated] = useState(false)
  const [errorMsg,setErrorMsg]= useState(null)
  const [passErrorMsg,setPassErrorMsg]= useState(null)
  const [toasterMessage, setToasterMessage] = useState("");
  const setShowToaster = (param) => showToaster(param);
  const [toaster, showToaster] = useState(false);
  const [response,setResponse] = useState("");
  const [otp, setOtp]=useState("")
  const [otpResponse,setOtpResponse]=useState("")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const [userDetails, setUserDetails] = useState(
    {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeat:''
    }
  )
  useEffect(() => {
  emailValidation(userDetails.email)
  confirmPassword()
    }, [userDetails])
  
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

  const confirmPassword = () =>{
    if(userDetails.password.trim()===userDetails.repeat.trim())
    {
      setPassErrorMsg(null)
      return true;
    }
    else{
      setPassErrorMsg('Passwords do not match')
      return false;
    }
  }

  const handleSubmit = async (e) => {
    setValidated(true);
    e.preventDefault()
    e.stopPropagation()
    e.preventDefault()
    if (userDetails.email && userDetails.password && passErrorMsg===null) {
      let dataToSend = {
          email: userDetails.email,
          password:userDetails.password
      }
      setLoading(true);
      try {
        setResponse(await registerUser(dataToSend))
        setLoading(false);
            // console.log('response',response?.status)
        if (response.error) {
            // console.log('try if block response',response)
          setToasterMessage(response?.error?.message || 'Something Went Worng')
          setShowToaster(true)
        } else {
          setToasterMessage('New user created')
          setShowToaster(true)
          setErrorMsg(null)
        }
      } catch (error) {
          // console.log("error block",error)
        setToasterMessage(error?.response?.data?.message || 'Something Went Worng')
        setShowToaster(true)
        setLoading(false);
      }
    } else {
      console.log('Form is invalid ------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    }
      
        
  }

  const handleSubmitOtp = async (e) =>{
    e.preventDefault()
    e.stopPropagation()
    e.preventDefault()
    setValidated(true);

    let dataToSend= {
      email: userDetails.email,
      otp:otp,
    }
    let userData = {
      name: userDetails.firstName +" "+ userDetails.lastName,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      userName: userDetails.userName,
      password: userDetails.password,
      repeat: userDetails.repeat
    }
    let userNameCheck= {
      userName: userDetails.userName,
      email: userDetails.email
    }
    let userLoginData={
      email: userDetails.email,
      password: userDetails.password
    }
    setLoading(true);

    try {
      setOtpResponse(await verifyOtp(dataToSend))
      setLoading(false);

          // console.log('Otp',otp)
          // console.log('Otp response',otpResponse?.status)

      if (otpResponse.error) {
          // console.log('try if block otpResponse',otpResponse)
        setToasterMessage(otpResponse?.error?.message || 'Something Went Worng')
        setShowToaster(true)
      } else {
        // console.log('try else block otpResponse',otpResponse?.message)

        setToasterMessage(otpResponse?.message || 'otp verified successfully!')
        setShowToaster(true)
        setErrorMsg(null)
        setLoading(false);

       

        try {
          setLoading(true);
          const checkUname=(await checkUserName(userNameCheck))  // check user name api call
          setLoading(false);
          
          if (checkUname.error) {
            // console.log('try if block otpResponse',otpResponse)
          setToasterMessage(checkUname?.error?.message || 'Something Went Worng')
          setShowToaster(true)
        } else {
          // console.log('try else block otpResponse',otpResponse?.message)
  
          setToasterMessage(checkUname?.message || 'User name valid')
          setShowToaster(true)
          setErrorMsg(null)

          try {
            const signup=(await userSignup(userData))
            setLoading(false);

            if (signup.error) {
              // console.log('try if block otpResponse',otpResponse)
            setToasterMessage(signup?.error?.message || 'Something Went Worng')
            setShowToaster(true)
          } else {
            // console.log('try else block otpResponse',otpResponse?.message)
            setToasterMessage(signup?.message || 'Signed up successfully!!')
            setShowToaster(true)
            setErrorMsg(null)
            try {
              setLoading(true);
              const login=(await userLogin(userLoginData));
              setLoading(false);
              
              if (login.error) {
                console.log('try if block otpResponse',otpResponse)
              setToasterMessage(login?.error?.message || 'cannot login Something Went Worng')
              setShowToaster(true)
            } else {
              // console.log('try else block otpResponse',otpResponse?.message)
              localStorage.setItem('_u', JSON.stringify(login.data))
              setToasterMessage(login?.message || 'Logged IN!!')
              setShowToaster(true)
              setErrorMsg(null)
              navigate('/');
            }
          }
             
            catch (error) {
              setToasterMessage(error?.response?.data?.message || 'cant login Something Went Worng')
              setShowToaster(true)
              setLoading(false);
            }

          }
  
          } 
          catch (error) {
            setToasterMessage(error?.response?.data?.message || 'Something Went Worng')
            setShowToaster(true)
            setLoading(false);

          }
        }

        } 
        catch (error) {
          setToasterMessage(error?.response?.data?.message || 'Something Went Worng')
          setShowToaster(true)
          setLoading(false);

        }

        // navigate('/create-profile');
      }
    } catch (error) {
        // console.log("error block",error?.response?.data?.status)
      setToasterMessage(error?.response?.data?.message || 'Something Went Worng')
      setShowToaster(true)
      setLoading(false);

    }
  
    
    // if(otpResponse?.status === 200){
    //   navigate('/create-profile');
    // }
  }

  return (
    <React.Fragment>
      <div className="signup-page-wrapper">
      {/* <h2>Sign Up</h2> */}
        <div className="signup-page-container">
          
        {response?.status !== 200 &&   
        <Form noValidate validated={validated} onSubmit={handleSubmit} >
            <Row className="mb-3">
              <Form.Label>All fields marked with an asterisk(*) are mandatory</Form.Label>
              <Form.Group as={Col} md="4" >
                <Form.Label className="small-lable">Username</Form.Label>
                <Form.Control required type="text" value={userDetails.userName} onChange={({ target }) => setUserDetails({ ...userDetails,userName:target.value})}  ></Form.Control>
                <Form.Control.Feedback type="invalid">username is required !!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" >
                <Form.Label className="small-lable">First Name</Form.Label>
                <Form.Control required type="text" onChange={({ target }) => setUserDetails({ ...userDetails,firstName:target.value})} value={userDetails.firstName} ></Form.Control>
                <Form.Control.Feedback type="invalid">first name is required !!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" >
                <Form.Label className="small-lable">Last name </Form.Label>
                <Form.Control required type="text" onChange={({ target }) => setUserDetails({ ...userDetails,lastName:target.value})} value={userDetails.lastName} ></Form.Control>
                <Form.Control.Feedback type="invalid">last Name is required !!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" >
                <Form.Label className="small-lable">email </Form.Label>
                <Form.Control required type="email" onChange={({ target }) => setUserDetails({ ...userDetails,email:target.value})} value={userDetails.email} ></Form.Control>
                <Form.Control.Feedback type="invalid"> <span> {userDetails.email && 'Valid E-mail is required !'} </span> <span> {!userDetails.email && 'E-mail is required'} </span> </Form.Control.Feedback>
                <Form.Control.Feedback> <span className="custom-error-msg"> {errorMsg && 'Valid E-mail is required !'}</span> </Form.Control.Feedback>
              </Form.Group>
           
              <Form.Group as={Col} md="4" >
                <Form.Label className="small-lable">Password</Form.Label>
                <Form.Control required type="password" onChange={({ target }) => setUserDetails({ ...userDetails,password:target.value})} value={userDetails.password}  minLength='8' ></Form.Control>
                <Form.Control.Feedback type="invalid">Password is required (8 character)</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" >
                <Form.Label className="small-lable">Confirm Password</Form.Label>
                <Form.Control required type="password" onChange={({ target }) => setUserDetails({ ...userDetails,repeat:target.value})} value={userDetails.repeat}  minLength='8' ></Form.Control>
                <Form.Control.Feedback type="invalid">Password do not match</Form.Control.Feedback>
                <Form.Control.Feedback> <span className="custom-error-msg"> {passErrorMsg && 'Passwords do not match'}</span> </Form.Control.Feedback>
              </Form.Group>
              </Row>
                <div> <button type="submit"  className="signup-submit-button " onClick={handleSubmit} > Signup </button> </div>

          </Form> }


          {response?.status === 200 &&   
               <Form noValidate validated={validated} onSubmit={handleSubmitOtp} >
              <Row className="mb-3">
                <Form.Group >
                  <Form.Label className="small-lable">Enter 6 digit OTP received on email</Form.Label>
                  <Form.Control className='otp-input' id='partitioned' required type="number" value={otp} onChange={({ target }) => setOtp(target.value)}  maxLength='6'></Form.Control>
                  <Form.Control.Feedback type="invalid"> <span> Enter OTP</span> </Form.Control.Feedback>
                  <Form.Control.Feedback> <span className="custom-error-msg"> {errorMsg && 'Incorrect OTP'}</span> </Form.Control.Feedback>
                </Form.Group>
                
              </Row>
                <div> <button type="submit"  className="signup-submit-button " onClick={handleSubmitOtp} > verify </button> </div>
          </Form> }

          
        </div>
        <div className='otp-container'>

        </div>
        {loading ? <Loader /> : null} {toaster && ( <Toaster message={toasterMessage} show={toaster} close={() => showToaster(false)} /> )}

      </div>
    </React.Fragment>
  )
}

export default Signup
