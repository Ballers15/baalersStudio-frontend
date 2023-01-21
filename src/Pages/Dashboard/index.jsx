import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap"
import { Accordion } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import $ from 'jquery'; 
import Modal from 'react-bootstrap/Modal';
import '../../font/valorant/Valorant-Font.ttf'
import './Dashboard.css'
import Italian_Mafia_Boss from '../../Assest/img/Italian_Mafia_Boss.png'
import slide2 from '../../Assest/img/slide2.png'
import slide3 from '../../Assest/img/slide3.png'
import reward_card from '../../Assest/img/reward_card.png'
import r1 from '../../Assest/img/r1.png'
import coin from '../../Assest/img/coin.png'
import semiCoin from '../../Assest/img/semiCoin.png'
import image27 from '../../Assest/img/image27.png'
import image28 from '../../Assest/img/image28.png'
import image29 from '../../Assest/img/image29.png'
import ballerCoin from '../../Assest/img/ballerCoin.png'
import star from '../../Assest/img/Star.svg'
import bg_purple from '../../Assest/img/bg_purple.png'
import bg_yellow from '../../Assest/img/bg_yellow.png'
import discord from '../../Assest/img/discord.svg'
import tdefi from '../../Assest/img/logos/tdefi.png'
import tradedog from '../../Assest/img/logos/tradedog.png'
import tdmm from '../../Assest/img/logos/tdmm.png'
import tdx from '../../Assest/img/logos/tdx.png'
import ith from '../../Assest/img/logos/ith.png'
import logoo from '../../Assest/img/logoo.png'
import gamecity from '../../Assest/img/gamecity.png'
import teen from '../../Assest/img/teen.png'
import arrowRight from '../../Assest/img/arrowRight.svg'
import ellipse from '../../Assest/img/ellipse.png'
import ellipse2 from '../../Assest/img/ellipse2.png'
import ellipse3 from '../../Assest/img/ellipse3.png'
import house from '../../Assest/img/house.png'
import house1 from '../../Assest/img/house1.png'
import starL from '../../Assest/img/starL.svg'
import starM from '../../Assest/img/starM.svg'
import starS from '../../Assest/img/starS.svg'
import {
    useParams,
  } from "react-router-dom";
window.addEventListener(
    "scroll",
    () => {
        document.body.style.setProperty(
            "--scroll",
            window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
        );
    },
    false
);

function useHover() {
    const [hovering, setHovering] = useState(false)
    const onHoverProps = {
      onMouseEnter: () => setHovering(true),
      onMouseLeave: () => setHovering(false),
    }
    return [hovering, onHoverProps]
  }
const Dashboard = () => {
    const [buttonAIsHovering, buttonAHoverProps] = useHover() 
    
    const [playModalShow, setPlayModalShow] = useState(false);
    const [lotteryModalShow, setLotteryModalShow] = useState(false);
    const [rewardModalShow, setRewardModalShow] = useState(false);
    const [trailerModalShow, setTrailerModalShow] = useState(false);
    const { id } = useParams();
    const handleShow = (modalName)=>{
        if(modalName == 'play'){
            setPlayModalShow(true);
        }else if(modalName == 'lottery'){
            setLotteryModalShow(true);
        }
        else if(modalName == 'reward'){
            setRewardModalShow(true);
        }
        else if(modalName == 'trailer'){
            setTrailerModalShow(true);
        }
    }
    const handleHide = (modalName)=>{
        if(modalName == 'play'){
            setPlayModalShow(false);
        }else if(modalName == 'lottery'){
            setLotteryModalShow(false);
        }
        else if(modalName == 'reward'){
            setRewardModalShow(false);
        }
        else if(modalName == 'trailer'){
            setTrailerModalShow(false);
        }
        
    }
    useEffect(() => {
        // Update the document title using the browser API
        if(id == 'partyGang'){
            $('html, body').animate({
                scrollTop: $("#partyGang").offset().top
            }, 20);            
          }
          else if(id == 'balrToken'){
            console.log("id",id);
                 $('html, body').animate({
                    scrollTop: $("#balrToken").offset().top
                }, 20);
          }        
      });

    return (
        <React.Fragment>
            <Modal
                show={playModalShow}
                onHide={()=> handleHide('play')}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>stay tuned</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Stay tuned for our Testnet competition to win $BALR token</h4>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        {/* <Form.Label>Email address</Form.Label> */}
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
 
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </Modal.Body>
                
            </Modal>
            <Modal
                show={trailerModalShow}
                onHide={()=> handleHide('trailer')}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                   
                </Modal.Header>
                <Modal.Body>
                 <p>trailer</p>
                </Modal.Body>
                
            </Modal>
            <Modal
                show={lotteryModalShow}
                onHide={()=> handleHide('lottery')}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Lottery Pool</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p>
                Participate in the Daily lottery pools by depositing your in-game cash and you might win Baller's NFTs and other rewards.
                </p>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={()=> handleHide('lottery')}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer> */}
            </Modal>
            <Modal
                show={rewardModalShow}
                onHide={()=> handleHide('reward')}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Reward Pool</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 <p>
                 Greater rewards await those who participate in the Reward Pool.
                 </p>
                 <p>
                 Baller NFT Holders will get a chance to win $BALR tokens daily, be on top of the community leaderboard and be a real Ballers!
                 </p>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={()=> handleHide('lottery')}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer> */}
            </Modal>
            <div className="dashboard">
                <div className="homeBg">
                    <div>
                        <div className="row mainSlider">
                            <div className="col-12">
                                <Carousel interval={null} wrap={false} >
                                    <Carousel.Item>
                                        <Carousel.Caption>
                                            <img src={ellipse} className="bgShade" />
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-sm-5 my-auto">
                                                        <div className="sCaption">
                                                            <div>
                                                                <p>Play | Party | <b>Earn</b> </p>
                                                                <h1>BALLERS CITY </h1>
                                                                <div className="fStar">
                                                                     
                                                                    <img src={starS} className="starSmall small" alt="" />
                                                                </div>

                                                                {/* <svg width="100" height="100" viewBox="0 0 100 100" id="four">
                                                                    <g className="group" opacity="0.8">

                                                                        <g className="small">
                                                                            <path id="small" d="M41.25,40 L42.5,25 L43.75,40 L45,41.25 L60,42.5 L45,43.75
                                                                                            L43.75,45 L42.5,60 L41.25,45 L40,43.75 L25,42.5 L40,41.25z" fill="#C51EE0" />
                                                                        </g>
                                                                    </g>
                                                                </svg> */}
                                                                <p className="textHeader mb-5">
                                                                    A Web 3.0 hyper casual game that is your gateway to play, engage and socialize with your gang at exclusive parties.
                                                                </p>
                                                                <h5>Early access to the Ballers City</h5>
                                                            </div>
                                                            <div className="positionAbs">
                                                                <div className="playBtn" >
                                                                    <a  onClick={()=> handleShow('play')}><span></span>Play now</a>
                                                                </div>
                                                                <div className="shareBtn">
                                                                    <a onClick={()=> handleShow('trailer')}><span></span>SHARE NOW</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-7 text-right">
                                                        <img src={Italian_Mafia_Boss} alt="Italian_Mafia_Boss" />
                                                    </div>
                                                </div>
                                            </div>


                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img className="d-block w-100 h-100" src={slide2} alt="Second slide"
                                        />
                                         <div className="stars slideStar">
                                            <img src={starM} className="starMed large" alt="" />
                                            <img src={starS} className="starSmall small" alt="" />
                                        </div>
                                        <div className="box"></div>
                                        <Carousel.Caption>
                                            <div className="container">
                                                <div className="sCaption secondSlide">
                                                    <div>
                                                        <p className="fw-bold">$BALR powered Web3 engagement Venture</p>
                                                        <h1>BALLERS </h1>
                                                        <p className="textHeader wth-4">
                                                            With Ballers Studio, you can experience high quality games, engage with like minded communities and win high value rewards, all powered by the $BALR token.
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img className="d-block w-100 h-100" src={slide3} alt="Second slide"
                                        />
                                        <div>
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
                                                                        L43.75,45 L42.5,60 L41.25,45 L40,43.75 L25,42.5 L40,41.25z" fill="white" />
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
                                        </div>
                                        <Carousel.Caption>


                                            <div className="w-100">
                                                <div className="text-center thirdSlide">
                                                    <div className="sCaption text-center">
                                                        <div>
                                                            <p>Play & Earn </p>
                                                            <h1>POOL </h1>
                                                            <p className="textHeader">
                                                                Win rewards having real-world value, ranging from $BALR tokens, and NFTs, to tickets for physical parties around the world.
                                                            </p>
                                                        </div>
                                                        <div className="poolBtn text-center">
                                                            <div className="playBtn">
                                                                <a  onClick={()=> handleShow('lottery')}><span></span> Lottery Pool</a>
                                                            </div>
                                                            <div className="shareBtn">
                                                                <a  onClick={()=> handleShow('reward')}><span></span> Reward Pool </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>

                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>
                        <div className="logoSlider">
                            <Carousel>
                                <Carousel.Item>
                                    <Carousel.Caption>
                                        <div className="container">
                                            <div className="row align-items-center justify-content-center">
                                                <div className="col-2 col-sm-2">
                                                    <img src={tradedog} alt="tradedog" />
                                                </div>
                                                <div className="col-2 col-sm-2">
                                                    <img src={tdx} alt="tdx" />
                                                </div>
                                                <div className="col-2 col-sm-2">
                                                    <img src={tdefi} alt="tdefi" />
                                                </div>
                                                <div className="col-2 col-sm-2">
                                                    <img src={tdmm} alt="tdmm" />
                                                </div>
                                                <div className="col-2 col-sm-2">
                                                    <img src={ith} alt="ith" />
                                                </div>
                                            </div>
                                        </div>


                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <Carousel.Caption>
                                        <div className="container">
                                            <div className="row align-items-center justify-content-center">
                                                <div className="col-sm-12">
                                                    <p className="fw-bold">A WEB 3.0 CLICKER GAME</p>
                                                </div>

                                            </div>
                                        </div>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </div>
                    </div>
                </div>


                <div className="reward">
                    <div>
                        <img src={starL} id="one" className="large" alt="" />
                        <img src={starM} id="two" className="small" alt="" />
                        <img src={starS} id="three" className="large" alt="" />
                    </div>
                    {/* <div className="bggg"></div> */}
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="">
                                    <div className="rewardImage bg-static">
                                        <div className="bg-move">
                                            <img src={reward_card} alt="Italian_Mafia_Boss" />
                                            <img src={r1} alt="Italian_Mafia_Boss" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 my-auto">
                                <div className="rewadText">
                                    <div className="coinImage">
                                        <img src={coin} alt="coin image" />
                                    </div>
                                    <div className="positionRelative mb-4">
                                        <h2 className="heading">Reward</h2>
                                        <h2 className="heading2">Reward</h2>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-font">
                                        Ballers City is one of the only games that enables you to earn on a daily basis. Players can win rewards from Reward pools, Lottery Pots and Quests! No matter what your skill level or collection size, there is always an opportunity to earn!

                                        </p>
                                        <p className="text-font">
                                        Among the many prizes you may win are collectible cards of varying rarity, $BALR tokens, Party tickets and many more!
                                        </p>
                                        <p className="text-font"> <b>Ballers city is all about Play, Party and Earn </b> </p>
                                    </div>
                                    <div className="innerBtn">
                                        <a href="/pool" ><span></span>View pool</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="backCoin"> <img src={semiCoin} alt="coin image" /></div>
                </div>
                <div className="">
                    <div className="gradientBackgroung secPaddingY">

                        <div className="container" id="partyGang">
                            <div className="stars">
                                <img src={starM} className="starMed large" alt="" />
                                <img src={starS} className="starSmall small" alt="" />
                            </div>
                            <div className="scene section" id="sticky">
                                <div className="positionRelative mt-5">
                                    <h2 className="heading text-center">Party with your Gang</h2>
                                    <h2 className="heading2 text-center">Party with your Gang</h2>
                                </div>
                                <div className="row positionRelative">
                                    <div className="col-sm-7 my-auto">
                                        <div className="">
                                            <div className="mb-5">
                                                <p className="text-font"> Work hard, play hard, and party even harder. </p>
                                                <p className="text-font">Assemble your gang and join the Baller's community where you can party like never before with Crypto OGs, gamers and other like minded people across the globe and awaken the true BALLER within you!</p>
                                                <p className="text-font">
                                                We are hosting exclusive private parties, E sports competitions and Cosplay events, so that every Baller can have have night worth remembering
                                                </p>
                                                <h4><b>Loveland party coming soon!</b> </h4>
                                            </div>
                                            <div className="innerBtn">
                                                <a href="https://discord.com/login?redirect_to=%2Flogin%3Fredirect_to%3D%252Fchannels%252F1060526333014331412%252F1060526333815431259" target="blank" rel="noopener noreferrer"><span></span>Join <img src={discord} className="discordIcon" alt="discord" /></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-5">

                                        <div className="dancingImg">
                                            <div >
                                                <div className="viewer"></div>
                                            </div>

                                        </div>
                                        <div className="partyHard">PARTY HARD</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <img src={ellipse2} className="bgShade2" />

                        <div className="container">
                            <div className="news news--news_page row">
                                <div className="news-list col-sm-6">
                                    <div className="news-list-wrap">
                                        <div className="news-list-column system">
                                            <a  className="news-item star pink">
                                                <img className="news-item-bg" src={image28} alt="" />

                                            </a>
                                            <a  className="news-item star black">
                                                <img className="news-item-bg" src={image28} alt="" />

                                            </a>
                                            <a  className="news-item star white">
                                                <img className="news-item-bg" src={image28} alt="" />

                                            </a>

                                        </div>

                                    </div>

                                </div>
                                <div className="news-caption-wrap col-sm-6">
                                    <div className="stars">
                                        <img src={starM} className="starMed large" alt="" />
                                    </div>
                                    <div className="news-caption">
                                        <div className="">

                                            <div className="mb-5">
                                                <p className="text-font">
                                                    Choose from our collection of 10,000 NFT characters, each having their own storyline and vibe.
                                                </p>
                                                <p className="text-font">
                                                  These NFTs are your only way to access the city that never sleeps. Get the exclusive Ballers NFT to join the clan before the time runs out!
                                                </p>
                                                <div className="row">
                                                    <div className="col-6 col-sm-4">
                                                        <div> Total Unique NFTs</div>
                                                        <h5 className="num">17K</h5>
                                                    </div>
                                                    <div className="col-6 col-sm-4">
                                                        <div>Total Number of NFTs</div>
                                                        <h5 className="num">10,000</h5>
                                                    </div>
                                                    {/* <div className="col-sm-3">
                                                        <div>Volume</div>
                                                        <h5 className="num">TBA</h5>
                                                    </div> */}
                                                </div>                                                
                                            </div>
                                            <div className="innerBtn"  {...buttonAHoverProps}>
                                                <a className="btnWith"><span></span>    {buttonAIsHovering ? "coming soon" : "View NFT's"} </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div>
                                        <div className="nftCollectionHead mt-5">
                                            <h2 className="heading">NFT COLLECTION</h2>
                                            <h2 className="heading2">NFT COLLECTION</h2>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div className="rotateDiv secPaddingY">
                            <div className="marquee">
                                <div className="marquee-item" data-dir='right'>
                                    <div className="marquee-row">BALR TOKEN <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> </div>
                                    <div className="marquee-row">BALR TOKEN <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> BALR TOKEN  <img src={star} alt="star" /> </div>
                                </div>

                            </div>
                        </div>
                        <div className="container positionRelative ballerSec" id="balrToken">
                            <div className="positionRelative text-right">
                                <h2 className="heading">BALR TOKEN</h2>
                                <h2 className="balrHead">BALR TOKEN</h2>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 my-auto">
                                    <div className="">
                                        <div className="pb-4">
                                            <p className="text-font">
                                                <b>$BALR</b> $BALR unlocks your ability to earn and win exclusive rewards based on your In-game engagement.
                                            </p>
                                            <p className="text-font">Experience the complete vibe of our next-gen Web3.0 games through the power of $BALR</p>
                                        </div>

                                        <div className="innerBtn"  {...buttonAHoverProps}>
                                            <a className="purchaseWith"><span></span>    {buttonAIsHovering ? "coming soon" : "PURCHASE NOW"} </a>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="col-sm-6">

                                    <div className="ballercoin text-center">
                                        <div className="flashDiv">
                                            <div className="flashLight"></div>
                                            <div className="flashLight2"></div>
                                        </div>

                                        <img src={ballerCoin} alt="Italian_Mafia_Boss" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img src={starL} id="one" className="large" alt="" />
                                <img src={starM} id="two" className="small" alt="" />
                                <img src={starS} id="three" className="large" alt="" />

                            </div>
                        </div>
                        <div className="container positionRelative mt-12rem">
                            <div className="divImage"><img src={image28} alt="card" /> </div>
                            <div className="joinCard">
                                <div className="bg-circle"></div>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="imgBg"></div>
                                    </div>
                                    <div className="col-sm-6 text-center my-auto">
                                        <p className="joinUs">Join Our Community</p>
                                        {/* <div className="semiCircle">
                                            <a href="" className="getStart">GET STARTED <img src={arrowRight} alt="arrow" /></a>
                                        </div> */}
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="">
                                            <img className="hex1" src={bg_yellow} alt="yellow background" />
                                            <a href="https://medium.com/@Ballers_Studio" target="blank" rel="noopener noreferrer"><i class="fa fa-medium" aria-hidden="true"></i></a>
                                          
                                            {/* <img src={discord} className="discordIcon" alt="discord" /> */}
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <img className="hex2" src={bg_purple} alt="purple background" />
                                                   <a href="https://twitter.com/Ballers_Studio" target="blank" rel="noopener noreferrer"><i className="fa fa-twitter" /></a> 
                                                </div>
                                                <div className="col-sm-6">
                                                    <img className="hex3" src={bg_yellow} alt="yellow background" />
                                                    <a href="https://www.instagram.com/ballers.studio/" target="blank" rel="noopener noreferrer">
                                                    <i className="fa fa-instagram" ></i>
                                                    </a>
                                                  
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container paddingY-5 mt-5 positionRelative">
                            <img src={ellipse3} className="bgShade3" />
                            <div className="row">
                                <div className="col-sm-5">
                                    <div className="positionRelative mb-5">
                                        <h2 className="heading">FAQ</h2>
                                        <h2 className="faqHead">FAQ</h2>
                                        <p>Blend your style and experience on a global, competitive stage.</p>
                                    </div>
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>When will the $BALR token launch?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>
                                                    The baller token TGE will occur in Q1, 2023

                                                </p>

                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Where can I get $BALR token </Accordion.Header>
                                            <Accordion.Body>
                                                <p>
                                                    $BALR token, once launched will be available for purchase on all major exchanges
                                                </p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>When will the studio launch its next project? </Accordion.Header>
                                            <Accordion.Body>
                                                <p>
                                                    Ballers Studio will soon launch a line of engaging and fun games with a high-end graphics shooter launch to be announced soon.
                                                </p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="3">
                                            <Accordion.Header>When will the Ballers NFT whitelist begin?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>
                                                    The NFT whitelist will begin soon, you can follow our social channels to stay updated.
                                                </p>
                                            </Accordion.Body>
                                        </Accordion.Item>

                                    </Accordion>
                                </div>
                                <div className="col-sm-7 my-auto">
                                    <section className="comparisonSection">

                                        <div className="comparisonImage beforeImage">
                                            <img src={house1} alt="before" />
                                        </div>
                                        <div className="comparisonImage afterImage">
                                            <img src={house} alt="after" />
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                        <div className="container mt-4">
                            <div className="row align-items-center">
                                <div className="col-5 col-sm-3">
                                    <img src={logoo} alt="logo" />
                                </div>
                                <div className="col-7 col-sm-3">
                                    <div className="d-flex align-items-center">
                                        <img src={teen} alt="logo" />
                                        <ul>
                                            <li>Blood </li>
                                            <li>Language</li>
                                            <li>Violence</li>
                                            <li>Users Interact </li>
                                            <li>In-Game Purchases</li>
                                        </ul>
                                    </div>

                                </div>
                                <div className="col-5 col-sm-3">
                                    <img src={gamecity} alt="logo" className="mob-wth" />
                                </div>
                                <div className="col-7 col-sm-3">
                                    <ul className="policy">
                                        <li>Privacy notice</li>
                                        <li>Term of service</li>
                                        <li>Cookie prefrence</li>
                                    </ul>

                                </div>


                            </div>
                             <ul className="socialIcons">
                                <li><a href="https://www.instagram.com/ballers.studio/" target="blank" rel="noopener noreferrer"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                                <li><a href="https://discord.com/login?redirect_to=%2Flogin%3Fredirect_to%3D%252Fchannels%252F1060526333014331412%252F1060526333815431259" target="blank" rel="noopener noreferrer"><img src={discord} alt="" /></a></li>
                                <li> <a href="https://www.linkedin.com/company/ballersstudio/about/" target="blank" rel="noopener noreferrer"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                <li><a href="https://twitter.com/Ballers_Studio" target="blank" rel="noopener noreferrer"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                                <li><a href="https://medium.com/@Ballers_Studio" target="blank" rel="noopener noreferrer"><i class="fa fa-medium" aria-hidden="true"></i></a></li>
                             </ul>
                        </div>
                    </div>

                </div>

            </div>



        </React.Fragment>
    )
}

export default Dashboard;