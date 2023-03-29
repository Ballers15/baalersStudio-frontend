import React, { useEffect, useState } from "react";
import './poolpots.css' 
import rewardBox from '../../Assest/img/rewardBox.png'
import rewardBoxOpen from '../../Assest/img/rewardBox4.png'
import star from '../../Assest/img/Star.svg' 
import {Table, Button, Form, Modal} from 'react-bootstrap';
import $ from 'jquery'; 
import { getActivePot, getGameCash, redeemCashLottery, redeemCashReward } from "../../Services/User/indexPot";
import Loader from "../../Components/Loader";
import Toaster from "../../Components/Toaster"; 
import 'react-multi-carousel/lib/styles.css'; 
import { useLocation, useNavigate, useParams } from "react-router-dom"; 
import LotteryRounds from "./lotteryRounds";
import RewardRounds from "./rewardRounds";
import LeaderBoardReward from "./rewardLeaderBoard";
import LeaderBoardLottery from "./lotteryLeaderBoard";
   
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


    
    const [potType, setPotType] = useState('')
    const [expiryTime, setExpiryTime] = useState("");
    const [potDetails,setPotDetails] = useState('')
    const [leaderBoardLotteryDetails,setLeaderBoardLotteryDetails] = useState('')
    const [toasterMessage, setToasterMessage] = useState("");
    const [toaster, showToaster] = useState(false);
    const [toasterColor, setToasterColor] = useState('primary')
    const setShowToaster = (param) => showToaster(param);
    const [loading, setLoading] = useState(false);   
    const [leaderSearch,setLeaderSearch]  = useState('')
    const [cash, setCash] = useState('')
    const user = localStorage.getItem('_u')
    const walletAddress = localStorage.getItem('_wallet')
    const { type } = useParams();
    const navigate = useNavigate()
    const location = useLocation()
    const [previous, setPrevious] = useState(false);
    const [reload, setReload] = useState(false);



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
        else{
            setPotType('REWARDPOT')
        }
        
    },[location.pathname])

    useEffect(()=>{
        if(potType!==''){
        getActivePotDetails();
        }
    },[potType])

    useEffect(() => {
        if(expiryTime!==''){
            countdownTimer();
        }
        else{
          setPrevious(true)
        }
    },[expiryTime]);


    const getActivePotDetails = async () => {
        let dataToSend = {
            potType: potType,
        }
        setLoading(true);
        try {
          const pot = await getActivePot(dataToSend);
          setLoading(false);
          if (pot.error) {
            setToasterMessage(pot?.message||'Something Went Worng');
            setShowToaster(true);
            setToasterColor('danger')
        } else {
            // setToasterMessage('Claim Status Updated Succesfully');
            // setShowToaster(true); 
            // setToasterColor('success')
            setPotDetails(pot?.data.length?pot.data[0]:'');
            setExpiryTime(pot?.data.length?pot.data[0]?.endDate:'');
            // console.log(pot?.data.length?pot.data[0]?.endDate:'');
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setToasterColor('danger')
            setLoading(false);
        }
         
    }

      const addCashLottery = async () => {
        let dataToSend = 
            {
                walletAddress: localStorage.getItem('_wallet'),
                amount:cash,
                potId: potDetails?._id
            }
        setLoading(true);
        try {
          const redeem = await redeemCashLottery(dataToSend);
          setLoading(false);
          if (redeem.error) {
            setToasterMessage(redeem?.message||'Something Went Worng');
            setShowToaster(true);
            setToasterColor('danger')
        } else {
            setToasterMessage(` Kudos !! Your $ ${cash} amount of in game cash deposited Successfully See Leaderboard !!` );
            setShowToaster(true); 
            setToasterColor('success')
            setRedeemModal(false)
            setReload(true)
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setToasterColor('danger')
            setLoading(false);
        }
         
    }

    const addCashReward = async () => {
        let dataToSend = 
            {
                walletAddress: localStorage.getItem('_wallet'),
                amount:cash,
                potId: potDetails?._id
            }
        setLoading(true);
        try {
          const redeem = await redeemCashReward(dataToSend);
          setLoading(false);
          if (redeem.error) {
            setToasterMessage(redeem?.message||'Something Went Worng');
            setShowToaster(true);
            setToasterColor('danger')
            setRedeemModal(false)
            
          } else {
            setToasterMessage(`Kudos !! Your $ ${cash} amount of in game cash deposited Successfully See Leaderboard !!`);
            setShowToaster(true); 
            setToasterColor('success')
            setRedeemModal(false)
            setReload(true)
        }
        } catch (error) {
            setRedeemModal(false);
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setToasterColor('danger')
            setLoading(false);
        }
         
    }

    const fetchGameCash = async () => {
        let dataToSend = 
            {
                walletAddress: localStorage.getItem('_wallet'),
            }
        setLoading(true);
        try {
          const cash = await getGameCash(dataToSend);
          setLoading(false);
          if (cash.error) {
            setToasterMessage(cash?.message||'Something Went Worng');
            setShowToaster(true);
            setToasterColor('danger')
        } else {
            setToasterMessage('cash fetched Successfully');
            setShowToaster(true); 
            setToasterColor('success')
            setCash(cash?.data?.amount)
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setToasterColor('danger')
            setLoading(false);
       }
        
    }

    
    const handleRedeem = () => {
        if(potType === 'LOTTERYPOT')
            addCashLottery()
        else if  (potType === 'REWARDPOT')
            addCashReward()
        else
            return
      }

    const handleSearchUser = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.preventDefault();
    }

    const [redeemModal,setRedeemModal] = useState(false)
    const handleCloseModal = () => setRedeemModal(false)

    const handleRedeemModal = async() => {
        if(!user ){
            navigate('/login')
        }
        else if(user &&  !walletAddress){
            setToasterMessage('Please connect your metamask wallet');
            setShowToaster(true);
            setToasterColor('primary')
            return
        }
       else{
        await fetchGameCash()
        setRedeemModal(true)}
    }

return(
    <>
       <Modal
            show={redeemModal} 
            onHide={handleCloseModal} 
            size="lg"        
            className='viewWallet'
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
               Confirm Your Action
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <span>
            <div className='confirm-modal'>
              Are you sure to add your game cash $ {cash} ?
              <br></br>
              <button type='primary' onClick={()=>handleRedeem()}>Yes</button>
              <button type='primary' onClick={()=>handleCloseModal()}>No</button>
              </div>
            </span>
            </Modal.Body>
          </Modal>



    <div className="lotteryPool">
        <div className="text-center potsHead thirdSlide">
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
            {/* <LazyLoadImage
                src={Ellipse5}
                className="bgShade2"
                width="1003"
                height="1788"
                alt="Eclipse"
              /> */}
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
            <div className="ht100 pt8">
                <div className="container">
                    <div className="positionRelative mb-5 headWth mx-auto">
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
                                    {expiryTime!=='' ?
                                        <>
                                        <span className="countFont">{countdownTime.countdownDays} <sub>D</sub></span>
                                        <span className="countFont pe-2">:</span>
                                        <span className="countFont">{countdownTime.countdownHours} <sub>H</sub></span>
                                        <span className="countFont pe-2">:</span>
                                        <span className="countFont">{countdownTime.countdownMinutes} <sub>M</sub></span>
                                        <span className="countFont pe-2">:</span>
                                        <span className="countFont">{countdownTime.countdownSeconds} <sub>S</sub></span>
                                        </>
                                        :<p>Deal has been Expired</p>}
                                </div>

                                <p className="undColor">Until next draw</p>
                        
                                <h4 className="font6 pt-2">Redeem In Game Cash</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi morbi sit consectetur elit.</p>
                                <div className="poolBtn pt-2">
                                    <div className="playBtn">
                                    {expiryTime!=='' ? ( <a onClick={handleRedeemModal}><span></span> REDEEM NOW</a>) :
                                        (<a className="disabled"><span></span> REDEEM NOW</a>)}
                                    </div>
                                </div>                        
                            </div>
                        </div>
                        <div className="col-sm-7 text-center">
                            <img src={expiryTime!=='' ? rewardBox : rewardBoxOpen} alt="rewardBox" className="rewardBox" id="rewardBoxOpen" />                        
                        </div>
                    </div>
                </div>
             </div>
               {potType==='LOTTERYPOT' && <LotteryRounds previous={previous}/>}
               {potType==='REWARDPOT' && <RewardRounds previous={previous}/>}
                

            <div className="container">
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

                {potType==='LOTTERYPOT' && <LeaderBoardLottery reload={reload}/>}
                {potType==='REWARDPOT' && <LeaderBoardReward reload={reload}/>}           
               
            </div>
        </div>
        {loading ? <Loader /> : null} {toaster && ( <Toaster message={toasterMessage} show={toaster} close={() => showToaster(false)} bg={toasterColor} /> )}
    </div>
    </>
)



    
}

export default PotPage;