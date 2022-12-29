import React from 'react';

import Header from '../Header';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';

const HeaderSideBarFooter = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HeaderSideBarFooter;
