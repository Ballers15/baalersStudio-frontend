import React from "react";
import { useState } from "react";
import { useAuth } from '../../Auth/authProvider';
import Form from "react-bootstrap/Form";
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    
    const auth = useAuth()
    const handleLogin = (e) => {
        setValidated(true);
        e.preventDefault();
        e.stopPropagation();
        e.preventDefault();

        if (email && password) {
            let dataToSend = {
                email: email,
                password:password
            }
            auth.login(dataToSend)
        } else {
            console.log('Form is invalid ------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        }
       
      }

    return (
        <React.Fragment>
            <div className="Login-component">
                <div className="login-box">
                    <span className="login-head">
                        SIGN IN FOR UPDATES!
                    </span>
                        {/* <span className="login-form-lable login-email-lable">Email</span>
                        <input type="text" className="login-email-input"  onChange={({ target }) => setEmail(target.value)}></input> */}
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
                            <span className="login-forget-password">Forgot password?</span>
                        </div>
                    <div>
                        <span className="login-signup-tag">New to Ballers?</span>
                        <span className="login-signup-tag-danger">Sign Up</span>
                    </div>
                    </Form>
                    
                        {/* <span className="login-form-lable login-password-lable">Password</span>
                        <input type="text" className="login-password-input"  onChange={({ target }) => setPassword(target.value)}></input> */}
                      
                </div>
            </div>
               
        </React.Fragment>
    )
}

export default Login;