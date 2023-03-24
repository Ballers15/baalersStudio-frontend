import React, { useEffect, useState } from "react";
import './poolpots.css' 
import rewardBox from '../../Assest/img/rewardBox.png'
import rewardBoxOpen from '../../Assest/img/rewardBox4.png'
import star from '../../Assest/img/Star.svg'
import img1 from '../../Assest/img/img1.png' 
import youtubePopup from '../../Assest/img/youtubePopup.PNG'
import {Table, Button, Form, Modal} from 'react-bootstrap';
import $ from 'jquery'; 
import { getActivePot, getGameCash, getPrevRounds, leaderBoardLottery, lotteryClaim, lotteryWithdrawl, redeemCashLottery, redeemCashReward, wonLottery } from "../../Services/User/indexPot";
import Loader from "../../Components/Loader";
import Toaster from "../../Components/Toaster";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { claimLottery, withdrawl } from "../../Components/Smart Contract/smartContractHandler";


const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
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
  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return (
        <div className="carousel-button-group mb-4 gap-4 w-full">
          <button className='prevCarousel block p-3 bg-slate-300' onClick={() => 
          previous()}>   <p className="finishText"><i class="fa fa-arrow-left" aria-hidden="true"></i> Finished Rounds</p> </button>
          <button className="nextCarousel" onClick={() => next()}><span className='block p-3 bg-slate-300' > 
          <img src={img1} alt="" />
            </span>
          </button>
       </div>
    
     );
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
    const [potType, setPotType] = useState('')
   const [expiryTime, setExpiryTime] = useState("");
   const [potDetails,setPotDetails] = useState('')
   const [leaderBoardLotteryDetails,setLeaderBoardLotteryDetails] = useState('')
   const [toasterMessage, setToasterMessage] = useState("");
   const [toaster, showToaster] = useState(false);
   const setShowToaster = (param) => showToaster(param);
   const [loading, setLoading] = useState(false);   
   const [leaderSearch,setLeaderSearch]  = useState('')
   const [claimExpiryDate, setClaimExpiryDate] = useState('')
   const [cash, setCash] = useState('')
   const [prevRounds, setPrevRounds] = useState('')
   const user = localStorage.getItem('_u')
   const walletAddress = localStorage.getItem('_wallet')
   const { type } = useParams();
   const navigate = useNavigate()
   const [userWon, setUserWon] = useState(false)
   const [participated, setParticipated] = useState(false)
   const [currentSlide,setCurrentSlide] = useState(0)
   const [potId,setPotId] = useState('')
   const [claimedNft,setClaimedNft] = useState('')
   const [intervalId, setIntervalId] = useState(null);
   const [currentPot,setCurrentPot]=useState('');
   const location = useLocation()


   const handleSlideChange = (current) => {
    // console.log("current",current);
    // current=current-1;
       const index = current % prevRounds.length;
       setCurrentSlide(index)
    //    setUserWon(false)
            setClaimExpiryDate(prevRounds[index]?.claimExpiryDate)
    
    //    console.log(prevRounds[index])
        if(user !== null && walletAddress !== null) {
            // console.log(prevRounds[index]);
            lotteryWon(prevRounds[index]._id)
        }
     };

   const [countdownTime, setCountdownTime]= useState(
       {
           countdownDays:'',
           countdownHours:'',
           countdownMinutes:'',
           countdownSeconds:''
       }
   );

   const [claimCountdownTime, setClaimCountdownTime]= useState(
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


    const claimCountdownTimer=()=>{
        // console.log("claimExpiryDate::claimCountdownTimer",claimExpiryDate);
        const countTime=claimExpiryDate;
        // console.log("countTimeCOnst",countTime);
        if(claimExpiryDate!==''){
            const id = setInterval(() => {
        //  console.log("countTime",claimExpiryDate);
         const countdownDateTime = new Date(countTime).getTime(); 
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
        //   console.log("claimExpiryDate",runningCountdownTime);
          setClaimCountdownTime(runningCountdownTime);
     
          if (remainingDayTime < 0 ) {
            clearInterval(id);
            setIntervalId(null);    
            //  console.log('i am set here claimCountdownTimer')
            //  setClaimExpiryDate('');     
            }
     
         }, 1000); 
        //  console.log("hi i am id of setinterval",id);
         setIntervalId(id);

        }
        
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
        getPreviousRounds();
        getLotteryLeaderBoard();
        }
    },[potType])

    useEffect(() => {
        if(expiryTime!==''){
            countdownTimer();
        }
    },[expiryTime]);

    useEffect(() => {
        if(claimExpiryDate!==''){
            // console.log("calling again in useeffecttt======");
            // console.log("in use effect intervalId",intervalId)
            clearInterval(intervalId);
            setIntervalId(null);
            claimCountdownTimer();
    
        }
    },[claimExpiryDate]);

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
          } else {
            // setToasterMessage('Claim Status Updated Succesfully');
            // setShowToaster(true); 
            setPotDetails(pot?.data.length?pot.data[0]:'');
            setExpiryTime(pot?.data.length?pot.data[0]?.endDate:'');
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
        }
    }

    const getLotteryLeaderBoard = async (data) => {
        let dataToSend = {
            search: data,
        }
        setLoading(true);
        try {
          const leader = await leaderBoardLottery(dataToSend);
          setLoading(false);
          if (leader.error) {
            setToasterMessage(leader?.message||'Something Went Worng');
            setShowToaster(true);
          } else {
            // setToasterMessage('Claim Status Updated Succesfully');
            // setShowToaster(true); 
            setLeaderBoardLotteryDetails(leader?.data)
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
        }
    }

    const formatNumberDecimal = (value) => {
        if(value > Math.pow(10,10)){
        const shortenedValue = parseFloat(value).toExponential(4);
        return shortenedValue;
        }
        else
        return value;
      };

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
          } else {
            setToasterMessage(` Kudos !! Your $ ${cash} amount of in game cash deposited Successfully See Leaderboard !!` );
            setShowToaster(true); 
            setRedeemModal(false)
            getLotteryLeaderBoard()
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
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
            setRedeemModal(false)
            
          } else {
            setToasterMessage(`Kudos !! Your $ ${cash} amount of in game cash deposited Successfully See Leaderboard !!`);
            setShowToaster(true); 
            setRedeemModal(false)
            getLotteryLeaderBoard()
          }
        } catch (error) {
            setRedeemModal(false);
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
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
          } else {
            setToasterMessage('cash fetched Successfully');
            setShowToaster(true); 
            setCash(cash?.data?.amount)
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
       }
    }

    const getPreviousRounds = async () => {
     
        setLoading(true);
        try {
          const round = await getPrevRounds();
          setLoading(false);
          if (round.error) {
            setToasterMessage(round?.message||'Something Went Worng');
            setShowToaster(true);
          } else {
            // setToasterMessage('round fetched Successfully');
            // setShowToaster(true); 
            setPrevRounds(round?.data)
            // console.log('i am set here getPreviousRounds ');
            setClaimExpiryDate(round?.data[currentSlide]?.claimExpiryDate)
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
        }
    }

    const lotteryWon = async (id) => {
        // console.log(id)
        setPotId(id)
        let dataToSend = {
            walletAddress: localStorage.getItem('_wallet'),
            potId: id
        }
        setLoading(true);
        try {
          const data = await wonLottery(dataToSend);
          setLoading(false);
          if (data.error) {
            setToasterMessage(data?.message||'Something Went Worng');
            setShowToaster(true);
          } else {
            // setToasterMessage('round fetched Successfully');
            // setShowToaster(true); 
            setUserWon(data?.data?.lotteryWon)
            setParticipated(data?.data?.participated)
            setClaimedNft(data?.data?.claimed)
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
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
        getLotteryLeaderBoard();
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
            return;
        }
       await fetchGameCash()
        setRedeemModal(true)
    }

    const handleClaim = async () => {
        let dataToSend = {
            walletAddress: localStorage.getItem('_wallet'),
            potId: potId
        }
        setLoading(true);
        try {
          const data = await lotteryClaim(dataToSend);
          setLoading(false);
          if (data.error) {
            setToasterMessage(data?.message||'Something Went Worng');
            setShowToaster(true);
          } else {
            setToasterMessage('round fetched Successfully');
            setShowToaster(true); 
            claimTransaction(data?.data)
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
        }
    }

    const claimTransaction = async (data) => {
        let dataToSend = {
            tokenId:data?.potDetails?.assetDetails?.ticker,
            quantity:data?.potDetails?.rewardTokenAmount,
            nonce:data?.transactionDetails?.nonce,
            signature:data?.transactionDetails.signature
        }
        setLoading(true);
        try {
          const dataNft = await claimLottery(dataToSend);
          setLoading(false);
          if (dataNft.error) {
            setToasterMessage(dataNft?.message||'Something Went Worng');
            setShowToaster(true);
          } else {
            setToasterMessage('round fetched Successfully');
            setShowToaster(true); 
            // console.log('claim lottery',dataNft)
            // console.log('====================')
            // console.log(data?.potDetails?._id)
            // console.log(localStorage.getItem('_wallet'))
            // console.log(dataNft?.transactionHash)
            // console.log(data?.transactionDetails?._id)
            // console.log('---------------')
            let withdrawlObject = {
                potId: data?.potDetails?._id,   
                walletAddress: localStorage.getItem('_wallet'),
                txnHash:dataNft?.transactionHash ,
                withdrawlId: data?.transactionDetails?._id
            }
            
            console.log('claim nft',withdrawlObject)

            withdrawLottery(withdrawlObject)
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
        }
    }


    const withdrawLottery = async (dataToSend) => {
        console.log('withdrawlottery', dataToSend)
      
        setLoading(true);
        try {
          const data = await lotteryWithdrawl(dataToSend);
          setLoading(false);
          if (data.error) {
            setToasterMessage(data?.message||'Something Went Worng in withdrawl');
            setShowToaster(true);
          } else {
            setToasterMessage('lotery details');
            setShowToaster(true); 
            console.log('after withdraw',data)
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng in withdrawl2');
            setShowToaster(true);
            setLoading(false);
        }
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
                <div className="finishSlider">
                    <div className="row">
                        {/* <div className="col-sm-5 my-auto">
                            <p className="finishText"><i class="fa fa-arrow-left" aria-hidden="true"></i> Finished Rounds</p>
                        </div> */}
                        <div className="col-sm-12 position-relative">

                        {prevRounds?.length ? (<Carousel responsive={responsive} infinite={true} autoPlay= {false} autoPlaySpeed={10000} 
                         keyBoardControl={true} autoplayHoverPause={false} arrows={false} renderButtonGroupOutside={true} customButtonGroup={<ButtonGroup />}  beforeChange={(e) => handleSlideChange(e)}>
                          
                           {prevRounds?.length && prevRounds?.map((round,index)=>(
                            <div key={index+1} id={index}>
                                <div className="d-flex">
                                    <img className="wthMob" src={img1} alt="" />
                                    <div className="roundDiv">
                                        <h3>Round {index+1} </h3>
                                        <p><span>Drawn {new Date(round?.endDate).toLocaleString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, })}</span></p>
                                        <p className="winHead">Winners <span></span> </p> 
                                        <div className="row">
                                            <div className="col-sm-12 text-center">
                                            <img src={img1} alt="" />
                                            <p className="address mb-0">{round?.potUserDetails?.walletAddress?.slice(0,4)+'...'+round?.potUserDetails?.walletAddress.slice(-4)+'@'+round?.userDetails?.name} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                            </div>)
                           )}                            
                            </Carousel>) : <span class='no data'></span>}
                           
                        </div>
                    </div>        
                  {prevRounds?.length ?  (<div className="poolBtn text-center pt-4 finishBtn">
                        <div className="playBtn">
                        {userWon === true && claimExpiryDate !== '' && claimedNft !==true && (<a onClick={()=>{handleClaim()}}><span></span> CLAIM NOW</a>)}
                        {userWon === true && claimExpiryDate !== '' && claimedNft === true && (<a className="disabled"><span></span>Already CLAIMED</a>)}
                        {userWon === true && claimExpiryDate === '' && ( <a className="disabled" ><span></span> CLAIM NOW</a>) }
                        {userWon === false && participated === true && (<a className="disabled"><span></span> You have not won !</a>) }
                        {userWon === false && participated === false && (<a className="disabled"><span></span> You have not participated !</a>) }
                        
                        </div>    
                        <div className="expDate">
                            {userWon ===true && claimExpiryDate!=='' && claimedNft!== true &&
                                <><p className="mb-0">Expires in </p>
                                <div className="claimExpire ps-2">
                                <span className="countFont">{claimCountdownTime.countdownHours} <sub>H </sub></span>
                                <span className="countFont">{claimCountdownTime.countdownMinutes} <sub>M </sub></span>
                                <span className="countFont">{claimCountdownTime.countdownSeconds} <sub>S</sub></span>
                                </div>
                            </>
                                }
                        </div>                                
                    </div>) :  <span class='no data'></span>}          
                </div>
                

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

              <div className="">
                <div className="searchBox">
                    <h4>Search Leaderboard</h4>
                    <Form className="d-flex position-relative align-items-center" onSubmit={handleSearchUser} onReset={()=>{ getLotteryLeaderBoard();}}>
                       <Form.Control
                            type="search"
                            placeholder="Playername#Tagline"
                            className="me-2 searchBar"
                            aria-label="Search"
                            onChange={(e)=>{getLotteryLeaderBoard(e.target.value)}}
                        />
                        <Button className="searchIcon" type='submit' ><i className="fa fa-search" aria-hidden="true"></i></Button>
                        {/* <Button className="resetIcon" type = 'reset' ><i className="fa fa-times" aria-hidden="true"></i></Button> */}
                    </Form>
                </div>
                {leaderBoardLotteryDetails?.length !== 0 ? (<Table responsive>
                    <thead>
                    <tr>
                        <th>Rank</th>
                        {/* <th>Points</th> */}
                        <th>ID</th>
                        <th>In game cash</th>
                        <th>Wallet Address</th> 
                    </tr>
                    </thead>
                    <tbody>
                        {/* wallet?.slice(0,5)+'....'+wallet?.slice(-5) */
                        
                        }
                { (leaderBoardLotteryDetails?.map((User,index)=>{
                    return (
                    <tr key={User._id} >
                        <td>{index+1}</td>
                        <td>{User?.userId?.name}</td>
                        <td>$ {formatNumberDecimal(User?.amount?.$numberDecimal)}</td>
                        <td>{User?.walletAddress?.slice(0,5)+'..'+User?.walletAddress?.slice(-5)}</td> 
                    </tr>)
                })) }
                    
                    {/* <tr className="active">
                        <td>2</td>
                        <td>SAM Deph</td>
                        <td>$ 10,000</td>
                        <td>5</td> 
                    </tr>
                     */}
                </tbody>
                </Table> ) : (<span >No Data !</span>)}

            </div>
            </div>
        </div>
        {loading ? <Loader /> : null} {toaster && ( <Toaster message={toasterMessage} show={toaster} close={() => showToaster(false)} /> )}
    </div>
    </>
)



    
}

export default PotPage;