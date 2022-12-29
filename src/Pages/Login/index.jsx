import React from "react";
import './Login.css'
const Login = () => {
    return (
        <React.Fragment>
            <div className="login-box">
                <span className="login-head">
                     SIGN IN FOR UPDATES!
                </span>
                <p className="login-form-lable login-email-lable">Email</p>
                <input type="text" className="login-email-input"></input>
                <p className="login-form-lable login-password-lable">Password</p>
                <input type="text" className="login-password-input"></input>
                <div>
                    <button className="login-submit-button">OK</button>
                    <span className="login-forget-password">Forgot password?</span>
                </div>
                <div>
                    <span className="login-signup-tag">New to Ballers?</span>
                    <span className="login-signup-tag-danger">Sign Up</span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;