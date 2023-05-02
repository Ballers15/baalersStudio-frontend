import React, { useEffect, useState } from "react";
import './poolpots.css' 
import $ from 'jquery'; 
import 'react-multi-carousel/lib/styles.css'; 
import { useLocation, useNavigate, useParams } from "react-router-dom"; 
import LotteryRounds from "./lotteryRounds";
import RewardRounds from "./rewardRounds";
import LeaderBoardReward from "./rewardLeaderBoard";
import LeaderBoardLottery from "./lotteryLeaderBoard";
import rewardPot from '../../Assest/img/rewardPot.png'
import lotteryPot from '../../Assest/img/slide3.webp'
import LeaderBoardRibbon from "./leaderboardRibbon.jsx";
import 'react-toastify/dist/ReactToastify.css';
import ApiLoader from "../../Components/apiLoader";
import { useSelector } from "react-redux";
import ActiveLotteryPot from "./activeLotteryPot";
import ActiveRewardPot from "./activeRewardPot";



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
        
         $('.close-btn').on('click', function(){   
            $('.video-popup').fadeOut('slow');    
            $('iframe').attr('src', $('iframe').attr('src'));
        });
        
      });

    const isLoading = useSelector(state => state.loading.isLoading)
    const [potType, setPotType] = useState('')
    const [expiryTime, setExpiryTime] = useState("");
    const { type } = useParams();
    const navigate = useNavigate()
    const location = useLocation()
    const [previous, setPrevious] = useState(false);    
    const [reload, setReload] = useState(false);
    const [lotteryCurrentRoundDetails, setLotteryCurrentRoundDetails] = useState({})
    const [lotteryPrevRoundsLength, setLotteryPrevRoundsLength] = useState(0)
    const [lotteryRoundIndex, setLotteryRoundIndex] = useState(null)
    const [rewardCurrentRoundDetails, setRewardCurrentRoundDetails] = useState({})
    const [rewardPrevRoundsLength, setRewardPrevRoundsLength] = useState(0)
    const [rewardRoundIndex, setRewardRoundIndex] = useState(null)

    const [countdownTime, setCountdownTime]= useState(
       {
           countdownDays:'',
           countdownHours:'',
           countdownMinutes:'',
           countdownSeconds:''
       }
   );

    const countdownTimer=()=>{

        if(expiryTime!==''){
         const timeInterval = setInterval(() => {
         const countdownDateTime = new Date(expiryTime).getTime(); 
         const currentTime = new Date().getTime();
          const  remainingDayTime = countdownDateTime - currentTime;
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
        //   console.log(runningCountdownTime,remainingDayTime);
          setCountdownTime(runningCountdownTime);
     
          if (remainingDayTime < 0 ) {
             clearInterval(timeInterval);
             setExpiryTime('');
            }
     
         }, 1000); }
        
    }
  
    useEffect(()=>{
    if(type === 'lottery'){
            setPotType('LOTTERYPOT')
        }
        else if (type==='reward') {
            setPotType('REWARDPOT')
        }
        else{
            navigate('/');
            setPotType('')
        }
    },[location.pathname])

    
    useEffect(() => {
        if(expiryTime!==''){
            countdownTimer();
        }
        else{
          setPrevious(true)
        }
    },[expiryTime]);





    
return(
    <>

    <div className="lotteryPool">
        <div className="text-center potsHead thirdSlide" style={{ backgroundImage: potType === 'REWARDPOT' ? `url(${rewardPot})` : `url(${lotteryPot})`}}>
        <p className="finishText backBtn"><i className="fa fa-arrow-left" aria-hidden="true" onClick={()=>{navigate(-1)}}></i> </p>
            <div className="sCaption text-center">          

                <div> 
                    {potType==='LOTTERYPOT' && <h1>LOTTERY POT </h1>}
                    {potType==='REWARDPOT' && <h1>REWARD POT </h1>}
                    <p className="textHeader">
                    Win rewards having real-world value, ranging from $BALR tokens, and NFTs, to tickets for physical parties around the world.
                    </p>
                    <div className="poolBtn text-center pt-4">
                        <div className="playBtn">
                            <a href='#active-pot'><span></span> REDEEM NOW</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="gradientBackgroung pb-8 pt-5 howItWork ht100 position-relative" >

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
                        <iframe className="video" src="https://www.youtube.com/embed/q_X9SWxjSss" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
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
        <div className="gradientBackgroung pb-8 activePots" id='active-pot'>

               {potType==='LOTTERYPOT' && <ActiveLotteryPot countdownTime={countdownTime} reload={reload} setReload={setReload} expiryTime={expiryTime} 
               setExpiryTime={setExpiryTime} setPrevious={setPrevious} setLotteryCurrentRoundDetails={setLotteryCurrentRoundDetails} 
               setLotteryRoundIndex={setLotteryRoundIndex}/>}

               {potType==='REWARDPOT' && <ActiveRewardPot countdownTime={countdownTime} reload={reload} setReload={setReload} expiryTime={expiryTime} 
               setExpiryTime={setExpiryTime} setPrevious={setPrevious} setRewardCurrentRoundDetails={setRewardCurrentRoundDetails} 
               setRewardRoundIndex={setRewardRoundIndex} />}

               {potType==='LOTTERYPOT' && <LotteryRounds previous={previous} lotteryCurrentRoundDetails={lotteryCurrentRoundDetails} 
               setLotteryCurrentRoundDetails={setLotteryCurrentRoundDetails} lotteryPrevRoundsLength={lotteryPrevRoundsLength} 
               setLotteryPrevRoundsLength={setLotteryPrevRoundsLength} lotteryRoundIndex={lotteryRoundIndex} setLotteryRoundIndex={setLotteryRoundIndex} />}

               {potType==='REWARDPOT' && <RewardRounds previous={previous} rewardCurrentRoundDetails={rewardCurrentRoundDetails} 
               setRewardCurrentRoundDetails={setRewardCurrentRoundDetails} rewardPrevRoundsLength={rewardPrevRoundsLength} 
               setRewardPrevRoundsLength={setRewardPrevRoundsLength} rewardRoundIndex={rewardRoundIndex} setRewardRoundIndex={setRewardRoundIndex} />}

       <div className="container" id='leaderboard'>
                <LeaderBoardRibbon/>
                {potType==='LOTTERYPOT' && <LeaderBoardLottery reload={reload} lotteryCurrentRoundDetails={lotteryCurrentRoundDetails} 
                setLotteryCurrentRoundDetails={setLotteryCurrentRoundDetails} lotteryPrevRoundsLength={lotteryPrevRoundsLength} 
                setLotteryPrevRoundsLength={setLotteryPrevRoundsLength} lotteryRoundIndex={lotteryRoundIndex} setLotteryRoundIndex={setLotteryRoundIndex} />}

               {potType==='REWARDPOT' && <LeaderBoardReward reload={reload} rewardCurrentRoundDetails={rewardCurrentRoundDetails} 
               setRewardCurrentRoundDetails={setRewardCurrentRoundDetails} rewardPrevRoundsLength={rewardPrevRoundsLength} 
               setRewardPrevRoundsLength={setRewardPrevRoundsLength} rewardRoundIndex={rewardRoundIndex} setRewardRoundIndex={setRewardRoundIndex} />}
        </div>

            {/* <div className="container"> 
                <div className="row">
                    <div className="col-sm-6">
                    <input className="searchTab"
                        type="search"
                        placeholder="Search by name"  />
                    </div>
                    <div className="col-sm-6">
                        <div className="d-flex justify-content-end">
                        <div className="borderPink angleIcon"><i class="fa fa-angle-left" aria-hidden="true"></i></div>
                        <div className="borderPink">#59</div>
                        <div className="borderPink angleIcon"><i class="fa fa-angle-right" aria-hidden="true"></i></div>
                        <div className="borderPink angleIcon"><i class="fa fa-angle-double-right" aria-hidden="true"></i></div>
                        </div>
                    </div>
                </div>
            </div> */}

        </div>
        {isLoading ? <ApiLoader /> : null} 
    </div>
    </>
)
    }

export default PotPage;