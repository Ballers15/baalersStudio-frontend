import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'
const Navbar = () => {

  const navLinkStyles = ({ isActive }) => {
    return {
      textDecoration: isActive ? 'none' : 'none',
      color:isActive?'#8355ad':'#ECE8E1'
    }
  }

  return (
    <React.Fragment>
      <div className='navbar'>
        <span className='nav-logo'></span>
        <div className='nav-items'>
          <NavLink to='/about' className='nav-item' style={navLinkStyles}>About</NavLink>
          <NavLink to='/party' className='nav-item' style={navLinkStyles}>Party</NavLink>
          <NavLink to='/roadmap' className='nav-item' style={navLinkStyles}>Roadmap</NavLink>
          <NavLink to='/pool' className='nav-item' style={navLinkStyles}>Pool</NavLink>
          <NavLink to='/wallet' className='nav-item' style={navLinkStyles}>Wallet</NavLink>
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
