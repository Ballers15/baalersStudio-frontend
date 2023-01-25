import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
const loader = document.querySelector(".loader-wrapper");
const hideLoader = () => loader?.classList?.add("loader--hide");
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App hideLoader={hideLoader} />
  </React.StrictMode>
);

reportWebVitals();

