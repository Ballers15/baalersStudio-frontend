import React from 'react'
import { useState, useEffect } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import {  Link, useNavigate } from 'react-router-dom'
import Loader from '../../Components/Loader' 
import Toaster from '../../Components/Toaster'
import OtpInput from 'react-otp-input';
import { checkUserName, registerUser, userLogin, userSignup, verifyOtp } from '../../Services/User'
import './Signup.css'

const Signup = () => {
  const [validated, setValidated] = useState(false)
  const [errorMsg,setErrorMsg]= useState(null)
  const [emailErrorMsg,setEmailErrorMsg]= useState(null)
  const [passErrorMsg,setPassErrorMsg]= useState(null)
  const [toasterMessage, setToasterMessage] = useState("");
  const setShowToaster = (param) => showToaster(param);
  const [toaster, showToaster] = useState(false);
  const [response,setResponse] = useState("");
  const [otp, setOtp]=useState("")
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(false);
  const [toasterColor, setToasterColor] = useState('primary')
  const navigate = useNavigate();
  
  const [userDetails, setUserDetails] = useState(
    {
      userName: '',
      email: '',
      password: '',
      repeat:''
    }
  )

  const emailValidation = (e) => {
    console.log("hi i am called");
    setUserDetails({ ...userDetails,email:e.target.value})
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
    setUserDetails({ ...userDetails,repeat:e.target.value})
    // console.log(e.target.value,'//',userDetails.password)
    
    if(e.target.value===userDetails.password)
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

    setUserDetails({ ...userDetails,password:e.target.value})
    // console.log(e.target.value,'//',userDetails.repeat)
    
    if(e.target.value===userDetails.repeat)
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
    // emailValidation(e);
    
  
   const form = e.currentTarget;
    // console.log(form.checkValidity(),form)
    if (form.checkValidity() === true) {
      console.log('validity')
    
    
    if (userDetails.email && userDetails.password && userDetails.userName && userDetails.repeat) {
      let dataToSend = {
          email: userDetails.email,
          password:userDetails.password,
          resend: resend
      }
      setLoading(true);
      try {
        let user = await registerUser(dataToSend)
        setLoading(false);
        if (user.error) {
          setToasterMessage(user?.error?.message || 'Something Went Worng in registering user')
          setShowToaster(true)
          setToasterColor('danger')
        } else {
          if(resend === true){
          setToasterMessage('OTP re sent successfully!')
          }
          else{
          setToasterMessage('New user created')
          }
          setShowToaster(true)
          setErrorMsg(null)
          setToasterColor('success')
          if(user?.status === 200 && resend === false){
          checkUsername()
          }
        }
      } catch (error) {
        setToasterMessage(error?.response?.data?.message || 'Something Went Worng in registering user')
        setShowToaster(true)
        setToasterColor('danger')
        setLoading(false);
      }
    } else {
      console.log('<<<<---Form is invalid --->>>>')
    }
  }
  }

  const checkUsername = async () => {
    let userNameCheck= {
      userName: userDetails.userName,
      email: userDetails.email
    }
    setLoading(true);

    try {
      const checkUname=(await checkUserName(userNameCheck))  // check user name api call
      setLoading(false);
      
      if (checkUname.error) {
      setToasterMessage(checkUname?.error?.message || 'Something Went Worng in checking username')
      setShowToaster(true)
      setToasterColor('danger')
    } else {
      setToasterMessage(checkUname?.message || 'User name valid')
      setShowToaster(true)
      setToasterColor('success')
      setErrorMsg(null)
      if(checkUname?.status === 200){
        setResponse(checkUname)
      }
    }
  } 
    catch (error) {
      setToasterMessage(error?.response?.data?.message || 'Something Went Worng in checking username')
      setShowToaster(true)
      setToasterColor('danger')
      setLoading(false);
    }
     
  }

  const handleSubmitOtp = async (e) =>{
    
    e.preventDefault()
    e.stopPropagation()
    e.preventDefault()
    setValidated(true);
    const form = e.currentTarget;
    console.log('otp',otp);
    if(otp){
    let dataToSend= {
      email: userDetails.email,
      otp:otp,
    }
    setLoading(true);

    try {
      console.log('HI---');
      let otp = (await verifyOtp(dataToSend))
      setLoading(false);
      if (otp.error) {
        setToasterMessage(otp?.error?.message || 'Something Went Worng in OTP verify')
        setShowToaster(true)
        setToasterColor('danger')
      } else {
        setToasterMessage(otp?.message || 'otp verified successfully in OTP verify!')
        setShowToaster(true)
        setToasterColor('success')
        setErrorMsg(null)
        if(otp?.status === 200){
          signup()
        }
      }
    } catch (error) {
      setToasterMessage(error?.response?.data?.message || 'Something Went Worng in OTP verify')
      setErrorMsg('Invalid OTP')
      setShowToaster(true)
      setToasterColor('danger')
      setLoading(false);
    }
  }    
    
  }

  const signup = async () => {
    
    let userData = {
      userName: userDetails.userName,
      email: userDetails.email,
      password: userDetails.password,
      repeat: userDetails.repeat
    }
    if(userData.userName.length && userData.email.length && userData.password.length && userData.repeat.length){
   
    setLoading(true);

    try {
      const signup=(await userSignup(userData))
      setLoading(false);

      if (signup.error) {
      setToasterMessage(signup?.error?.message || 'Something Went Worng in signup')
      setShowToaster(true)
      setToasterColor('danger')
    } else {
      setToasterMessage(signup?.message || 'Signed up successfully!!')
      setShowToaster(true)
      setToasterColor('success')
      setErrorMsg(null)
      if(signup?.status === 200){
      signupLogin()
    }
    }
  } 
    catch (error) {
      setToasterMessage(error?.response?.data?.message || 'Something Went Worng in signup')
      setShowToaster(true)
      setToasterColor('danger')
      setLoading(false);
      }
    }
    else{
      setToasterMessage('All fields are required !!')
      setShowToaster(true)
      setToasterColor('danger')
    }
     
  }



  const signupLogin = async () => {
    let userLoginData={
      email: userDetails.email,
      password: userDetails.password
    }
    setLoading(true);

    try {
      const login=(await userLogin(userLoginData));
      setLoading(false);
      
      if (login.error) {
        // console.log('try if block otpResponse',otpResponse)
      setToasterMessage(login?.error?.message || 'cant login Something Went Worng in userLogin')
      setShowToaster(true)
      setToasterColor('danger')
    } else {
      localStorage.setItem('_u', JSON.stringify(login.data))
      setToasterMessage(login?.message || 'Logged IN!!')
      setShowToaster(true)
      setToasterColor('success')
      setErrorMsg(null)
      navigate('/');
    }
  }
     
    catch (error) {
      setToasterMessage(error?.response?.data?.message || 'cant login Something Went Worng in userLogin')
      setShowToaster(true)
      setToasterColor('danger')
      setLoading(false);
    }
     
  }

  const handleResendOtp = (e) => {
    setResend(true);
    handleSubmit(e)
  }

  return (
    <React.Fragment>
      <div className="signup-page-wrapper">
        <div className="signup-box">
      
        <div className="signup-page-container">
          
        {response?.status !== 200 &&   
        <Form noValidate validated={validated} onSubmit={handleSubmit} >
            <h2 className="login-head">CREATE <br/>ACCOUNT</h2>

              <Form.Group className='pb-4' >
                <Form.Control required type="text"  placeholder="USERNAME" onChange={({ target }) => setUserDetails({ ...userDetails,userName:target.value})} value={userDetails.userName} ></Form.Control>
                <Form.Control.Feedback type="invalid">User name is required !</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='pb-4'>
                <Form.Control required type="email" placeholder="EMAIL" onChange={(e) => emailValidation(e) } value={userDetails.email} ></Form.Control>
                <Form.Control.Feedback type="invalid">{emailErrorMsg  ? '':'Email is Required!'}</Form.Control.Feedback>
                <span className="custom-error-msg"> {emailErrorMsg} </span>
              </Form.Group>
           
              <Form.Group className='pb-4'>
                <Form.Control required type="password"  placeholder="PASSWORD" onChange={(e) => confirmPassword(e)}  value={userDetails.password}  minLength='8' ></Form.Control>
                <Form.Control.Feedback type="invalid">Password is required (8 character)</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='pb-4'>
                <Form.Control required type="password"  placeholder="CONFIRM PASSWORD" onChange={(e) => confirmRepeatPassword(e)} value={userDetails.repeat} >

                </Form.Control>
                <span className="custom-error-msg">{passErrorMsg} </span>

                <Form.Control.Feedback type="invalid">{passErrorMsg ||  'Password do not match'}</Form.Control.Feedback>
              </Form.Group>

              {['checkbox'].map((type) => (
                            <div  className="mb-3 mt-4">
                            <Form.Check
                                inline
                                label="Agree to terms & conditions."
                                name="group1"
                                type={type} />
                            </div>
                        ))}
              <div className="playBtn">  <button type="submit"   > <span></span>SIGN Up  </button> </div>

           <div className='alreadyAcc'>
           <span>Already have an account?</span>
           <Link to='/login'> <span>Sign In</span></Link> 
           </div>
          </Form> }


          {response?.status === 200 &&   
            <Form noValidate validated={validated} onSubmit={handleSubmitOtp} className="otpVerify">
               <h2 className="login-head">Verify  <br/>code</h2>
               <p>A 6-digit code has been sent to your mail ID.
                Kindly enter it to proceed.</p>
               <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6} 
                  renderInput={(props) => <input {...props} />}
                />      
                <span className="invalid-feedback">{errorMsg}</span>       
              <div className="playBtn">  <button type="submit"  onClick={handleSubmitOtp}> <span></span> verify  </button> </div>
                <div className='alreadyAcc'>
                 <span>Didn’t get the code?</span>
                  <a onClick={(e)=>{handleResendOtp(e)}}> <span>Resend</span></a> 
                </div>
          </Form> }

          
        </div>
        <div className='otp-container'>

        </div>
        {loading ? <Loader /> : null} {toaster && ( <Toaster message={toasterMessage} show={toaster} close={() => showToaster(false)} bg={toasterColor}/> )}

      </div>
      </div>
    </React.Fragment>
  )
}

export default Signup
