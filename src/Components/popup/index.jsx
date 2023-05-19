/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import './Popup.css' 
import hooray from '../../Assest/img/hooray.png'
import popupBg2 from '../../Assest/img/popupBg2.png'
import popupBg from '../../Assest/img/popupBg.png'
import { formatNumberDecimal } from "../functions";

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
        <img src={popupBg} alt="" />
        <div className="secondBg">
          <img src={popupBg2} alt="" />
        </div>

          <div className="popupContent">
          <img src={hooray} alt="" />
          <div className="kudos">HOORAY !!</div>
          <p>Your in game deposit of  ${formatNumberDecimal(props.cash)}<br></br>has been made !!</p>
          {/* <p>Your in game deposit of ${props.cash}<br></br>has been made !!</p> */}
          </div>
       
        </div> 
      </div>
    </div>

                
            </div>
        </React.Fragment>
    )
}

export default Popup;