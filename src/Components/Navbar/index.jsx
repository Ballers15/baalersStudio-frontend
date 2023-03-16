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
  let walletAddress=localStorage.getItem('_wallet')

  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" variant="dark" >
        <Container>
          <Navbar.Brand onClick={() => { goToAbout('/') }} > <img src={gamelogo} alt="logo" /> </Navbar.Brand>
          {/* <Navbar.Brand onClick={()=>{goToAbout('/') }}><img src={gamelogo} width={79} height={100} alt="logo" /></Navbar.Brand> */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              {_u?.user?.role !== 'ADMIN' && ( <Nav.Link eventKey="1" href={deck_compressed} target="blank" rel="noopener noreferrer" > {' '} About{' '} </Nav.Link> )}
              {_u?.user?.role !== 'ADMIN' && ( <Nav.Link eventKey="2" onClick={() => { goToAbout('/partyGang') }} > {' '} Party{' '} </Nav.Link> )}
              {_u?.user?.role !== 'ADMIN' && ( <Nav.Link href="https://medium.com/@Ballers_Studio" target="blank" rel="noopener noreferrer" > How To Play? </Nav.Link> )}
              {_u?.user?.role !== 'ADMIN' && ( <Nav.Link eventKey="3" onClick={() => { goToAbout('/pool') }} > Pool </Nav.Link> )}
              {_u?.user?.role !== 'ADMIN' && (  <Nav.Link href="metamask">
              {walletAddress ? (
                        <>
						 {walletAddress.slice(0,4)+'..'+walletAddress.slice(-3)}
					  </>) : (
              <>Wallet</>
						)}
                </Nav.Link> )}
              {_u?.user?.role !== 'ADMIN' && ( <Nav.Link eventKey="4" onClick={() => { goToAbout('/balrToken') }} > $BALR TOKEN </Nav.Link> )}
              {_u?.user?.role == 'ADMIN' && ( <Nav.Link eventKey="4" onClick={() => { goToAbout('/admin-dashboard') }} > Dashboard </Nav.Link> )}
              {_u?.user?.role == 'ADMIN' && ( <Nav.Link eventKey="4" onClick={() => { goToAbout('/user-listing') }} > Users </Nav.Link> )}
              {_u?.user?.role == 'ADMIN' && ( <Nav.Link eventKey="4" onClick={() => { goToAbout('/poolListing') }} > Pool </Nav.Link> )}
              <Nav.Link eventKey="4" onClick={() => { handleLogout() }} > Logout </Nav.Link>
            </Nav>
            <Nav></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  )
};

export default CollapsibleExample;