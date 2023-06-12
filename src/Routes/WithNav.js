import React from 'react';
import Footer from '../Components/Footer';
import NavBar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
const WithNav = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default WithNav;