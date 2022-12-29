import React from 'react';
import ErrorPage from '../Pages/Error404';
import Dashboard from '../Pages/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderSideBarFooter from '../Components/HeaderNavBarFoooter';
// import Toaster from 'Components/Toaster';


const NavigationRouter = () => {
    // const currentWallet = useSelector((state) => state.currentWallet);
  
    return (
      <>
        <BrowserRouter>
          <Routes>
           
              <Route path="/" element={<HeaderSideBarFooter />}>
                {/* <Route index element={<Connect />} /> */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/*" element={<ErrorPage />} />
              </Route>
          
          </Routes>
        </BrowserRouter>
        {/* <Toaster /> */}
      </>
    );
  };
  
  export default NavigationRouter;
  