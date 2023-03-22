/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from "react";
import './Pool.css' 
import Modal from 'react-bootstrap/Modal';
import tdefi from '../../Assest/img/logos/tdefi.png'
import tradedog from '../../Assest/img/logos/tradedog.png'
import tdmm from '../../Assest/img/logos/tdmm.png'
import tdx from '../../Assest/img/logos/tdx.png'
import ith from '../../Assest/img/logos/ith.png'
import { Link } from "react-router-dom";


const Pool = () => { 
    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
          });
       
    })

    const [lotteryModalShow, setLotteryModalShow] = useState(false);
    const [rewardModalShow, setRewardModalShow] = useState(false);

    const handleShow = (modalName)=>{
       if(modalName === 'lottery'){
            setLotteryModalShow(true);
        }
        else if(modalName === 'reward'){
            setRewardModalShow(true);
        }
        
    }

    const handleHide = (modalName)=>{
        if(modalName === 'lottery'){
            setLotteryModalShow(false);
        }
        else if(modalName === 'reward'){
            setRewardModalShow(false);
        }
    }

    return (
        <React.Fragment>
                <Modal
                show={lotteryModalShow}
                onHide={()=> handleHide('lottery')}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Lottery Pool</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p>
                Participate in the Daily lottery pools by depositing your in-game cash and you might win Baller's NFTs and other rewards.
                </p>
                </Modal.Body> 
            </Modal>
            <Modal
                show={rewardModalShow}
                onHide={()=> handleHide('reward')}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Reward Pool</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 <p>
                 Greater rewards await for those who participate in the Reward Pool.
                 </p>
                 <p>
                 Baller NFT Holders will get a chance to win $BALR tokens daily, be on top of the community leaderboard and be a real Baller!
                 </p>
                </Modal.Body> 
            </Modal>
            <div className="pool"> 
               <div className="poolScreen w-100">
                    <div className="container">
                        <div className="slideStar">
                            <svg width="100" height="100" viewBox="0 0 100 100" id="four">
                                <g className="group" opacity="0.8">

                                    <g className="small">
                                        <path id="small" d="M41.25,40 L42.5,25 L43.75,40 L45,41.25 L60,42.5 L45,43.75
                                                    L43.75,45 L42.5,60 L41.25,45 L40,43.75 L25,42.5 L40,41.25z" fill="white" />
                                    </g>
                                </g>
                            </svg>

                            <svg width="100" height="100" viewBox="0 0 100 100" id="two">
                                <g className="group" opacity="0.8">

                                    <g className="small">
                                        <path id="small" d="M41.25,40 L42.5,25 L43.75,40 L45,41.25 L60,42.5 L45,43.75
                                                    L43.75,45 L42.5,60 L41.25,45 L40,43.75 L25,42.5 L40,41.25z" fill="#fad739" />
                                    </g>
                                </g>
                            </svg>
                            <svg width="100" height="100" viewBox="0 0 100 100" id="three">
                                <g className="group" opacity="0.8">
                                    <g className="large">
                                        <path id="large" d="M41.25,40 L42.5,10 L43.75,40 L45, 41.25 L75,42.5 L45,43.75
                                                    L43.75,45 L42.5,75 L41.25,45 L40,43.75 L10,42.5 L40,41.25z " fill="#fad739" />
                                    </g>

                                </g>
                            </svg>

                            <svg width="100" height="100" viewBox="0 0 100 100" id="five">
                                <g className="group" opacity="0.8">

                                    <g className="small">
                                        <path id="small" d="M41.25,40 L42.5,25 L43.75,40 L45,41.25 L60,42.5 L45,43.75
                                                    L43.75,45 L42.5,60 L41.25,45 L40,43.75 L25,42.5 L40,41.25z" fill="#fad739" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div className="">
                            <p className="firstText">Win Exclusive Rewards</p>
                            <div className="text-center thirdSlide">
                                <div className="sCaption text-center">
                                    <div>
                                    <p>Play & Earn </p>
                                    <h1>POOL </h1>
                                    <p className="textHeader">
                                    Join the ultimate Play and Earn experience and win rewards with real-world value in Ballers City. Compete for a chance to win $BALR tokens, collectible NFTs, and tickets to exclusive physical parties around the world. 
                                    </p>
                                    <p className="textHeader"> <b>Start playing now and bring your rewards to life!</b></p>
                                    </div>
                                    <div className="poolBtn text-center">
                                        <div className="playBtn">
                                           <Link to='lottery'>Lottery Pool</Link>
                                        </div>
                                        <div className="shareBtn">
                                           <Link to='reward'> Reward Pool</Link>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                            <p className="secondText">NFT<small>s</small> distributed <br></br> Daily</p>
                        </div>
                        
                    </div>
               </div>
            </div>
        </React.Fragment>
    )
}

export default Pool;