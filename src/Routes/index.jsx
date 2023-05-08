/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import ErrorPage from '../Pages/Error404';
import Dashboard from '../Pages/Dashboard';
import AdminDashboard from '../Pages/AdminDashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import WithoutNav from './WithoutNav';
import WithNav from './WithNav';
import About from '../Pages/About';
import Pool from '../Pages/Pool';
import PoolListing from '../Pages/Admin/Pool';
import AddPot from '../Pages/Admin/Pool/addPot';
import Roadmap from '../Pages/Roadmap';
import Wallet from '../Pages/Wallet';
import Party from '../Pages/Party';
import { Authenticator } from '../Auth/authenticator'
import { AuthenticatorAdmin } from '../Auth/authenticatorAdmin'
import AuthProvider from '../Auth/authProvider';
import { useState } from 'react'
import UsersListing from '../Pages/AdminDashboard/UsersList';
import Signup from '../Pages/Signup/Signup'
import ForgotPassword from '../Pages/ForgotPassword/forgotpassword';
import ViewPot from '../Pages/Admin/Pool/viewPot';
import Privacy from '../Pages/PrivacyPolicy';
import { CheckUser } from '../Auth/checkUser';
import { AuthenticatorUser } from '../Auth/authenticatorUser';
import PotPage from '../Pages/Pots';
import { useSelector } from 'react-redux';
import ResetPassword from '../Pages/ResetPassword/resetpassword';
import UserProfile from '../Pages/UserProfile/User';
import { CheckUserLogin } from '../Auth/checkUserLogin';
import GoogleSignup from '../Pages/Signup/googleSignup';


const NavigationRouter = () => {
  const [role, setRole] = useState(null)
  let strAuth = useSelector(state => state.user.user)

  useEffect(() => {
    let _u = JSON.parse(strAuth)
    let r = _u?.user?.role
    setRole(r)
  }, [role,strAuth])

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<WithoutNav />}>
              <Route exact path="/login" element={<CheckUser><Login /></CheckUser>} />
              <Route exact path="/signup" element={<CheckUser><Signup/></CheckUser>} />
              <Route path="/error-page" element={<ErrorPage />} />
              <Route exact path='/forgotPassword' element={<CheckUser><ForgotPassword/></CheckUser>}></Route>
              <Route exact path='/auth/change-password/:token' element={<CheckUser><ResetPassword/></CheckUser>}></Route>
              <Route exact path="auth/social/:user" element={<GoogleSignup />} /> 
            </Route>
            
            <Route element={<WithNav />}>
            <Route exact path="/admin-dashboard" element={<AuthenticatorAdmin><AdminDashboard /></AuthenticatorAdmin>} /> 
              <Route exact path="/" element={<AuthenticatorUser> <Dashboard /> </AuthenticatorUser> } />
              <Route exact path="/about" element={<About />} />
              <Route path="/" element={<Dashboard />} />
              <Route exact path="/party" element={<Party />} />
              <Route exact path="/roadmap" element={<Roadmap />} />
              <Route exact path="/pool" element={<AuthenticatorUser><Pool /></AuthenticatorUser>} />
              <Route exact path="/wallet" element={<Authenticator><Wallet /></Authenticator>} />
              <Route exact path="/user-listing" element={<AuthenticatorAdmin><UsersListing /></AuthenticatorAdmin>} />
              <Route exact path="/pool-listing" element={<AuthenticatorAdmin><PoolListing /></AuthenticatorAdmin>} />
              <Route exact path="/addPot" element={<AuthenticatorAdmin><AddPot /></AuthenticatorAdmin>} />
              <Route exact path="/viewPot" element={<AuthenticatorAdmin><ViewPot /></AuthenticatorAdmin>} />
              <Route exact path="/privacy" element={<Privacy />} /> 
              <Route exact path="/user-profile" element={<CheckUserLogin><UserProfile/></CheckUserLogin>}/>
              <Route exact path="/:type" element={<PotPage />} /> 
            </Route>
        
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
     }
  export default NavigationRouter;
 
