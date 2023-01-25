/* eslint-disable no-unused-vars */
import React,{useEffect} from 'react';
import ErrorPage from '../Pages/Error404';
import Dashboard from '../Pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import WithoutNav from './WithoutNav';
import WithNav from './WithNav';
import About from '../Pages/About';
import Pool from '../Pages/Pool';
import Roadmap from '../Pages/Roadmap';
import Wallet from '../Pages/Wallet';
import Party from '../Pages/Party';
import { Authenticator } from '../Auth/authenticator'
import AuthProvider from '../Auth/authProvider';
import Metamask from '../Components/Metamask'


const NavigationRouter = () => {
 

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
                <Route exact path="/" element={<Dashboard/>} />
                        <Route  path="/about" element={<About />} />
                        <Route  path="/:id" element={<Dashboard />} />
                        <Route  path="/roadmap" element={<Roadmap />} />
                        <Route  path="/pool" element={<Pool />} />
                       <Route  path="/wallet" element={<Wallet />} />
                        <Route  path="/metamask" element={<Metamask />} />
                    </Route>
                </Routes>
          </AuthProvider>
        </BrowserRouter>
      </>
    );
  };
  
  export default NavigationRouter;
 