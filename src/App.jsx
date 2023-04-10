import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css';
import NavigationRouter from './Routes';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <React.Fragment>
            <ToastContainer autoClose={2000} theme="colored" />
     <NavigationRouter />
   </React.Fragment>
  );
}

export default App;
