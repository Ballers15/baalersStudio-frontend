import React, {useEffect} from "react";
import { Carousel } from "react-bootstrap"
import { Accordion } from "react-bootstrap"; 
import '../../font/valorant/Valorant-Font.ttf' 
import './Dashboard.css'
import Italian_Mafia_Boss from '../../Assest/img/Italian_Mafia_Boss.png' 
import slide2 from '../../Assest/img/slide2.png'
import slide3 from '../../Assest/img/slide3.png'
import reward_card from '../../Assest/img/reward_card.png'
import r1 from '../../Assest/img/r1.png'
import coin from '../../Assest/img/coin.png'
import SneefDog from '../../Assest/img/SneefDog.png'
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
import house from '../../Assest/img/house.png'
import house1 from '../../Assest/img/house1.png'

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
  
const Dashboard = () => {    
    return (
        <React.Fragment>
            <div className="dashboard"> 
                <div className="homeBg">
                   <div>
                        <div className="row mainSlider">
                            <div className="col-12">
                                <Carousel interval={null} >
                                    <Carousel.Item> 
                                        <Carousel.Caption>
                                        <img src={ellipse} className="bgShade"/>
                                           <div className="container">
                                                <div className="row">
                                                    <div className="col-sm-5 my-auto">
                                                        <div className="sCaption">
                                                            <div>
                                                                <p>Play | Party | Earn </p>
                                                                <h1>BALLERS CITY </h1>
                                                                 
                                                                <svg width="100" height="100" viewBox="0 0 100 100" id="four">
                                                                    <g className="group" opacity="0.8">
                                                                        
                                                                        <g className="small">
                                                                        <path id="small" d="M41.25,40 L42.5,25 L43.75,40 L45,41.25 L60,42.5 L45,43.75
                                                                                            L43.75,45 L42.5,60 L41.25,45 L40,43.75 L25,42.5 L40,41.25z" fill="#C51EE0" />
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                                <p className="textHeader mb-3">
                                                                A Web 3.0 hyper casual game that is your gateway to play, engage and socialize with your gang at exclusive parties.
                                                                </p>
                                                                <h5>Early access to the Ballers City</h5>
                                                            </div>
                                                            <div className="positionRelative">
                                                            <div className="playBtn">
                                                                <a href="#"><span></span>Play now</a>
                                                            </div>
                                                            <div className="shareBtn">
                                                                <a href="#"><span></span>SHARE NOW</a>
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
                                        <img  className="d-block w-100 h-100" src={slide2} alt="Second slide"
                                        /> 
                                        
                                        <Carousel.Caption>
                                           <div className="container">
                                            <div className="sCaption secondSlide box">
                                                    <div>
                                                        <p className="fw-bold">A WEB 3.0 GAMING STUDIO</p>
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
                                        <img  className="d-block w-100 h-100" src={slide3} alt="Second slide"
                                        />
                                        <div>
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
                                        <Carousel.Caption>
                                            
                                            <div className="row justify-content-center">
                                                <div className="col-sm-6">
                                                    <div className="sCaption text-center">
                                                        <div>
                                                            <p>A PLAY & EARN REWARD <b>SYSTEM</b> </p>
                                                            <h1>POOL </h1>
                                                            <p className="textHeader">
                                                            Win rewards having real-world value, ranging from $BALR tokens, and NFTs, to tickets for physical parties around the world.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-8">
                                                    <div className="positionRelative text-center">                                                       
                                                        <div className="playBtn marTopLeft">
                                                            <a href="#"><span></span>LOTTERY POT</a>
                                                        </div>   
                                                        <div className="shareBtn">
                                                            <a href="#"><span></span>SHARE NOW</a>
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
                                                <div className="col-sm-2">
                                                    <img src={tradedog} alt="tradedog" /> 
                                                </div>
                                                <div className="col-sm-2">
                                                <img src={tdx} alt="tdx" /> 
                                                </div>
                                                <div className="col-sm-2">
                                                <img src={tdefi} alt="tdefi" /> 
                                                </div>
                                                <div className="col-sm-2">
                                                <img src={tdmm} alt="tdmm" /> 
                                                </div>
                                                <div className="col-sm-2">
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
                        <svg width="100" height="100" viewBox="0 0 100 100" id="one">
                            <g className="group" opacity="0.8">
                                <g className="large">
                                <path id="large" d="M41.25,40 L42.5,10 L43.75,40 L45, 41.25 L75,42.5 L45,43.75
                                                    L43.75,45 L42.5,75 L41.25,45 L40,43.75 L10,42.5 L40,41.25z " fill="white" />
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
                                                    L43.75,45 L42.5,75 L41.25,45 L40,43.75 L10,42.5 L40,41.25z " fill="white" />
                                </g>
                                
                            </g>
                        </svg>
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
                            <div className="col-sm-6 mt-3">                           
                                <div className="rewadText">
                                    <div className="coinImage">
                                    <img src={coin} alt="coin image" />
                                    </div>
                                    <div className="positionRelative">
                                        <h2 className="heading">Reward</h2>
                                        <h2 className="heading2">Reward</h2>
                                    </div>
                                
                                    <p className="text-font">
                                    Become a Baller and get a chance to win rewards. Play, Party, Earn and win $BALR Token and NFTs along with access to exclusive parties. 
                                    </p>
                                    <p className="text-font">                                
                                    Our reward pools ensure that everyone earns with their engagement in the game. Ballers city is all about wealth generation, conquering the town, and partying with your gang.
                                    </p>
                                    <div className="innerBtn">
                                        <a href="#"><span></span>View pool</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="backCoin"> <img src={coin} alt="coin image" /></div>
                </div>
                <div className="">
                    <div className="gradientBackgroung secPaddingY">
                           
                        <div className="container">
                            <div className="scene section" id="sticky">
                                <div className="positionRelative mt-5">
                                    <h2 className="heading text-center">Party with your Gang</h2>
                                    <h2 className="heading2 text-center">Party with your Gang</h2>
                                </div>
                                <div className="row positionRelative">
                                    <div className="col-sm-6 my-auto">                            
                                        <div className="">                           
                                            <p className="text-font">
                                            Assemble your gang in our ecosystem connecting gamers around the world, get access to real-world parties with our community of OG’s and awaken the true BALLER within you.
                                            </p>
                                            <p className="text-font">                         
                                            We plan to host exclusive yacht parties, music festivals, cosplay events, etc where real ballers can party like there is no tomorrow.
                                            </p>
                                            <h4>Loveland party coming soon!</h4>
                                            <div className="innerBtn">
                                                <a href="#"><span></span>Join <img src={discord} className="discordIcon" alt="discord" /></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6"> 

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
                    
                        <div className="container">
                            <div className="news news--news_page row">                            
                                <div className="news-list col-sm-6">
                                    <div className="news-list-wrap">
                                        <div className="news-list-column system">
                                            <a href="#" className="news-item star pink">
                                                <img className="news-item-bg" src={image28} alt="" />
                                            
                                            </a>
                                            <a href="#" className="news-item star black">
                                                <img className="news-item-bg" src={image28} alt="" />
                                                
                                            </a>
                                            <a href="#" className="news-item star white">
                                                <img className="news-item-bg" src={image28} alt="" />
                                                
                                            </a>
                                            
                                        </div>
                                    
                                    </div>
                                    
                                </div>
                                <div className="news-caption-wrap col-sm-6">
                                    <div className="news-caption">
                                        <div className="">                           
                                            <p className="text-font">
                                            Choose from our collection of 10,000 NFT characters, each having their own storyline and vibe. 
                                            </p>
                                            <p className="text-font">                               
                                            Your only way to access the city that never sleeps. Get the exclusive Baller NFT to be part of the clan before the time runs out
                                            </p>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <div>Total NFTs</div>
                                                    <h5 className="num">10k</h5>
                                                </div>
                                                <div className="col-sm-3">
                                                    <div>NFTs Sold</div>
                                                    <h5 className="num">TBA</h5>
                                                </div>
                                                <div className="col-sm-3">
                                                    <div>Volume</div>
                                                    <h5 className="num">TBA</h5>
                                                </div>
                                            </div>
                                            <div className="innerBtn">
                                                <a href="#"><span></span>View NFT's</a>
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
                    
                    {/* <div className="container" > 
                        <div>
                            <div className="row pb-4 ">
                                <div className="col-sm-6">
                                    <div className="system">
                                    <div className="star pink">
                                    <img src={image28} alt="cardImage" />
                                    </div>
                                    <div className="star black">
                                    <img src={image27} alt="cardImage" />
                                    </div>
                                    <div className="star white">
                                    <img src={image29} alt="cardImage" />
                                    </div>
                                    </div>                                
                                </div> 
                                <div className="col-sm-6 my-auto">                            
                                    <div className="">                           
                                        <p className="text-font">
                                        Blend your style and experience on a global, competitive stage. You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities. 
                                        </p>
                                        <p className="text-font">                               
                                            And, with one life per-round, you'll need to think faster than your opponent if you want to survive.
                                        </p>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <div>Artwork</div>
                                                <h5 className="num">25.1k</h5>
                                            </div>
                                            <div className="col-sm-3">
                                                <div>Artist</div>
                                                <h5 className="num">15.6k</h5>
                                            </div>
                                            <div className="col-sm-3">
                                                <div>Aucition</div>
                                                <h5 className="num">10.2k</h5>
                                            </div>
                                        </div>
                                        <div className="innerBtn">
                                            <a href="#"><span></span>View NFT's</a>
                                        </div>
                                    </div>
                                </div>                                                 
                            </div>
                        </div>                       
                      
                        <div className="positionRelative mt-5">
                            <h2 className="heading">NFT COLLECTION</h2>
                            <h2 className="heading2">NFT COLLECTION</h2>
                        </div>
                    </div>   */}
                    <div className="rotateDiv secPaddingY">
                        <div className="marquee">
                            <div className="marquee-item" data-dir='left'>
                            <div className="marquee-row">BALR TOKEN <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> </div>
                            <div className="marquee-row">BALR TOKEN <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> </div>
                            </div>                           

                        </div>
                    </div>
                    <div className="container positionRelative ballerSec">        
                        <div className="row">
                            <div className="col-sm-6 my-auto">                            
                                <div className="">                           
                                    <p className="text-font">
                                    <b>$BALR</b> token unlocks your ability to earn as you play. Get access to exclusive rewards and next-gen Web3 games through $BALR.
                                    </p>
                                  
                                    
                                    <div className="innerBtn">
                                        <a href="#"><span></span>PURCHASE NOW</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="positionRelative">
                                    <h2 className="heading text-center">BALR TOKEN</h2>
                                    <h2 className="heading2 text-center">BALR TOKEN</h2>
                                </div>                                
                                
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
                        <svg width="100" height="100" viewBox="0 0 100 100" id="one">
                            <g className="group" opacity="0.8">
                                <g className="large">
                                <path id="large" d="M41.25,40 L42.5,10 L43.75,40 L45, 41.25 L75,42.5 L45,43.75
                                                    L43.75,45 L42.5,75 L41.25,45 L40,43.75 L10,42.5 L40,41.25z " fill="#C51EE0" />
                                </g>
                                
                            </g>
                        </svg>
                            
                        <svg width="100" height="100" viewBox="0 0 100 100" id="two">
                            <g className="group" opacity="0.8">
                                
                                <g className="small">
                                <path id="small" d="M41.25,40 L42.5,25 L43.75,40 L45,41.25 L60,42.5 L45,43.75
                                                    L43.75,45 L42.5,60 L41.25,45 L40,43.75 L25,42.5 L40,41.25z" fill="#C51EE0" />
                                </g>
                            </g>
                        </svg>
                        <svg width="100" height="100" viewBox="0 0 100 100" id="three">
                            <g className="group" opacity="0.8">
                                <g className="large">
                                <path id="large" d="M41.25,40 L42.5,10 L43.75,40 L45, 41.25 L75,42.5 L45,43.75
                                                    L43.75,45 L42.5,75 L41.25,45 L40,43.75 L10,42.5 L40,41.25z " fill="#C51EE0" />
                                </g>
                                
                            </g>
                        </svg>
                     </div> 
                    </div>
                    <div className="container positionRelative mt-12rem">
                        <div className="divImage"><img src={image28} alt="card"/> </div>
                        <div className="joinCard">
                            <div className="bg-circle"></div>
                            <div className="row">
                                <div className="col-sm-3">
                                    <div className="imgBg"></div>
                                </div>
                                <div className="col-sm-6 text-center mt-5">
                                    <p className="joinUs">Join Our Community</p>
                                    <div className="semiCircle">
                                    <a href="" className="getStart">GET STARTED <img src={arrowRight} alt="arrow" /></a>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="">
                                        <img className="hex1" src={bg_yellow} alt="yellow background"/>
                                        <img src={discord} className="discordIcon" alt="discord" />
                                      <div className="row">
                                        <div className="col-sm-6">
                                        <img className="hex2" src={bg_purple} alt="purple background"/>
                                        <i className="fa fa-twitter" />
                                        </div>
                                        <div className="col-sm-6">
                                        <img className="hex3" src={bg_yellow} alt="yellow background"/>
                                        <i className="fa fa-instagram" ></i>
                                        </div>
                                    </div>                             
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container secPaddingY mt-5">
                        <div className="row">
                            <div className="col-sm-6">
                            <div className="positionRelative mb-5">
                                <h2 className="heading">FAQ</h2>
                                <h2 className="heading2">FAQ</h2>
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
                            <div className="col-sm-6 my-auto">
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
                            <div className="col-sm-3">       
                                <img src={logoo} alt="logo" />                             
                            </div>
                            <div className="col-sm-3">       
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
                            <div className="col-sm-3">       
                                <img src={gamecity} alt="logo" />                             
                            </div>
                            <div className="col-sm-3">
                                <ul className="policy">
                                    <li>Privacy notice</li>
                                    <li>Term of service</li>
                                    <li>Cookie prefrence</li>
                                </ul>

                            </div>
                        
                           
                        </div>
                    </div>
                    </div>
                     
                </div>
               
            </div>
             
             
             
        </React.Fragment>
    )
}

export default Dashboard;