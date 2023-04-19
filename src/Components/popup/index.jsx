/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import './Popup.css' 
import popupImg from '../../Assest/img/popupImg.png'

const Popup = (props) => { 

    let color='#FCDA41';

    if(props.potType === 'LOTTERYPOT')
      {
        color = '#3531BB'
      }

    return (
        <React.Fragment>

            <div className="popup"> 
            <div
      className="modal show"
      style={{ display: 'block', position: 'fixed' }}
    >
      <div className="modal-dialog">

        <div className="modal-content">
          <img src={popupImg} alt="" />
          <div className="kudos" style={{ backgroundColor: `${color}`}}>Kudos !!</div>
          <p>Your in game deposit of ${props.cash}<br></br>has been made !!</p>
        </div> 
      </div>
    </div>

                
            </div>
        </React.Fragment>
    )
}

export default Popup;