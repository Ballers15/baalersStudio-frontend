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
import $ from 'jquery'; 
import {useParams} from "react-router-dom" 
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { connectWallet, disconnectWallet, switchNetwork } from '../Metamask';




const NavBar = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  const handleLogout = (e) => {
    auth.logout()
  }

  let strAuth = localStorage.getItem('_u');
  let _u = JSON.parse(strAuth);
  const location = useLocation();
const [walletAddress, setWalletAddress] = useState(localStorage.getItem('_wallet'));
  

const handleConnectWallet = async () => {
      let res = await connectWallet(navigate)
      console.log('handle connect',res)
      setWalletAddress(res)
  }

  const handleDisconnectWallet = () => {
    setWalletAddress(null)
    disconnectWallet();
  }



  useEffect(() => {
    // Store the previous path in state or local storage
    sessionStorage.setItem('before login',location.pathname);
  }, [location.pathname]);


const handleAccountChange = (accounts) => {
  setWalletAddress(accounts[0])
}


useEffect(() => {
  console.log(walletAddress)
  const wallet=localStorage.getItem('_wallet');
    setWalletAddress(wallet)
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
  // eslint-disable-next-line
}, []);

//metamask end

  const { id } = useParams();

  useEffect(() => {
    // Update the document title using the browser API
    console.log("HI",id);
    if (id === 'partyGang' ) {
        $('html, body').animate({
            scrollTop: $("#partyGang").offset().top
        }, 20);            
      }
    else if (id === 'balrToken' ) {
        
        console.log("id",id);
             $('html, body').animate({
                scrollTop: $("#balrToken").offset().top
            }, 20);
      }        
  },[id]);

  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" variant="dark" >
        <Container>
          <Navbar.Brand as={Link} to='/' > <img src={gamelogo} alt="logo" /> </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              {_u?.user?.role !== 'ADMIN' && ( <Nav.Link eventKey="1" href={deck_compressed} target="blank" rel="noopener noreferrer" > {' '} About{' '} </Nav.Link> )}
              {_u?.user?.role !== 'ADMIN' && ( <Nav.Link eventKey="2" href='#partyGang'> {' '} Party{' '} </Nav.Link> )}
              {_u?.user?.role !== 'ADMIN' && ( <Nav.Link href="https://medium.com/@Ballers_Studio" target="blank" rel="noopener noreferrer" > How To Play? </Nav.Link> )}
              {_u?.user?.role !== 'ADMIN' && ( <Nav.Link eventKey="3" as={Link} to='/pool' > Pool </Nav.Link> )}
              {_u?.user?.role !== 'ADMIN' && ( <Nav.Link eventKey="4" href='#balrToken' > $BALR TOKEN </Nav.Link> )}

              {_u?.user?.role !== 'ADMIN' && (
               <Nav.Link> {walletAddress !==null && ( <> {walletAddress?.slice(0,4)+'..'+walletAddress?.slice(-3)} </>) } 
                    {walletAddress === null &&( <span onClick={()=>{handleConnectWallet()}}>Connect Wallet</span> )} 
                </Nav.Link> )}
              {_u?.user?.role == 'ADMIN' && ( <Nav.Link eventKey="4" as={Link} to='/admin-dashboard' > Dashboard </Nav.Link> )}
              {_u?.user?.role == 'ADMIN' && ( <Nav.Link eventKey="4" as={Link} to='/user-listing'> Users </Nav.Link> )}
              {_u?.user?.role == 'ADMIN' && ( <Nav.Link eventKey="4" as={Link} to='/poolListing'>Pool </Nav.Link> )}
            </Nav>
            <Nav>
            <Nav.Link eventKey="4" > <i className="fa fa-bell-o" aria-hidden="true"></i> </Nav.Link>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-button-dark-example1" >
               {_u===null ? <i className="fa  fa-user-o" aria-hidden="true"></i> : <i className="fa  fa-user" aria-hidden="true"></i>}
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                {_u !== null &&   (<Dropdown.Item disabled>{_u?.user?.userName}{'    '}({_u?.user?.email})</Dropdown.Item>)}
                {walletAddress && ( <Dropdown.Item  ><span onClick={()=>{handleDisconnectWallet()}}>Disconnect Wallet</span></Dropdown.Item> )}
                {_u === null &&   (<Dropdown.Item as={Link} to='/login'>Login</Dropdown.Item>)}
                {_u !== null &&   (<Dropdown.Item onClick={() => { handleLogout() }}>Logout</Dropdown.Item>)}
    
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