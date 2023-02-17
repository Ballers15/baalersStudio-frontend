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
import Metamask from '../Components/Metamask'
import { useState } from 'react'
import UsersListing from '../Pages/AdminDashboard/UsersList';
import Signup from '../Pages/Signup/Signup'
import ForgotPassword from '../Pages/ForgotPassword/forgotpassword';


const NavigationRouter = () => {
  const [role, setRole] = useState(null)
  useEffect(() => {
    let strAuth = localStorage.getItem('_u')
    let _u = JSON.parse(strAuth)
    let r = _u?.user?.role
    setRole(r)
    // console.log('u', r)
  }, [role])
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<WithoutNav />}>
              <Route exact path="/login" element={<Login />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
            <Route element={<WithNav />}>
            if(role === 'ADMIN' ) { <Route exact path="/admin-dashboard" element={<AuthenticatorAdmin><AdminDashboard /></AuthenticatorAdmin>} /> }
              else {<Route exact path="/" element={<Dashboard />} />}
              <Route exact path="/about" element={<About />} />
              <Route path="/:id" element={<Dashboard />} />
              <Route exact path="/party" element={<Party />} />
              <Route exact path="/roadmap" element={<Roadmap />} />
              <Route exact path="/pool" element={<Authenticator><Pool /></Authenticator>} />
              <Route exact path="/wallet" element={<Authenticator><Wallet /></Authenticator>} />
              <Route exact path="/metamask" element={<Metamask />} />
              <Route exact path="/user-listing" element={<AuthenticatorAdmin><UsersListing /></AuthenticatorAdmin>} />
              <Route exact path="/poolListing" element={<AuthenticatorAdmin><PoolListing /></AuthenticatorAdmin>} />
              <Route exact path="/addPot" element={<AuthenticatorAdmin><AddPot /></AuthenticatorAdmin>} />
              <Route exact path="/signup" element={<Signup/>} />
              <Route exact path='/forgotPassword' element={<ForgotPassword/>}></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default NavigationRouter;
