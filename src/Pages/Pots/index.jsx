import React, { useEffect, useState } from "react";
import './poolpots.css' 
import rewardBox from '../../Assest/img/rewardBox.png'
import star from '../../Assest/img/Star.svg'
import img1 from '../../Assest/img/img1.png'
import youtubePopup from '../../Assest/img/youtubePopup.PNG'
import {Table, Button, Form} from 'react-bootstrap';
import $ from 'jquery'; 
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2.5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1.5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
const PotPage = () => {
    $(document).ready(function(){
  
        $('.popup-btn').on('click', function(){
          $('.video-popup').fadeIn('slow');
          $('iframe')[0].play();
          return false;
        });
        
        $('.popup-bg').on('click', function(){
          $('.video-popup').slideUp('slow');
          $('iframe').attr('src', $('iframe').attr('src'));
        });
        
        //  $('.close-btn').on('click', function(){
        //    $('.video-popup').fadeOut('slow');  
        //    $('iframe')[0].pause();        
        //     return false;
        //  });

         $('.close-btn').on('click', function(){   
            $('.video-popup').fadeOut('slow');    
            $('iframe').attr('src', $('iframe').attr('src'));
        });
        
      });

   const [expiryTime, setExpiryTime] = useState("5 May 2023 12:30");
   const [countdownTime, setCountdownTime]= useState(
       {
           countdownDays:'',
           countdownHours:'',
           countdownlMinutes:'',
           countdownSeconds:''
       }
   );
    const countdownTimer=()=>{
    
        const timeInterval= setInterval(() => {
          const countdownDateTime = new Date(expiryTime).getTime(); 
          const currentTime = new Date().getTime();
          const remainingDayTime = countdownDateTime - currentTime;
          const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
          const totalHours = Math.floor((remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const totalMinutes = Math.floor((remainingDayTime % (1000 * 60 * 60)) / (1000 * 60));
          const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);
     
          const runningCountdownTime={
             countdownDays: totalDays,
             countdownHours: totalHours,
             countdownMinutes: totalMinutes,
             countdownSeconds: totalSeconds
          }
       
          setCountdownTime(runningCountdownTime);
     
          if (remainingDayTime < 0) {
             clearInterval(timeInterval);
             setExpiryTime(false);
            }
     
         }, 1000);
    }
     
    useEffect(() => {
        countdownTimer();
    });
    
   

return(
    <>
    <div className="lotteryPool">
        <div className="text-center potsHead thirdSlide">
            <div className="sCaption text-center">
                <div> 
                    <h1>LOTTERY POT </h1>
                    <p className="textHeader">
                    Win rewards having real-world value, ranging from $BALR tokens, and NFTs, to tickets for physical parties around the world.
                    </p>
                    <div className="poolBtn text-center pt-4">
                        <div className="playBtn">
                            <a><span></span> REDEEM NOW</a>
                        </div>
                        
                    </div>
                </div>
              
                
            </div>
        </div>
        <div className="gradientBackgroung pb-8 pt-5 howItWork">
              <div className="container">
                <div className="positionRelative mt-5 mb-5 headWth mx-auto">
                    <h2 className="heading text-center">
                    HOW IT WORKS
                    </h2>
                    <h2 className="heading2 text-center">
                    HOW IT WORKS
                    </h2>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        <div className="position-relative youtubeBox">
                            {/* <img src={youtubePopup} alt="" className="img-responsive" /> */}
                          
                            <button className="popup-btn"> 
                            <div className="waves-block">
                                <div className="waves wave-1"></div>
                                <div className="waves wave-2"></div>
                                <div className="waves wave-3"></div>
                            </div>
                            <i className="fa fa-play" aria-hidden="true"></i></button>
                        </div>
                  
  
                    <div className="video-popup">
                        <span className="close-btn">&times;</span>
                        <div className="popup-bg"></div>
                        <div className="popup-content"> 
                        <iframe className="video" src="https://www.youtube.com/embed/q_X9SWxjSss" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-4 my-auto">
                        <div className="ps-4">
                            <p>
                            Become a Baller and get a chance to win rewards. Play, Party, Earn and win $BALR Token and NFTs along with access to exclusive parties 
                            </p>
                            <p>
                            Our reward pools ensure that everyone earns with their engagement in the game. Ballers city is all about wealth generation, conquering the town, and partying with your gang.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="gradientBackgroung pb-8 pt-5 activePots">
              <div className="container">
                <div className="positionRelative mt-5 mb-5 headWth mx-auto">
                    <h2 className="heading text-center">
                    ACTIVE POT
                    </h2>
                    <h2 className="heading2 text-center">
                    ACTIVE POT
                    </h2>
                </div>
                <div className="row">
                    <div className="col-sm-5 my-auto">
                        <div className="text-center">
                            <div>
                                {expiryTime!==false?
                                    <>
                                    <span className="countFont">{countdownTime.countdownDays} <sub>d</sub></span>
                                    <span className="countFont pe-2">:</span>
                                    <span className="countFont">{countdownTime.countdownHours} <sub>h</sub></span>
                                    <span className="countFont pe-2">:</span>
                                    <span className="countFont">{countdownTime.countdownMinutes} <sub>m</sub></span>
                                    {/* <button type="button" className="btn btn-success">:</button>
                                    <button type="button" className="btn btn-outline-success">{countdownTime.countdownSeconds} <sub>Seconds</sub></button> */}
                                    </>
                                    :<p>Deal has been Expired</p>}
                            </div>

                            <p className="undColor">Until next draw</p>
                     
                            <h4 className="font6 pt-2">Redeem In Game Cash</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi morbi sit consectetur elit.</p>
                            <div className="poolBtn pt-2">
                                <div className="playBtn">
                                    <a><span></span> REDEEM NOW</a>
                                </div>
                            </div>                        
                        </div>
                    </div>
                    <div className="col-sm-7 text-center">
                        <img src={rewardBox} alt="rewardBox" className="rewardBox" id="rewardBoxOpen" />                        
                    </div>
                </div>
                <div className="finishSlider">
                    <div className="row">
                        <div className="col-sm-3 my-auto">
                            <p className="finishText"><i class="fa fa-arrow-left" aria-hidden="true"></i> Finished Rounds</p>
                        </div>
                        <div className="col-sm-9">
                            <Carousel responsive={responsive} infinite={true} autoPlay= {true} autoPlaySpeed={1000000} 
                            arrows={false} swipeable={true} draggable={true}  keyBoardControl={true} >
                            <div className="d-flex">
                                <img src={img1} alt="" />
                                <div className="roundDiv">
                                    <h3>Round 22</h3>
                                    <p><span>Drawn Dec 30, 2022, 5:30pm</span></p>
                                    <p className="winHead">Winners <span></span> </p> 
                                    <div className="row">
                                        <div className="col-sm-4">
                                        <img src={img1} alt="" />
                                        <p className="address">0x06...98e6@CelticChaos</p>
                                        </div>
                                        <div className="col-sm-4">
                                        <img src={img1} alt="" />
                                        <p className="address">0x06...98e6@CelticChaos</p>
                                        </div>
                                        <div className="col-sm-4">
                                        <img src={img1} alt="" />
                                        <p className="address">0x06...98e6@CelticChaos</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <img src={img1} alt="" />
                                <div className="roundDiv">
                                    <h3>Round 22</h3>
                                    <p><span>Drawn Dec 30, 2022, 5:30pm</span></p>
                                    <p className="winHead">Winners <span></span> </p> 
                                    <div className="row">
                                        <div className="col-sm-4">
                                        <img src={img1} alt="" />
                                        <p className="address">0x06...98e6@CelticChaos</p>
                                        </div>
                                        <div className="col-sm-4">
                                        <img src={img1} alt="" />
                                        <p className="address">0x06...98e6@CelticChaos</p>
                                        </div>
                                        <div className="col-sm-4">
                                        <img src={img1} alt="" />
                                        <p className="address">0x06...98e6@CelticChaos</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <img src={img1} alt="" />
                                <div className="roundDiv">
                                    <h3>Round 22</h3>
                                    <p><span>Drawn Dec 30, 2022, 5:30pm</span></p>
                                    <p className="winHead">Winners <span></span> </p> 
                                    <div className="row">
                                        <div className="col-sm-4">
                                        <img src={img1} alt="" />
                                        <p className="address">0x06...98e6@CelticChaos</p>
                                        </div>
                                        <div className="col-sm-4">
                                        <img src={img1} alt="" />
                                        <p className="address">0x06...98e6@CelticChaos</p>
                                        </div>
                                        <div className="col-sm-4">
                                        <img src={img1} alt="" />
                                        <p className="address">0x06...98e6@CelticChaos</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <img src={img1} alt="" />
                                <div className="roundDiv">
                                    <h3>Round 22</h3>
                                    <p><span>Drawn Dec 30, 2022, 5:30pm</span></p>
                                    <p className="winHead">Winners <span></span> </p> 
                                    <div className="row">
                                        <div className="col-sm-4">
                                        <img src={img1} alt="" />
                                        <p className="address">0x06...98e6@CelticChaos</p>
                                        </div>
                                        <div className="col-sm-4">
                                        <img src={img1} alt="" />
                                        <p className="address">0x06...98e6@CelticChaos</p>
                                        </div>
                                        <div className="col-sm-4">
                                        <img src={img1} alt="" />
                                        <p className="address">0x06...98e6@CelticChaos</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            </Carousel>
                             
                            <div className="innerBtn finishBtn">
                                <a>
                                    <span></span>CLAIM NOW
                                </a>
                            </div>
                            {/* <div>
                                {expiryTime!==false?
                                    <>
                                    <span className="countFont">{countdownTime.countdownDays} <sub>d</sub></span>
                                    <span className="countFont pe-2">:</span>
                                    <span className="countFont">{countdownTime.countdownHours} <sub>h</sub></span>
                                    <span className="countFont pe-2">:</span>
                                    <span className="countFont">{countdownTime.countdownMinutes} <sub>m</sub></span>
                                     </>
                                    :<p>Deal has been Expired</p>}
                            </div> */}
                        </div>
                    </div>
                </div>
                

                
                <div className="rotateDiv secPaddingY">
                <div className="marquee">
                  <div className="marquee-item" data-dir="right">
                    <div className="marquee-row">
                    LEADERBOARD{' '}
                      <img src={star} width={79} height={80} alt="star" /> LEADERBOARD<img src={star} width={79} height={80} alt="star" />{' '}
                      LEADERBOARD{' '}
                      <img src={star} width={79} height={80} alt="star" /> LEADERBOARD<img src={star} width={79} height={80} alt="star" />{' '}
                      LEADERBOARD{' '}
                      <img src={star} width={79} height={80} alt="star" /> LEADERBOARD <img src={star} width={79} height={80} alt="star" />{' '}
                      LEADERBOARD{' '}
                      <img src={star} width={79} height={80} alt="star" /> LEADERBOARD <img src={star} width={79} height={80} alt="star" />{' '}
                      LEADERBOARD{' '}
                      <img src={star} width={79} height={80} alt="star" /> LEADERBOARD <img src={star} width={79} height={80} alt="star" />{' '}
                      LEADERBOARD{' '}
                      <img src={star} width={79} height={80} alt="star" />{' '}
                    </div>
                    <div className="marquee-row">
                    LEADERBOARD{' '}
                      <img src={star} width={79} height={80} alt="star" /> LEADERBOARD<img src={star} width={79} height={80} alt="star" />{' '}
                      LEADERBOARD{' '}
                      <img src={star} width={79} height={80} alt="star" /> LEADERBOARD <img src={star} width={79} height={80} alt="star" />{' '}
                      LEADERBOARD{' '}
                      <img src={star} width={79} height={80} alt="star" /> LEADERBOARD<img src={star} width={79} height={80} alt="star" />{' '}
                      LEADERBOARD{' '}
                      <img src={star} width={79} height={80} alt="star" /> LEADERBOARD <img src={star} width={79} height={80} alt="star" />{' '}
                      LEADERBOARD{' '}
                      <img src={star} width={79} height={80} alt="star" /> LEADERBOARD<img src={star} width={79} height={80} alt="star" />{' '}
                      LEADERBOARD{' '}
                      <img src={star} width={79} height={80} alt="star" />{' '}
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="searchBox">
                    <h4>Search Leaderboard</h4>
                    <Form className="d-flex position-relative align-items-center">
                       <Form.Control
                            type="search"
                            placeholder="Playername#Tagline"
                            className="me-2 searchBar"
                            aria-label="Search"
                        />
                        <Button className="searchIcon" ><i className="fa fa-search" aria-hidden="true"></i></Button>
                    </Form>
                </div>
                <Table responsive="md">
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Points</th>
                        <th>ID</th>
                        <th>In game cash</th>
                        <th>Collectibles</th> 
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>1172</td>
                        <td>VASU D’Baller</td>
                        <td>$ 10,000</td>
                        <td>1</td> 
                    </tr>
                    <tr className="active">
                        <td>2</td>
                        <td>1172</td>
                        <td>SAM Deph</td>
                        <td>$ 10,000</td>
                        <td>5</td> 
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>1172</td>
                        <td>SAM Deph</td>
                        <td>$ 10,000</td>
                        <td>7</td> 
                    </tr>
                    </tbody>
                </Table>

            </div>
            </div>
        </div>
         
    </div>
    </>
)



    
}

export default PotPage;