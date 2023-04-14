/* eslint-disable no-unused-vars */
import React, { useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'; 
import './Navbar.css';
import { useAuth } from '../../Auth/authProvider';
import gamelogo from '../../Assest/img/gamelogo.png';
import { Link, useLocation, useNavigate  } from "react-router-dom";
import deck_compressed from "../../Assest/pdf/deck_compressed.pdf";
import Dropdown from 'react-bootstrap/Dropdown';
import {  disconnectWallet, getAccountDetails, switchNetwork } from '../Metamask';
import { useDispatch, useSelector } from 'react-redux';
import {  setWalletAddressValue } from '../Redux/actions';
import Can from '../rolesBasedAccessControl/Can';


const NavBar = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  const handleLogout = (e) => {
    auth.logout()
  }

  let strAuth = useSelector(state => state.user.user);
  let _u = JSON.parse(strAuth);
  const location = useLocation();
  const dispatch = useDispatch();
  const walletAddress = useSelector(state => state.wallet.walletAddress)

useEffect(() => {
  // Store the previous path in state or local storage
  sessionStorage.setItem('before login',location.pathname);
}, [location.pathname]);

// metamask functions
const handleConnectWallet =  () => {
     if(_u !== null){
      getAccountDetails()
     }
     else{
      navigate('/login')
     }

  }

  const handleDisconnectWallet = () => {
    dispatch(setWalletAddressValue(null))
    disconnectWallet();
  }


const handleAccountChange = (accounts) => {
  dispatch(setWalletAddressValue(accounts[0]))
}


useEffect(() => {

  try {
  window.ethereum?.on('accountsChanged', handleAccountChange );
  window.ethereum?.on('chainChanged', switchNetwork); 
  } 
  catch (error) {
  console.log(error);
  throw new Error('No ethereum Object');
  }
  return () => {
  window.ethereum?.removeListener('accountsChanged', handleAccountChange);
  window.ethereum?.removeListener('chainChanged', switchNetwork);
  };
}, []);
//metamask end

  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" variant="dark" >
        <Container>
          <Navbar.Brand as={Link} to='/' > <img src={gamelogo} alt="logo" /> </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              <Can do='about' on='navbar'> <Nav.Link eventKey="1" href={deck_compressed} target="blank" rel="noopener noreferrer" > {' '} About{' '} </Nav.Link> </Can>
              <Can do='party' on='navbar'> <Nav.Link eventKey="2" href='#partyGang'> {' '} Party{' '} </Nav.Link> </Can>
              <Can do='how-to-play' on='navbar'> <Nav.Link href="https://medium.com/@Ballers_Studio" target="blank" rel="noopener noreferrer" > How To Play? </Nav.Link> </Can>
              <Can do='pool' on='navbar'> <Nav.Link eventKey="3" as={Link} to='/pool' > Pool </Nav.Link> </Can>
              <Can do='balr-token' on='navbar'> <Nav.Link eventKey="4" href='#balrToken' > $BALR TOKEN </Nav.Link> </Can>
              
              <Can do='wallet' on='navbar'>   <Nav.Link> {walletAddress !==null && ( <> {walletAddress?.slice(0,4)+'..'+walletAddress?.slice(-3)} </>) } 
                    {walletAddress === null &&( <span onClick={()=>{handleConnectWallet()}}>Connect Wallet</span> )} 
                </Nav.Link>  </Can>

              <Can do='admin-dashboard' on='navbar'> <Nav.Link eventKey="4" as={Link} to='/admin-dashboard' > Dashboard </Nav.Link></Can>
            
              <Can do='users' on='navbar'> <Nav.Link eventKey="4" as={Link} to='/user-listing'> Users </Nav.Link> </Can>
              <Can do='pool-listing' on='navbar'> <Nav.Link eventKey="4" as={Link} to='/poolListing'>Pool </Nav.Link> </Can>
            
            </Nav>

            <Nav>
            <Nav.Link eventKey="4" > <i className="fa fa-bell-o" aria-hidden="true"></i> </Nav.Link>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-button-dark-example1" >
                {_u===null ? <i className="fa  fa-user-o" aria-hidden="true"></i> : <i className="fa  fa-user" aria-hidden="true"></i>}
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                {_u !== null &&   (<Dropdown.Item disabled>{_u?.user?.userName}{'    '}({_u?.user?.email})</Dropdown.Item>)}
                <Can do='wallet' on='navbar'> {walletAddress && (<Dropdown.Item  ><span onClick={()=>{handleDisconnectWallet()}}>Disconnect Wallet</span></Dropdown.Item>)} </Can>
                {_u === null ?   (<Dropdown.Item as={Link} to='/login'>Login</Dropdown.Item>) : (<Dropdown.Item onClick={() => { handleLogout() }}>Logout</Dropdown.Item>)}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  )
};

export default NavBar;