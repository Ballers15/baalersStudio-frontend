import React from "react";
import { useState } from "react";
import { useAuth } from '../../Auth/authProvider';
import Form from "react-bootstrap/Form";
import './Login.css';
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [emailErrorMsg,setEmailErrorMsg]= useState(null)
    
    const auth = useAuth()
    
    const handleLogin = (e) => {
        setValidated(true);
        e.preventDefault();
        e.stopPropagation();
        e.preventDefault();
       
        const form = e.currentTarget;
        // console.log("handlee",form.checkValidity())
        if (form.checkValidity() === true) {
            
            if (email && password && auth.passErrorMsg === null ) {
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
                            {/* <button type="submit" onClick={handleLogin}>SIGN IN</button> */}
                       
                        </div>
                        <div className="login-forget-password">
                        <Link to='/forgotPassword'> <span>Forgot password?</span></Link>
                        </div>
                    <div>
                    <div className='alreadyAcc'>
                        <span>New to Ballers?</span>
                        <Link to='/signup'> <span>Sign Up</span></Link> 
                    </div>
                        {/* <span className="login-signup-tag">New to Ballers?</span>
                    <a href='/signup'> <span className="login-signup-tag-danger">Sign Up</span></a> */}
                    </div>
                    </Form>
                    </div>
                    
            
                {/* <div className="login-box">
                    <span className="login-head">
                        SIGN IN FOR UPDATES!
                    </span>
                    <Form noValidate validated={validated} onSubmit={handleLogin}>
                        <Form.Group  className="login-email-input" >
                            <Form.Label className="login-form-lable login-email-lable">Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                
                                placeholder="Email"
                                value={email}
                                onChange={({ target }) => setEmail(target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Valid E-mail is required
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group  className="login-password-input" >
                            <Form.Label className="login-form-lable login-password-lable">Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Password"
                                value={password}
                                minLength='8'
                                onChange={({ target }) => setPassword(target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                 Password is required (8 character)
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div>
                            <button type="submit" className="login-submit-button" onClick={handleLogin}>OK</button>
                          <a href='/forgotPassword'> <span className="login-forget-password">Forgot password?</span></a>
                        </div>
                    <div>
                        <span className="login-signup-tag">New to Ballers?</span>
                       <Link to='/signup'> <span className="login-signup-tag-danger">Sign Up</span></Link>
                    </div>
                    </Form>
                </div> */}
            </div>
               
        </React.Fragment>
    )
}

export default Login;