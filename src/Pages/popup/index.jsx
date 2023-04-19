/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from "react";
import './Popup.css' 
import { Link } from "react-router-dom"; 
import {Button, Modal} from 'react-bootstrap';
import popupImg from '../../Assest/img/popupImg.png'

const Popup = () => { 
    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
          });
       
    })

 

    return (
        <React.Fragment>

            <div className="popup"> 
            <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
      centered
    >
      <Modal.Dialog>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <img src={popupImg} alt="" />
          <div className="kudos" style={{ backgroundColor: '#3531BB'  }}>Kudos !!</div>
          <p>Your in game deposit of $740697
            has been made !!</p>
        </Modal.Body> 
      </Modal.Dialog>
    </div>

                
            </div>
        </React.Fragment>
    )
}

export default Popup;