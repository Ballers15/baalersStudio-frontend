import React from "react";
import { useState } from "react";
import { useAuth } from '../../Auth/authProvider';
import Form from "react-bootstrap/Form";
import './Login.css';
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";
import ApiLoader from "../../Components/apiLoader";
import google from '../../Assest/img/google.png';
import { environment } from "../../Environments/environment";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [emailErrorMsg,setEmailErrorMsg]= useState(null)
    const isLoading = useSelector(state => state.loading.isLoading)
    const auth = useAuth()
    
    /**
     * If form is valid run login API
     * @param e Events  
     */
    const handleLogin = (e) => {
          setValidated(true);
        e.preventDefault();
        e.stopPropagation();
        e.preventDefault();
       
        const form = e.currentTarget;
        // console.log("handlee",form.checkValidity())
        if (form.checkValidity() === true) {
            
            if (email && password ) {
            let dataToSend = {
                email: email,
                password:password
            }
            // console.log("HI IAM INSIDE THIS");

            auth.login(dataToSend)
            
        } else {
            console.log('<<<<<<<<<<<<<<<<<<<<<-------------------Form is invalid ------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        }
        }
    }
    /**
     * Validates email
     * @param e Event
     */
    const emailValidation = (e) => {
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

      const hanldePassword = (e)  =>{
        setPassword(e.target.value);
        auth.setPassErrorMsg(null)
      }
    
      const gSignup = async() => {
        let google =environment.apiUrl+'auth/v1/google'
        window.location.href=google
      }

    return (
        <React.Fragment>
            <div className="Login-component">     
                   
                    <div className="login-box">
                        <h2 className="login-head">Welcome <br/> Back !</h2>
                    <Form noValidate validated={validated} onSubmit={handleLogin}>
                        <Form.Group className="mt-3" >
                           
                            <Form.Control
                                required
                                type="email"
                                
                                placeholder="Email"
                                value={email}
                                onChange={(e)=>{emailValidation(e)}} />
                         
                             <Form.Control.Feedback type="invalid">{emailErrorMsg  ? '':'Email is Required!'}</Form.Control.Feedback>
                                <span className="custom-error-msg"> {emailErrorMsg} </span>
                            </Form.Group>
                        <Form.Group className="mt-3" >
                            
                            <Form.Control
                                required
                                type="password"
                                placeholder="Password"
                                value={password}
                                minLength='8'
                                onChange={(e)=>{hanldePassword(e)}}
                            />
                <Form.Control.Feedback type="invalid">{auth.passErrorMsg ? '' : 'Password is required '}</Form.Control.Feedback>
                            <span className="custom-error-msg">
                                {auth.passErrorMsg}
                            </span>
                        </Form.Group>
                       
                        <div>
                        <div className="playBtn">
                            <button type="submit">
                                <span></span>SIGN IN
                            </button>
                        </div>
                        <div className='divider'>
                  <span className='line-left'></span> or  <span className='line-right'></span></div>
              <div className="signUp-google">  <a onClick={()=> {gSignup()}}> <span></span> <img className='gIcon' src={google} alt="google" /> SIGN IN with google  </a> </div>
                        </div>
                        <div className="login-forget-password">
                        <Link to='/forgotPassword'> <span>Forgot password?</span></Link>
                        </div>
                    <div>
                    <div className='alreadyAcc'>
                        <span>New to Ballers?</span>
                        <Link to='/signup'> <span>Sign Up</span></Link> 
                    </div>

                    </div>
                    </Form>
                    </div>
            </div>
            {isLoading ? <ApiLoader /> : null} 
        </React.Fragment>
    )
}

export default Login;