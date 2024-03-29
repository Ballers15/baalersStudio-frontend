import React from 'react'
import { useState } from 'react'
import { Form, FormGroup } from 'react-bootstrap'
import {  Link, useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input';
import { checkUserName, registerUser,  userSignup, verifyOtp } from '../../Services/User'
import './Signup.css'
import ApiLoader from '../../Components/apiLoader'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue, setUserData } from "../../Components/Redux/actions";
import backBtn from '../../Assest/img/backBtn.svg';
import google from '../../Assest/img/google.png';
import { environment } from '../../Environments/environment';


const Signup = () => {
  const isLoading = useSelector(state => state.loading.isLoading)
  const dispatch = useDispatch()
  const [validated, setValidated] = useState(false)
  const [errorMsg,setErrorMsg]= useState(null)
  const [emailErrorMsg,setEmailErrorMsg]= useState(null)
  const [passErrorMsg,setPassErrorMsg]= useState(null)
  const [response,setResponse] = useState(false);
  const [otp, setOtp]=useState('')
  const [userNameErr,setUserNameErr] = useState('')
  const [userNameSuccess,setUserNameSuccess] = useState('')
  const navigate = useNavigate();
  const [passValidation, setPassValidation] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isUserNameValid, setIsUserNameValid] = useState(false)

  const [userDetails, setUserDetails] = useState(
    {
      userName: '',
      email: '',
      password: '',
      repeat:''
    }
  )

    /**
    * Validates email
    * @param e Event
    */
  const emailValidation = (e) => {
    // console.log("hi i am called");
    setUserDetails({ ...userDetails,email:e.target.value})
    // console.log(userDetails.email)
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,4})+$/
    const tld = e.target.value?.split('.')[1]?.length
    if(e.target.value!== ''){
    if (regex.test(e.target.value) === false || tld <= 1) {
      setEmailErrorMsg('Valid E-mail is required!')
      setIsEmailValid(false)
    }
    else{
      setEmailErrorMsg(null)
      setIsEmailValid(true)
    }
  }
  else{
    setEmailErrorMsg('Email is  required!')
    setIsEmailValid(false)
    }
  }


    /**
   * Match repeat password
   * @param e Event | Value of input
   */
  const confirmRepeatPassword = (e) =>{
    setUserDetails({ ...userDetails,repeat:e.target.value})
    // console.log(e.target.value,'//',userDetails.password)
    
    if(e.target.value===userDetails.password)
    {
      // console.log('inside if detting null')
      setPassErrorMsg(null)
      setPassValidation (true);
    }
    else{
      setPassErrorMsg('Passwords do not match!')
      setPassValidation (false);
    }
    // console.log('end ',passErrorMsg)
  }

    /**
   * Match password
   * @param e Event | Value of input
   */
  const confirmPassword = (e) =>{
    setUserDetails({ ...userDetails,password:e.target.value})
    // console.log(e.target.value,'//',userDetails.repeat)
    
    if(e.target.value===userDetails.repeat)
    {
      // console.log('inside if detting null')
      setPassErrorMsg(null)
      setPassValidation (true);
    }
    else{
      setPassErrorMsg('Passwords do not match!')
      setPassValidation (false);
    }
    // console.log('end ',passErrorMsg)
  }

    /**
   *Calls Registers user func. if input data is  valid
   * @param e Event
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.preventDefault()
    setValidated(true);
   
  
   const form = e.currentTarget;
    // console.log(form.checkValidity(),form)
    if (form.checkValidity() === true && isUserNameValid === true) {
      
      // console.log('validity')
    if (userDetails.email && userDetails.password && userDetails.userName && userDetails.repeat && passValidation && isEmailValid ) {
        registerUsers();
    } 
  }
    else {
      console.log('<<<<---Form is invalid --->>>>')
      }
  }

/**
 * Register users
 */
const registerUsers = async () => {
        let dataToSend = {
          email: userDetails.email,
          userName: userDetails.userName.trim(),
          password:userDetails.password,
      }
      dispatch(setLoadingTrue());
      try {
        let user = await registerUser(dataToSend)
        dispatch(setLoadingFalse());
     
        if (user.error) {
          
          toast.dismiss();
          toast.error(user?.error?.message || 'Something went worng in registering user')
        } else {
          
          toast.dismiss();
          toast.success('Success!! Please check your mail')
          setErrorMsg(null)
          setResponse(true)
            }
        } catch (error) {
          
          toast.dismiss();
          toast.error(error?.response?.data?.message || 'Something went worng in registering user')
          dispatch(setLoadingFalse());
        }
      }

      
  /**checks username  */
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
        
        toast.dismiss();
        // toast.error(checkUname?.error?.message || 'Something went worng in checking username')
        setUserNameErr('Username Already Exists')
        setUserNameSuccess('')
        // console.log(checkUname)
        setIsUserNameValid(false)
    } else {
      
      // toast.success(checkUname?.message || 'Username is valid')
      setUserNameSuccess('Username is valid!')
      setUserNameErr('')
      if(checkUname?.status === 200){
        setIsUserNameValid(true)
      }
    }
  } 
    catch (error) {
      setUserNameErr(error?.response?.data?.message ||'Username is invalid!')
      setUserNameSuccess('')
      setIsUserNameValid(false)
      dispatch(setLoadingFalse());
    }
  }

  /**
   * Verifies otp s
   * @param e Event
   */
  const handleSubmitOtp = async (e) =>{
    setValidated(true)
    e.preventDefault()
    e.stopPropagation()
    e.preventDefault()
    if(otp === '' || otp.length !== 6)  
      {
        toast.dismiss();
        toast.error('OTP is required')
      }
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
        toast.dismiss();
        toast.error(otp?.error?.message || 'Something went worng in OTP verify')
      } else {
        setErrorMsg(null)
        if(otp?.status === 200){
          signup()
        }
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Something went worng in OTP verify')
      dispatch(setLoadingFalse());
    }
  }    
  }

  /**
   * Resend otp
   */
  const reSendOtp = async () => {
    let dataToSend = {
      email: userDetails.email,
      userName: userDetails.userName.trim(),
      password:userDetails.password,
      resend: true
  }
  dispatch(setLoadingTrue());
  try {
    let user = await registerUser(dataToSend)
    dispatch(setLoadingFalse());
    if (user.error) {
      
      toast.dismiss();
      toast.error(user?.error?.message || 'Something went worng in registering user')
    } else {
      
      toast.dismiss();
      toast.success('OTP sent successfully!')
      setErrorMsg(null)
    }
    } catch (error) {
      
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Something went worng in registering user')
      dispatch(setLoadingFalse());
    }
  }

  /**
   * Signup and signin registered user
   */
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
        toast.dismiss();
        toast.error(signup?.error?.message || 'Something went worng in signup')
    } else {
      // toast.success(signup?.message || 'Signed up successfully!!')
      setErrorMsg(null)
      dispatch(setUserData(JSON.stringify(signup?.data)))
      navigate('/');
      }
    }
  
    catch (error) {
      
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Something went worng in signup')
      dispatch(setLoadingFalse());
      }
    }
    else{
      toast.dismiss();
      toast.error('All fields are required!!')
    }
  }

  const gSignup = async() => {
    let google =environment.apiUrl+'auth/v1/google'
    window.location.href=google
  }

  /**
   * Calls checkUsername() function when focus changes
   * @param e Event
   */
  const handleBlur = () => {
    if(userDetails.userName!== '' && userDetails.userName.trim()!=='')
    checkUsername();
  }


  return (
    <React.Fragment>
      <div className="signup-page-wrapper">
        <div className="signup-box">
      
        <div className="signup-page-container">
        <img className='signUpbackBtn' src={backBtn} alt="back" onClick={()=>{navigate(-1)}}/>
          
        {response === false &&   
        <Form noValidate validated={validated} onSubmit={handleSubmit} className='w-100'>
        
            <h2 className="login-head">CREATE <br/>ACCOUNT</h2>

              <Form.Group className='pb-4' >
                <Form.Control required type="text"  placeholder="USERNAME"
                 onChange={({ target }) => {setUserDetails({ ...userDetails,userName:target.value}); setUserNameSuccess('')}} 
                 value={userDetails.userName} 
                 onBlur={handleBlur} 
                 isValid={isUserNameValid}
                 ></Form.Control>
                <Form.Control.Feedback type="invalid">Username is required!</Form.Control.Feedback>
                <span className="custom-success-msg"> {isUserNameValid && !userNameErr && userNameSuccess} </span>
                <span className="custom-error-msg"> {!isUserNameValid && userNameErr} </span>
              </Form.Group>

              <Form.Group className='pb-4'>
                <Form.Control required type="email" placeholder="EMAIL" onChange={(e) => emailValidation(e)} onBlur={()=>{setUserNameSuccess('')}} value={userDetails.email}  ></Form.Control>
                <Form.Control.Feedback type="invalid">{emailErrorMsg  ? '':'Email is Required!'}</Form.Control.Feedback>
                <span className="custom-error-msg"> {emailErrorMsg} </span>
              </Form.Group>
           
              <Form.Group className='pb-4'>
                <Form.Control required type="password"  placeholder="PASSWORD" onChange={(e) => confirmPassword(e)}  value={userDetails.password}  minLength='8' ></Form.Control>
                <Form.Control.Feedback type="invalid">Password is required (8 character)!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='pb-4'>
                <Form.Control required type="password"  placeholder="CONFIRM PASSWORD" onChange={(e) => confirmRepeatPassword(e)} value={userDetails.repeat} ></Form.Control>
                <span className="custom-error-msg">{passErrorMsg} </span>
                <Form.Control.Feedback type="invalid">{passErrorMsg ||  'Passwords do not match'}</Form.Control.Feedback>
              </Form.Group>

              <div  className="mb-2">
                 <Form.Check
                    inline
                    label="Agree to Terms & Conditions."
                    name="agree T&C"
                    required/>
              </div>
                 
              <div className="playBtn">  <button type="submit" > <span></span>SIGN Up  </button> </div>
                 <div className='divider'>
                  <span className='line-left'></span> or  <span className='line-right'></span></div>
              <div className="signUp-google">  <a onClick={()=> {gSignup()}}> <span></span> <img className='gIcon' src={google} alt="google" /> SIGN Up with google  </a> </div>
           <div className='alreadyAcc'>
           <span>Already have an account?</span>
           <Link to='/login'> <span>Sign In</span></Link> 
           </div>
          </Form>
           } 

                
            { isUserNameValid ===  true && response === true 
            && <Form noValidate validated={validated} onSubmit={handleSubmitOtp} className="otpVerify">
               <h2 className="login-head">Verify  <br/>code</h2>
               <p>A 6-digit code has been sent to your mail id.
                Kindly enter it to proceed.</p>
            <FormGroup>
               <OtpInput 
                  inputType='tel'
                  value={otp}
                  onChange={(e)=>{setOtp(e)}}
                  numInputs={6} 
                  renderInput={(props) => <input {...props} />}
                />     
                   <Form.Control
                      type='hidden'
                      />
              </FormGroup>
                <span className="invalid-feedback">{errorMsg}</span>       
              <div className="playBtn">  <button type="submit" > <span></span> verify  </button> </div>
                <div className='alreadyAcc'>
                 <span>Didn’t get the code?</span>
                  <a onClick={(e)=>reSendOtp(e)}> <span>Resend</span></a> 
                </div>
          </Form> }
        </div>
        
        

      </div>
      </div>
      {isLoading ? <ApiLoader /> : null} 

    </React.Fragment>
  )
}

export default Signup
