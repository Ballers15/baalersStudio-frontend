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
// import Toaster from 'Components/Toaster';


const NavigationRouter = () => {
    // const currentWallet = useSelector((state) => state.currentWallet);
  
    return (
      <>
        <BrowserRouter>
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
                      <Route exact path="/pool" element={<Pool />} />
                      <Route exact path="/wallet" element={<Wallet />} />
                  </Route>
              </Routes>
        </BrowserRouter>
        {/* <Toaster /> */}
      </>
    );
  };
  
  export default NavigationRouter;
 