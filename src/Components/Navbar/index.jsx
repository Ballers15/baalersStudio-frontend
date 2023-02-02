/* eslint-disable no-unused-vars */
import React, { useEffect} from 'react';
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
import { useNavigate  } from "react-router-dom";
import deck_compressed from "../../Assest/pdf/deck_compressed.pdf";
import $ from 'jquery'; 
import {useParams} from "react-router-dom" 
const CollapsibleExample = () => {
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
  const navigate = useNavigate();
  const auth = useAuth()
  const handleLogout = (e) => {
    auth.logout()
  }
  const goToAbout = (param)=>{
    navigate(param);
   
  } 
  // const handleScroll = () => {
  //   console.log("JJJ",id)
  //   if (id === 'partyGang') {
  //     $('html, body').animate({
  //         scrollTop: $("#partyGang")?.offset()?.top
  //     }, 20);            
  //   }
  // else if (id === 'balrToken' ) {
      
  //     console.log("id",id);
  //          $('html, body').animate({
  //             scrollTop: $("#balrToken")?.offset()?.top
  //         }, 20);
  //   }        
  // }
  let strAuth = localStorage.getItem('_u');
  let _u = JSON.parse(strAuth);

  return (
    
    <React.Fragment> 
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Container>
          <Navbar.Brand onClick={()=>{goToAbout('/') }}><img src={gamelogo} alt="logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              {_u?.user?.role !== 'ADMIN' && <Nav.Link eventKey="1" href={deck_compressed} target="blank" rel="noopener noreferrer">About</Nav.Link>}
            {/* <Nav.Link onClick={()=>{goToAbout('/about')}} >About</Nav.Link> */}
            {_u?.user?.role !== 'ADMIN'&&<Nav.Link  eventKey="2" onClick={() => { goToAbout('/partyGang') }}>Party</Nav.Link>}
            {/* https://medium.com/@Ballers_Studio */}
            {_u?.user?.role !== 'ADMIN'&& <Nav.Link href="https://medium.com/@Ballers_Studio" target="blank" rel="noopener noreferrer">How To Play?</Nav.Link> }
              {_u?.user?.role !== 'ADMIN' && <Nav.Link eventKey="3" onClick={() => { goToAbout('/pool') }}>Pool</Nav.Link>}
              {_u?.user?.role !== 'ADMIN'&& <OverlayTrigger
                placement='bottom'
                overlay={
                  <Tooltip >
                    Coming soon
                  </Tooltip>
                }>
                
                <Nav.Link href="#0">Wallet</Nav.Link></OverlayTrigger> }
           
              {_u?.user?.role !== 'ADMIN' && <Nav.Link eventKey="4" onClick={() => { goToAbout('/balrToken') }}>$BALR TOKEN</Nav.Link>}
              {_u?.user?.role == 'ADMIN' && <Nav.Link eventKey="4" onClick={() => { goToAbout('/') }}>Dashboard</Nav.Link>}
              {_u?.user?.role == 'ADMIN' && <Nav.Link eventKey="4" onClick={() => { goToAbout('/poolListing') }}>Pool</Nav.Link>}
              <Nav.Link eventKey="4" onClick={() => { handleLogout()}}>Logout</Nav.Link>
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