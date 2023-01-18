import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../Auth/authProvider';
import gamelogo from '../../Assest/img/gamelogo.png';
import user from '../../Assest/img/user.png'

const Navbar = () => {
  const auth = useAuth()
  const handleLogout = (e) => {
    auth.logout()
  }

  const navLinkStyles = ({ isActive }) => {
    return {
      textDecoration: isActive ? 'none' : 'none',
      color:isActive?'#8355ad':'#ECE8E1'
    }
  }

  return (
    <React.Fragment>
      <div className="navbar">
        <div className='container'>
          <span className='nav-logo'>
            <img src={gamelogo} alt="logo"/>
          </span>
          <div className='nav-items'>
            <NavLink to='/about' className='nav-item' style={navLinkStyles}>About</NavLink>
            <NavLink to='/party' className='nav-item' style={navLinkStyles}>Party</NavLink>
            <NavLink to='/roadmap' className='nav-item' style={navLinkStyles}>Roadmap</NavLink>
            <NavLink to='/pool' className='nav-item' style={navLinkStyles}>Pool</NavLink>
            <NavLink to='/wallet' className='nav-item' style={navLinkStyles}>Wallet</NavLink>
            {/* <NavLink to='/'  className='nav-item float-right'  onClick={handleLogout}>
              <img src={user} alt="" />
            </NavLink> */}
          </div>
          {/* <div className='responsive-nav-tag'>
            <span className='responsive-nav-tag-item responsive-nav-tag-item-1'></span>
            <span className='responsive-nav-tag-item responsive-nav-tag-item-2'></span>
            <span className='responsive-nav-tag-item responsive-nav-tag-item-3'></span>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
