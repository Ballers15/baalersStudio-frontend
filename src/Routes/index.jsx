import React from 'react';
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


// import Toaster from 'Components/Toaster';


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
                        <Route exact path="/" element={<Dashboard />} />
                        <Route exact path="/about" element={<About />} />
                        <Route exact path="/party" element={<Party />} />
                        <Route exact path="/roadmap" element={<Roadmap />} />
                        <Route exact path="/pool" element={<Authenticator><Pool /></Authenticator>} />
                        <Route exact path="/wallet" element={<Authenticator><Wallet /></Authenticator>} />
                    </Route>
                </Routes>
          </AuthProvider>
        </BrowserRouter>
        {/* <Toaster /> */}
      </>
    );
  };
  
  export default NavigationRouter;
 