import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css';
import NavigationRouter from './Routes';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <React.Fragment>
      <ToastContainer autoClose={2500} theme="colored" />
     <NavigationRouter />
   </React.Fragment>
  );
}

export default App;
