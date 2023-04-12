import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css';
import NavigationRouter from './Routes';
import { ToastContainer, toast } from 'react-toastify';
import { WalletContext } from './Services/util';


function App() {

  const [walletAddress, setWalletAddress] = useState(localStorage.getItem('_wallet'));

  return (
    <React.Fragment>
            <ToastContainer autoClose={2500} theme="colored" />
      <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
     <NavigationRouter />
     </WalletContext.Provider>
   </React.Fragment>
  );
}

export default App;
