import React from 'react';
// import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'; 
import Tooltip from 'react-bootstrap/Tooltip';
import './Navbar.css';
import { useAuth } from '../../Auth/authProvider';
import logoo from '../../Assest/img/logoo.png';
import user from '../../Assest/img/user.png'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useNavigate  } from "react-router-dom";
import deck_compressed from "../../Assest/pdf/deck_compressed.pdf";


const CollapsibleExample = () => {
  const navigate = useNavigate();
  const auth = useAuth()
  const handleLogout = (e) => {
    auth.logout()
  }
  const goToAbout = (param)=>{
    navigate(param) 
  }

 

  return (
    
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={()=>{goToAbout('/')}}><img src={logoo} alt="logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
            <Nav.Link href= {deck_compressed} target="blank" rel="noopener noreferrer">About</Nav.Link>
            {/* <Nav.Link onClick={()=>{goToAbout('/about')}} >About</Nav.Link> */}
            <Nav.Link onClick={()=>{goToAbout('/partyGang' )}}>Party</Nav.Link>
            {/* https://medium.com/@Ballers_Studio */}
            <Nav.Link href="https://medium.com/@Ballers_Studio" target="blank" rel="noopener noreferrer">How To Play?</Nav.Link> 
              <Nav.Link onClick={()=>{goToAbout('/pool')}}>Pool</Nav.Link>
            <OverlayTrigger
          placement='bottom'
          overlay={
            <Tooltip >
              Coming soon
            </Tooltip>
          }
        ><Nav.Link href="#0">Wallet</Nav.Link></OverlayTrigger> 
           
              <Nav.Link onClick={()=>{goToAbout('/balrToken' )}}>$BALR TOKEN</Nav.Link>
             
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
