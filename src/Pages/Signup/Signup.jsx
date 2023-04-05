import React from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import {  Link, useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input';
import { checkUserName, registerUser, userLogin, userSignup, verifyOtp } from '../../Services/User'
import './Signup.css'
import ApiLoader from '../../Components/apiLoader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../Components/Redux/actions";

const Signup = () => {

  const isLoading = useSelector(state => state.loading.isLoading)
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(false)
  const [errorMsg,setErrorMsg]= useState(null)
  const [emailErrorMsg,setEmailErrorMsg]= useState(null)
  const [passErrorMsg,setPassErrorMsg]= useState(null)
  const [response,setResponse] = useState(false);
  const [userNameCheck, setUserNameCheck] = useState(false)
  const [otp, setOtp]=useState("")
  const [userNameErr,setUserNameErr] = useState('')
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
    // console.log("hi i am called");
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
    }
    else{
      setPassErrorMsg('Passwords do not match')
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
      // console.log('validity')
    
    
    if (userDetails.email && userDetails.password && userDetails.userName && userDetails.repeat) {
        registerUsers();
    } 
  }
  else {
    console.log('<<<<---Form is invalid --->>>>')
  }
  }

const registerUsers = async () => {
        let dataToSend = {
          email: userDetails.email,
          password:userDetails.password,
      }
      dispatch(setLoadingTrue());
      try {
        let user = await registerUser(dataToSend)
        dispatch(setLoadingFalse());
        if (user.error) {
          toast.error(user?.error?.message || 'Something Went Worng in registering user')
        } else {
          toast.success('Success!! Please check your mail')
          setErrorMsg(null)
          setResponse(true)
            }
        } catch (error) {
          toast.error(error?.response?.data?.message || 'Something Went Worng in registering user')
        dispatch(setLoadingFalse());
        }
      }

      

  const checkUsername = async () => {
    
    let dataToSend= {
      userName: userDetails.userName.trim(),
    }
    dispatch(setLoadingTrue());

    try {
      const checkUname=(await checkUserName(dataToSend))  // check user name api call
      dispatch(setLoadingFalse());
      // console.log(checkUname)
      
      if (checkUname.error) {
        toast.error(checkUname?.error?.message || 'Something Went Worng in checking username')
      setUserNameErr('Username Alredy Exists')

    } else {
      // toast.success(checkUname?.message || 'Username is valid')
      setUserNameErr('Username is valid !')
      setErrorMsg(null)
      if(checkUname?.status === 200){
        setUserNameCheck(true)
      }
    }
  } 
    catch (error) {
      toast.error(error?.response?.data?.message || 'Something Went Worng in checking username')
      dispatch(setLoadingFalse());
    }
     
  }

  const handleSubmitOtp = async (e) =>{
    e.preventDefault()
    e.stopPropagation()
    e.preventDefault()
    setValidated(true);

    if(otp.length === 6){
    let dataToSend= {
      email: userDetails.email,
      otp:otp,
    }
    dispatch(setLoadingTrue());

    try {
      // console.log('HI---');
      let otp = (await verifyOtp(dataToSend))
      dispatch(setLoadingFalse());
      if (otp.error) {
        toast.error(otp?.error?.message || 'Something Went Worng in OTP verify')
      } else {
        toast.success(otp?.message || 'otp verified successfully in OTP verify!')
        setErrorMsg(null)
        if(otp?.status === 200){
          signup()
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something Went Worng in OTP verify')
      setErrorMsg('Invalid OTP')
      dispatch(setLoadingFalse());
    }
  }    
  }

  const reSendOtp = async () => {
    let dataToSend = {
      email: userDetails.email,
      password:userDetails.password,
      resend: true
  }
  dispatch(setLoadingTrue());
  try {
    let user = await registerUser(dataToSend)
    dispatch(setLoadingFalse());
    if (user.error) {
      toast.error(user?.error?.message || 'Something Went Worng in registering user')
    } else {
      toast.success('OTP re sent successfully!')
      setErrorMsg(null)
    }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something Went Worng in registering user')
    dispatch(setLoadingFalse());
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
   
    dispatch(setLoadingTrue());

    try {
      const signup=(await userSignup(userData))
      dispatch(setLoadingFalse());

      if (signup.error) {
        toast.error(signup?.error?.message || 'Something Went Worng in signup')
    } else {
      toast.success(signup?.message || 'Signed up successfully!!')
      setErrorMsg(null)
      if(signup?.status === 200){
      signupLogin()
    }
    }
  } 
    catch (error) {
      toast.error(error?.response?.data?.message || 'Something Went Worng in signup')
      dispatch(setLoadingFalse());
      }
    }
    else{
      toast.error('All fields are required !!')
    }
     
  }



  const signupLogin = async () => {
      let userLoginData={
        email: userDetails.email,
        password: userDetails.password
      }
      dispatch(setLoadingTrue());

      try {
        const login=(await userLogin(userLoginData));
        dispatch(setLoadingFalse());
        
        if (login.error) {
          toast.error(login?.error?.message || 'cant login Something Went Worng in userLogin')

      } else {
        localStorage.setItem('_u', JSON.stringify(login.data))
        toast.success(login?.message || 'Logged IN!!')
        setErrorMsg(null)
        navigate('/');
      }
    }
      
      catch (error) {
        toast.error(error?.response?.data?.message || 'cant login Something Went Worng in userLogin')
        dispatch(setLoadingFalse());
      }
     
    }

  const handleBlur = (e) => {
    if(userDetails.userName !== '' && userDetails.userName.trim()!=='')
    checkUsername();
  }

  return (
    <React.Fragment>
      <div className="signup-page-wrapper">
        <div className="signup-box">
      
        <div className="signup-page-container">
          
        {response === false &&   
        <Form noValidate validated={validated} onSubmit={handleSubmit} >
            <h2 className="login-head">CREATE <br/>ACCOUNT</h2>

              <Form.Group className='pb-4' >
                <Form.Control required type="text"  placeholder="USERNAME" onChange={({ target }) => setUserDetails({ ...userDetails,userName:target.value})} value={userDetails.userName} onBlur={handleBlur}></Form.Control>
                <Form.Control.Feedback type="invalid">User name is required !</Form.Control.Feedback>
                <span className="custom-success-msg"> {userNameErr} </span>
              </Form.Group>

              <Form.Group className='pb-4'>
                <Form.Control required type="email" placeholder="EMAIL" onChange={(e) => emailValidation(e) } value={userDetails.email} onBlur={()=>{setUserNameErr('')}} ></Form.Control>
                <Form.Control.Feedback type="invalid">{emailErrorMsg  ? '':'Email is Required!'}</Form.Control.Feedback>
                <span className="custom-error-msg"> {emailErrorMsg} </span>
              </Form.Group>
           
              <Form.Group className='pb-4'>
                <Form.Control required type="password"  placeholder="PASSWORD" onChange={(e) => confirmPassword(e)}  value={userDetails.password}  minLength='8' ></Form.Control>
                <Form.Control.Feedback type="invalid">Password is required (8 character)</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='pb-4'>
                <Form.Control required type="password"  placeholder="CONFIRM PASSWORD" onChange={(e) => confirmRepeatPassword(e)} value={userDetails.repeat} ></Form.Control>
                <span className="custom-error-msg">{passErrorMsg} </span>
                <Form.Control.Feedback type="invalid">{passErrorMsg ||  'Password do not match'}</Form.Control.Feedback>
              </Form.Group>

             
                            <div  className="mb-3 mt-4">
                            <Form.Check
                                inline
                                label="Agree to terms & conditions."
                                name="agree t&c"
                                 />
                            </div>
                 
              <div className="playBtn">  <button type="submit"   > <span></span>SIGN Up  </button> </div>

           <div className='alreadyAcc'>
           <span>Already have an account?</span>
           <Link to='/login'> <span>Sign In</span></Link> 
           </div>
          </Form> } 

                
            { userNameCheck === true && response === true && <Form noValidate validated={validated} onSubmit={handleSubmitOtp} className="otpVerify">
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
                  <a onClick={(e)=>reSendOtp(e)}> <span>Resend</span></a> 
                </div>
          </Form> }

          
        </div>
 
        
        <ToastContainer theme="colored"/>

      </div>
      </div>
      {isLoading ? <ApiLoader /> : null} 

    </React.Fragment>
  )
}

export default Signup
