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
import { Link, useLocation, useNavigate  } from "react-router-dom";
import deck_compressed from "../../Assest/pdf/deck_compressed.pdf";
import $ from 'jquery'; 
import {useParams} from "react-router-dom" 
import { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';


const CollapsibleExample = () => {

  const auth = useAuth()
  const handleLogout = (e) => {
    auth.logout()
  }

  let strAuth = localStorage.getItem('_u');
  let _u = JSON.parse(strAuth);
const [walletAddress, setWalletaddress] = useState('');

  const location = useLocation();

  const disconnectWallet = () => {
    localStorage.removeItem('_wallet')
    setWalletaddress('')
  }


  useEffect(() => {
    // Store the previous path in state or local storage
    sessionStorage.setItem('before login',location.pathname);
  }, [location.pathname]);


//metamask starts
const [error, setError] = useState("No Error");
const [accountDetails, setAccountDetails] = useState('');
const navigate = useNavigate();
const redirectPath = '/';

const supportedChainList = {
  Polygon: {
    chainId: '0x89',
    urlName: 'polygon',
    chainName: 'Polygon Mainnet',
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: ['https://polygonscan.com/'],
    eventKey: 'Polygon:danger',
    variant: 'danger',
    nativeCurrency: {
    decimals: 18,
    symbol: 'MATIC',
    },
  }
};

const saveNewAddress = (address) =>{
  console.log("i am inside this",address);
  let walletAddress=address[0];
  setWalletaddress(walletAddress)
  localStorage.setItem('_wallet',walletAddress)  
}
const getAccountDetails = async ({ networkName, setError }) => {
  console.log("get account details");
  if (typeof window.ethereum !== "undefined") {
    window.ethereum
      .request({
        method: "eth_requestAccounts"
      })
      .then((res) => {
        window.ethereum
          .request({
            method: "eth_chainId",
          })
      .then((chainID) => {
        getDetailsFromChainId(chainID,res);
        setWalletaddress(res[0])
        localStorage.setItem('_wallet',res[0])
        });
      })
    .catch((err) => {
    setAccountDetails('')
        console.log(err);
      });
} else {
  setAccountDetails('')
  
    alert("Install MetaMask First");
  }
};

const connectWallet = async (networkName) => {
  if(_u !== null){
  setError();
  await getAccountDetails({ networkName, setError });
  }
  else{
    navigate('/login');
  }
};

const getDetailsFromChainId = (chainId) => {
let selectedChain = Object.keys(supportedChainList).map((e) => {
  if (supportedChainList[e].chainId === chainId) {
  return supportedChainList[e];
  } else {
    return null;
  }
});

  let filteredSelectedChain = selectedChain.filter((e) => e);
  setAccountDetails(JSON.stringify(filteredSelectedChain[0]))
  console.log(filteredSelectedChain[0]	,'-------------------------chain details')
return filteredSelectedChain[0];
};

const switchNetwork = async (chainId) => {
  console.log({ chainId });
  console.log("switched to chainId chain");
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: `0x${Number(137).toString(16)}`,
          chainName: "Polygon Mainnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          rpcUrls: ["https://polygon-rpc.com/"],
          blockExplorerUrls: ["https://polygonscan.com/"],
        },
      ],
    });
  } catch (err) {
    setError(err.message);
  }
};

const redirectToAuthRute = () => {
  localStorage.setItem('isConnected', true);
      navigate(redirectPath, { replace: true })
  
}

useEffect(() => {
  const wallet=localStorage.getItem('_wallet');
  if(wallet){
    setWalletaddress(wallet)
  }
  try {
  // if (typeof window.ethereum == "undefined") {
  //   return alert('Please install MetaMask');
  // }
  window.ethereum?.on('accountsChanged', saveNewAddress);
  window.ethereum?.on('chainChanged', switchNetwork); 
  } catch (error) {
  console.log(error);
  throw new Error('No ethereum Object');
  }
  return () => {
  // window.ethereum?.removeListener('accountsChanged', handleAccountChange);
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
              {_u?.user?.role !== 'ADMIN' && ( <Nav.Link eventKey="2" as={Link} to='/partyGang' > {' '} Party{' '} </Nav.Link> )}
              {_u?.user?.role !== 'ADMIN' && ( <Nav.Link href="https://medium.com/@Ballers_Studio" target="blank" rel="noopener noreferrer" > How To Play? </Nav.Link> )}
              {_u?.user?.role !== 'ADMIN' && ( <Nav.Link eventKey="3" as={Link} to='/pool' > Pool </Nav.Link> )}
              {_u?.user?.role !== 'ADMIN' && (
               <Nav.Link> {walletAddress !=='' && ( <> {walletAddress.slice(0,4)+'..'+walletAddress.slice(-3)} </>) } 
                    {walletAddress === '' &&( <span onClick={()=>{connectWallet('polygon')}}>Connect Wallet</span> )} 
                </Nav.Link> )}
              {_u?.user?.role !== 'ADMIN' && ( <Nav.Link eventKey="4" as={Link} to='/balrToken' > $BALR TOKEN </Nav.Link> )}
              {_u?.user?.role == 'ADMIN' && ( <Nav.Link eventKey="4" as={Link} to='/admin-dashboard' > Dashboard </Nav.Link> )}
              {_u?.user?.role == 'ADMIN' && ( <Nav.Link eventKey="4" as={Link} to='/user-listing'> Users </Nav.Link> )}
              {_u?.user?.role == 'ADMIN' && ( <Nav.Link eventKey="4" as={Link} to='/poolListing'>Pool </Nav.Link> )}
            </Nav>
            <Nav>
            <Nav.Link eventKey="4" > <i class="fa fa-bell-o" aria-hidden="true"></i> </Nav.Link>
              {_u !== null ? (<Nav.Link eventKey="4" onClick={() => { handleLogout() }} > <i class="fa fa-user-o" aria-hidden="true"></i> </Nav.Link>) : (<Nav.Link eventKey="4"as={Link} to='/login'> <i class="fa fa-user-o" aria-hidden="true"></i> </Nav.Link>)}

              <NavDropdown title="Dropdown" id="basic-nav-dropdown" alignRight>
                {_u === null &&   (<NavDropdown.Item as={Link} to='/login'>Login</NavDropdown.Item>)}
                {_u !== null &&   (<NavDropdown.Item onClick={() => { handleLogout() }}>Logout</NavDropdown.Item>)}
                {walletAddress && ( <NavDropdown.Item  ><span onClick={()=>{disconnectWallet()}}>Disconnect Wallet</span></NavDropdown.Item> )}
              </NavDropdown>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  )
};

export default CollapsibleExample;