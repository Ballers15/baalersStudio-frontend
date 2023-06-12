import React from 'react';
import { Outlet } from 'react-router';

const WithoutNav = () => {
    return (
      <div>
        <Outlet />
      </div>
    );
  };
  
  export default WithoutNav;