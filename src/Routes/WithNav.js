import React from 'react';
import Footer from '../Components/Footer';
import CollapsibleExample from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
const WithNav = () => {
  return (
    <div>
      <CollapsibleExample />
      <Outlet />
      <Footer />
    </div>
  );
};

export default WithNav;