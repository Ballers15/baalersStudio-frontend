import React from "react";
import { useState } from "react";
import { useAuth } from '../../Auth/authProvider';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth()

    const handleLogin = (e) => {
        e.preventDefault();
        let dataToSend = {
            email: email,
            password:password
        }
        auth.login(dataToSend)
      }

    return (
        <React.Fragment>
            <div className="Login-component">
                <div className="login-box">
                    <span className="login-head">
                        SIGN IN FOR UPDATES!
                    </span>
                    <form onSubmit={handleLogin}>
                        <span className="login-form-lable login-email-lable">Email</span>
                        <input type="text" className="login-email-input"  onChange={({ target }) => setEmail(target.value)}></input>
                        <span className="login-form-lable login-password-lable">Password</span>
                        <input type="text" className="login-password-input"  onChange={({ target }) => setPassword(target.value)}></input>
                        <div>
                            <button type="submit" className="login-submit-button">OK</button>
                            <span className="login-forget-password">Forgot password?</span>
                        </div>
                    </form>
                    <div>
                        <span className="login-signup-tag">New to Ballers?</span>
                        <span className="login-signup-tag-danger">Sign Up</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;