import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../Auth/authProvider';
const Navbar = () => {
  const auth = useAuth()
  const handleLogout = (e) => {
    auth.logout()
  }

  let strAuth = localStorage.getItem('_u');
  let _u = JSON.parse(strAuth);

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
                                    <NavLink to='/' className='nav-item' style={navLinkStyles}>Dashboard</NavLink>
          {_u?.user?.role!=='ADMIN'&&<NavLink to='/about' className='nav-item' style={navLinkStyles}>About</NavLink>}
          {_u?.user?.role!=='ADMIN'&&<NavLink to='/party' className='nav-item' style={navLinkStyles}>Party</NavLink>}
          {_u?.user?.role!=='ADMIN'&&<NavLink to='/roadmap' className='nav-item' style={navLinkStyles}>Roadmap</NavLink>}
          {_u?.user?.role!=='ADMIN'&&<NavLink to='/pool' className='nav-item' style={navLinkStyles}>Pool</NavLink>}
          {_u?.user?.role!=='ADMIN'&&<NavLink to='/wallet' className='nav-item' style={navLinkStyles}>Wallet</NavLink>}
          {_u?.user?.role==='ADMIN'&&<NavLink to='/poolListing' className='nav-item' style={navLinkStyles}>Pool</NavLink>}
          <NavLink   to='/'  className='nav-item'  onClick={handleLogout}>Logout</NavLink>
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
