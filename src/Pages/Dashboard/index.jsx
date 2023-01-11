import React, {useEffect} from "react";
import { Carousel } from "react-bootstrap"
import { Accordion } from "react-bootstrap"; 
import '../../font/valorant/Valorant-Font.ttf'
import $ from 'jquery'
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
    useEffect(() => {
        const script1 = document.createElement('script');
        const script2 = document.createElement('script');
      
        script1.src = "https://unpkg.co/gsap@3/dist/gsap.min.js";
        script2.src = "https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js";

        script1.async = true;
        script2.async = true;
      
        document.body.appendChild(script1);
        document.body.appendChild(script2);
      
        return () => {
          document.body.removeChild(script1);
          document.body.removeChild(script2);
        }
      }, []);
    return (
        <React.Fragment>
            <div className="dashboard"> 
                <div className="homeBg">
                   <div>
                        <div className="row mainSlider">
                            <div className="col-12">
                                <Carousel interval={null} >
                                    <Carousel.Item>
                                        {/* <img
                                        className="d-block w-100"
                                        src="https://picsum.photos/500/300?img=1"
                                        alt="First slide"
                                        /> */}
                                        <Carousel.Caption>
                                           <div className="container">
                                                <div className="row">
                                                    <div className="col-sm-5 my-auto">
                                                        <div className="sCaption">
                                                            <div>
                                                                <p>A WEB 3.0 CLICKER <b>GAME</b> </p>
                                                                <h1>BALLERS CITY </h1>
                                                                <p className="textHeader mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus, turpis massa arcu blandit justo enim. Mauris dis libero leo in amet proin sagittis fringilla.</p>
                                                                <h5>WHY DON’T YOU TRY IT NOW ?</h5>
                                                            </div>
                                                        <div className="playBtn">
                                                                <a href="#"><span></span>Play now</a>
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
                                            <div className="sCaption secondSlide">
                                                    <div>
                                                        <p className="fw-bold">A WEB 3.0 GAMING STUDIO</p>
                                                        <h1>BALLERS </h1>
                                                        <p className="textHeader wth-4">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus, turpis massa arcu blandit justo enim. Mauris dis libero leo in amet proin sagittis fringilla.
                                                        </p> 
                                                    </div>                                          
                                                            
                                                </div>
                                           </div>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img  className="d-block w-100 h-100" src={slide3} alt="Second slide"
                                        />
                                        <Carousel.Caption>
                                        <div className="sCaption text-center">
                                            <div>
                                                <p>A PLAY & EARN REWARD <b>SYSTEM</b> </p>
                                                <h1>POOL </h1>
                                                <p className="textHeader m-auto wth-4">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus, turpis massa arcu blandit justo enim. Mauris dis libero leo in amet proin sagittis fringilla.
                                                </p>
                                                
                                            </div>
                                            <div className="playBtn">
                                                    <a href="#"><span></span>LOTTERY POT</a>
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
                    <div className="bggg"></div>
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
                                
                                    <p className="text-font">Blend your style and experience on a global, competitive stage. You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities.  
                                    </p>
                                    <p className="text-font">                                
                                    And, with one life per-round, you'll need to think faster than your opponent if you want to survive.
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
                <div className="gradientBackgroung secPaddingY">
                    <div className="container">
                        <div className="positionRelative">
                            <h2 className="heading text-center">Crash the Party</h2>
                            <h2 className="heading2 text-center">Crash the Party</h2>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 my-auto">                            
                                <div className="">                           
                                    <p className="text-font">
                                    Blend your style and experience on a global, competitive stage. You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities. And, with one life per-round, you'll need to think faster than your opponent if you want to survive. Take on foes across Competitive and Unranked modes as well as Deathmatch and Spike Rush.   
                                    </p>
                                    <p className="text-font">                         
                                    Blend your style and experience on a global, competitive stage. You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities. And, with one life per-round, you'll need to think faster than your opponent if you want to survive. Take on foes across Competitive and Unranked modes as well as Deathmatch and Spike Rush.
                                    </p>
                                    <div className="innerBtn">
                                        <a href="#"><span></span>Join <img src={discord} className="discordIcon" alt="discord" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                 <div className="dancingImg">
                                    <img src={SneefDog} alt="Italian_Mafia_Boss" />         
                                </div>                           
                            </div>                        
                        </div>
                    </div>
                    <div className="news news--news_page">
                        
                        <div className="news-list">
                            <div className="news-list-wrap">
                                <div className="news-list-column system">
                                    <a href="#" className="news-item star pink">
                                        <img className="news-item-bg" src={image28} alt="" />
                                    
                                    </a>
                                    <a href="#" className="news-item star black">
                                        <img className="news-item-bg" src={image27} alt="" />
                                        
                                    </a>
                                    <a href="#" className="news-item star white">
                                        <img className="news-item-bg" src={image29} alt="" />
                                        
                                    </a>
                                    
                                </div>
                            
                            </div>
                        </div>
                        <div className="news-caption-wrap">
                            <div className="news-caption">
                                <h2 className="title section-title white news-title">News &  Resources</h2>
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
                    <div className="container positionRelative">                        
                        <div className="row">
                            <div className="col-sm-6 my-auto">                            
                                <div className="">                           
                                    <p className="text-font">
                                    Blend your style and experience on a global, competitive stage. You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities. 
                                    </p>
                                    <p className="text-font">And, with one life per-round, you'll need to think faster than your opponent if you want to survive.</p>
                                    
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
                                {/* <div className='light'></div>  */}
                                {/* <div className="flashAnim"></div> */}
                                 <div className="ballercoin text-center">
                                 
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
                                    <Accordion.Header>Blend your style and experience on a global, competitive stage?</Accordion.Header>
                                    <Accordion.Body>
                                        <p>
                                        You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities. And, with one life per-round, you'll need to think faster than your opponent if you want to survive.
                                        </p>
                                   
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Your style and experience on a global, competitive stage?</Accordion.Header>
                                    <Accordion.Body>
                                   <p>
                                   You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities. And, with one life per-round, you'll need to think faster than your opponent if you want to survive.
                                   </p>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Your style and experience on a global?</Accordion.Header>
                                    <Accordion.Body>
                                   <p>
                                   You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities. And, with one life per-round, you'll need to think faster than your opponent if you want to survive.
                                   </p>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>Your style and experience on a global, competitive?</Accordion.Header>
                                    <Accordion.Body>
                                   <p>
                                   You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities. And, with one life per-round, you'll need to think faster than your opponent if you want to survive.
                                   </p>
                                    </Accordion.Body>
                                </Accordion.Item>
                                
                                </Accordion>
                            </div>
                            <div className="col-sm-6">
                            {/* <img id="img" src={image28} /> */}
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
             
             
             
        </React.Fragment>
    )
}

export default Dashboard;