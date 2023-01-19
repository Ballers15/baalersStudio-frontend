import React from 'react';
// import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'; 
import Tooltip from 'react-bootstrap/Tooltip';
import './Navbar.css';
import { useAuth } from '../../Auth/authProvider';
import gamelogo from '../../Assest/img/gamelogo.png';
import user from '../../Assest/img/user.png'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const CollapsibleExample = () => {
  const auth = useAuth()
  const handleLogout = (e) => {
    auth.logout()
  }

  return (
    
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><img src={gamelogo} alt="logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="#partyGang">Party</Nav.Link>
            <Nav.Link href="/roadmap">Roadmap</Nav.Link> 
              <Nav.Link href="/pool">Pool</Nav.Link>
            <OverlayTrigger
          placement='top'
          overlay={
            <Tooltip >
              Coming soon
            </Tooltip>
          }
        ><Nav.Link href="#0">Wallet</Nav.Link></OverlayTrigger> 
           
              {/* <Nav.Link href="">Wallet</Nav.Link> */}
             
            </Nav>
            <Nav>
              {/* <Nav.Link href="#deets"><img src={user} alt="user" /></Nav.Link> */}
              {/* <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default CollapsibleExample;
