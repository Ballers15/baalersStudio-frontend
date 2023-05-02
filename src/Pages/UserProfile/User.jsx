import React from "react";

import './User.css' 
import { useState } from "react";
import { useAuth } from '../../Auth/authProvider';
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";
import ApiLoader from "../../Components/apiLoader";
import viewProfileBg from "../../Assest/img/viewProfileBg.png"
import mafiaBoss from "../../Assest/img/mafiaBoss.png"
import ballerCoin from "../../Assest/img/ballerCoin.webp" 
import sliderImg from "../../Assest/img/sliderImg.png" 
import userProfile from "../../Assest/img/userProfile.png" 
import Carousel from "react-multi-carousel";
const UserProfile = () => {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return(
        <>
            <div className="text-center mt-9 profileWth">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="position-relative">
                            <img src={viewProfileBg} alt="" className="w-100" />
                                <div className="profileText">
                                <div className="container">
                                    <div className="row">
                                            <div className="col-sm-8">
                                                <div className="d-flex align-items-center mt-4">
                                                    <img src={userProfile} alt="userProfile" className="profileImage" />
                                                    <div className="text-left">
                                                        <h1> BillyCharette09</h1>
                                                        <p>billycharette@gmail.com</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <img src={mafiaBoss} alt="mafiaBoss" />
                                            </div>
                                        </div>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
               <div className="row">
                <div className="col-sm-9">
                    <div className="profileCard"> 
                    <h3>NFT’S HELD IN THE WALLET : <span>02</span> </h3>
                    <div className="mt-4">
                    <Carousel  responsive={responsive}>
                    <div className="active">
                        <img src={sliderImg} />
                    </div>
                    <div>
                        <img src={sliderImg} />
                    </div>
                    <div>
                        <img src={sliderImg} />
                    </div>
                    <div>
                        <img src={sliderImg} />
                    </div>
                    <div>
                        <img src={sliderImg} />
                    </div>
                    <div>
                        <img src={sliderImg} />
                    </div>
                    <div>
                        <img src={sliderImg} />
                    </div>
                    <div>
                        <img src={sliderImg} />
                    </div>
                     </Carousel>
                     </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="profileCard"> 
                    <h3>TOTAL REWARDS ACHEIVED </h3>
                    <div className="d-flex align-items-center mt-3">
                        <img src={ballerCoin} alt="ballerCoin" />
                        <p className="amount">8000</p>
                    </div>
                    </div>
                    <div className="profileCard"> 
                    <h3>Pools Participated</h3>
                    <div className="row align-items-center mt-3">
                        <div className="col-8 col-sm-8">
                            <div className="participateName">REWARD POOLS :</div>
                        </div>
                        <div className="col-4 col-sm-4">
                            <div className="participateNum">25</div>
                        </div>
                    </div>
                    <div className="row align-items-center mt-3">
                        <div className="col-8 col-sm-8">
                            <div className="participateName">LOTTERY POOLS :</div>
                        </div>
                        <div className="col-4 col-sm-4">
                            <div  className="participateNum">11</div>
                        </div>
                    </div>
                    </div>
                </div>
               </div>

            </div>
            </>
        )
}

export default UserProfile;