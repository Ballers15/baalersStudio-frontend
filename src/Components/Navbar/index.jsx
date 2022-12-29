import React from 'react';
import './Navbar.css'
const Navbar = () => {
  return (
    <React.Fragment>
      <div className='navbar'>
        <span className='nav-logo'></span>
        <div className='nav-items'>
          <span className='nav-item'>About</span>
          <span className='nav-item'>Party</span>
          <span className='nav-item'>Roadmap</span>
          <span className='nav-item'>Pool</span>
          <span className='nav-item'>Wallet</span>
        </div>
        <div className='responsive-nav-tag'>
          <span className='responsive-nav-tag-item responsive-nav-tag-item-1'></span>
          <span className='responsive-nav-tag-item responsive-nav-tag-item-2'></span>
          <span className='responsive-nav-tag-item responsive-nav-tag-item-3'></span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
