/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'
import './Footer.css'
import discord from '../../Assest/img/discord.svg'
const Footer = () => {
  return (
    <div className='footer'>
      <div className="container text-center b-top">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <ul className="socialIcons">
              <li><a href="https://www.instagram.com/ballers.studio/" target="blank" rel="noopener noreferrer"  aria-label="instagram">
                <i className="fa fa-instagram" aria-hidden="true"></i></a></li>
              <li>
                <a href="https://discord.com/login?redirect_to=%2Flogin%3Fredirect_to%3D%252Fchannels%252F1060526333014331412%252F1060526333815431259" target="blank" rel="noopener noreferrer" aria-label="discord">
                <img src={discord} width={27} height={20} alt="discord" /></a></li>
              <li> 
                <a href="https://www.linkedin.com/company/ballersstudio/about/" target="blank" rel="noopener noreferrer"  aria-label="linkedin">
                <i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
              <li><a href="https://twitter.com/Ballers_Studio" target="blank" rel="noopener noreferrer" aria-label="twitter">
                <i className="fa fa-twitter" aria-hidden="true"></i></a></li>
              <li><a href="https://medium.com/@Ballers_Studio" target="blank" rel="noopener noreferrer" aria-label="medium">
                <i className="fa fa-medium" aria-hidden="true"></i></a></li>
            </ul>
            <p className='footer-content'>
              © 2023 Ballers Studio, Inc. Ballers,CITY, and any associated logos are trademarks, service marks, and/or registered trademarks of Ballers Studio,Inc.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer