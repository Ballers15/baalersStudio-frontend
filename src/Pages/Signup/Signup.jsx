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
  const [passErrorMsg,setPassErrorMsg]= useState(null)
  const [toasterMessage, setToasterMessage] = useState("");
  const setShowToaster = (param) => showToaster(param);
  const [toaster, showToaster] = useState(false);
  const [response,setResponse] = useState("");
  const [otp, setOtp]=useState("")
  const [otpResponse,setOtpResponse]=useState("")
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
  useEffect(() => {
  emailValidation(userDetails.email)
  confirmPassword()
  // console.log(userDetails)
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
          password:userDetails.password,
          resend: resend
      }
      setLoading(true);
      try {
        let user=(await registerUser(dataToSend))
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
      console.log('Form is invalid ------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
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

    let dataToSend= {
      email: userDetails.email,
      otp:otp,
    }
    setLoading(true);

    try {
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
      setShowToaster(true)
      setToasterColor('danger')
      setLoading(false);
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
            {/* <Row className="mb-3"> */}
              {/* <Form.Label>All fields marked with an asterisk(*) are mandatory</Form.Label> */}
              {/* <Form.Group  className='pb-4'>
                <Form.Label className="small-lable">Username</Form.Label>
                <Form.Control required type="text" value={userDetails.userName} onChange={({ target }) => setUserDetails({ ...userDetails,userName:target.value})}  ></Form.Control>
                <Form.Control.Feedback type="invalid">username is required !!</Form.Control.Feedback>
              </Form.Group> */}

              <Form.Group className='pb-4' >
                {/* <Form.Label className="small-lable">First Name</Form.Label> */}
                <Form.Control required type="text"  placeholder="USERNAME" onChange={({ target }) => setUserDetails({ ...userDetails,userName:target.value})} value={userDetails.userName} ></Form.Control>
                <Form.Control.Feedback type="invalid">User name is required !!</Form.Control.Feedback>
              </Form.Group>

              {/* <Form.Group className='pb-4'>
                <Form.Label className="small-lable">Last name </Form.Label>
                <Form.Control required type="text" onChange={({ target }) => setUserDetails({ ...userDetails,lastName:target.value})} value={userDetails.lastName} ></Form.Control>
                <Form.Control.Feedback type="invalid">last Name is required !!</Form.Control.Feedback>
              </Form.Group> */}

              <Form.Group className='pb-4'>
                {/* <Form.Label className="small-lable">email </Form.Label> */}
                <Form.Control required type="email" placeholder="EMAIL" onChange={({ target }) => setUserDetails({ ...userDetails,email:target.value})} value={userDetails.email} ></Form.Control>
                <Form.Control.Feedback type="invalid"> <span> {userDetails.email && 'Valid E-mail is required !'} </span> <span> {!userDetails.email && 'E-mail is required'} </span> </Form.Control.Feedback>
                <Form.Control.Feedback> <span className="custom-error-msg"> {errorMsg && 'Valid E-mail is required !'}</span> </Form.Control.Feedback>
              </Form.Group>
           
              <Form.Group className='pb-4'>
                {/* <Form.Label className="small-lable">Password</Form.Label> */}
                <Form.Control required type="password"  placeholder="PASSWORD" onChange={({ target }) => setUserDetails({ ...userDetails,password:target.value})} value={userDetails.password}  minLength='8' ></Form.Control>
                <Form.Control.Feedback type="invalid">Password is required (8 character)</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='pb-4'>
                {/* <Form.Label className="small-lable">Confirm Password</Form.Label> */}
                <Form.Control required type="password"  placeholder="CONFIRM PASSWORD" onChange={(e) => setUserDetails({ ...userDetails,repeat:e.target.value})} value={userDetails.repeat}  minLength='8' ></Form.Control>
                <Form.Control.Feedback type="invalid">Password do not match</Form.Control.Feedback>
                <Form.Control.Feedback> <span className="custom-error-msg"> {passErrorMsg && 'Passwords do not match'}</span> </Form.Control.Feedback>
              </Form.Group>

              {['checkbox'].map((type) => (
                            <div  className="mb-3 mt-4">
                            <Form.Check
                                inline
                                label="Agree to terms & conditions."
                                name="group1"
                                type={type} 
                            />
                            </div>
                        ))}
              {/* </Row> */}
              <div className="playBtn">  <button type="submit"  onClick={handleSubmit}> <span></span>SIGN Up  </button> </div>
                {/* <div> <button type="submit"  className="signup-submit-button " onClick={handleSubmit} > Signup </button> </div> */}

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
              <div className="playBtn">  <button type="submit"  onClick={handleSubmitOtp}> <span></span> verify  </button> </div>
                {/* <div> <button type="submit"  className="signup-submit-button " onClick={handleSubmitOtp} > verify </button> </div> */}
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
