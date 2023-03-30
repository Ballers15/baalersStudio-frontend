import React, { useEffect, useState } from "react";
import './poolpots.css' 
import img1 from '../../Assest/img/img1.png' 
import { getPrevRounds, lotteryClaim, lotteryWithdrawl, wonLottery } from "../../Services/User/indexPot";
import 'react-multi-carousel/lib/styles.css';
import {  useParams } from "react-router-dom";
import { claimLottery, withdrawl } from "../../Components/Smart Contract/smartContractHandler";
import Slider from "react-slick";
import { withdrawLottery } from "./withdrawlLottery";





const LotteryRounds = (props) => {

    const user = localStorage.getItem('_u')
    const walletAddress = localStorage.getItem('_wallet')
    const { type } = useParams();
    const [potType, setPotType] = useState('')
    const [toasterMessage, setToasterMessage] = useState("");
    const [toaster, showToaster] = useState(false);
    const setShowToaster = (param) => showToaster(param);
    const [loading, setLoading] = useState(false);   
    const [claimExpiryDate, setClaimExpiryDate] = useState('')
    const [prevRounds, setPrevRounds] = useState('')
    const [userWon, setUserWon] = useState(false)
    const [participated, setParticipated] = useState(false)
    const [currentSlide,setCurrentSlide] = useState(0)
    const [potId,setPotId] = useState('')
    const [claimedNft,setClaimedNft] = useState('')
    const [intervalId, setIntervalId] = useState(null);
    const [buttonStatus, setButtonStatus] = useState(true)
    
    function SamplePrevArrow(props) {
      const { className, style, onClick , buttonStatus} = props;
      return (
        <div
          className={className}
          style={{ ...style, visibility: buttonStatus ? "visible" : "hidden" }}
          onClick={onClick}
        ><p className="finishText" ><i class="fa fa-arrow-left" aria-hidden="true"></i> Finished Rounds</p></div>
      );
    }
    var settings = {  
      className: "slider variable-width",
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      // centerMode: true,
      variableWidth: true, 
      nextArrow: <SamplePrevArrow buttonStatus={buttonStatus} />
    };

   const handleSlideChange = (current) => {
    // console.log("current",current);
      //  const index = current;
       setCurrentSlide(current)
        setClaimExpiryDate(prevRounds[current]?.claimExpiryDate)
    
        if(user !== null && walletAddress !== null) {
            // console.log(prevRounds[currentSlide]);
            lotteryWon(prevRounds[current]._id)
        }
     };


    const [claimCountdownTime, setClaimCountdownTime]= useState(
        {
            countdownDays:'',
            countdownHours:'',
            countdownMinutes:'',
            countdownSeconds:''
        }
    );
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
             setClaimExpiryDate('');
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
        
    },[])

    useEffect(()=>{
        if(potType!==''){
        getPreviousRounds();
        }
    },[potType])


    useEffect(() => {
        if(claimExpiryDate!==''){
            clearInterval(intervalId);
            setIntervalId(null);
            claimCountdownTimer();
        }
    },[claimExpiryDate]);

    useEffect(() => {
      getPreviousRounds()  
  },[ localStorage.getItem('_wallet'),props.previous]);

  const getPreviousRounds = async () => {
    let dataToSend = {
        walletAddress: localStorage.getItem('_wallet'),
    }
        setLoading(true);
        try {
          const round = await getPrevRounds(dataToSend);
          setLoading(false);
          if (round.error) {
            console.log('Something Went Worng in preious rounds',round.error)
            setToasterMessage(round?.message||'Something Went Worng in preious rounds');
            setShowToaster(true);
          } else {
// setToasterMessage('round fetched Successfully');
            // setShowToaster(true); 
            setPrevRounds(round?.data)
            // console.log('i am set here getPreviousRounds ');
            setClaimExpiryDate(round?.data[currentSlide]?.claimExpiryDate)
            // console.log('prev rounds',round?.data[0])
            setUserWon(round?.data[0]?.userRes?.lotteryWon)
            setParticipated(round?.data[0]?.userRes?.participated)
          }
        } catch (error) {
            setToasterMessage(error ||'Something Went Worng in preious rounds');
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
        setButtonStatus(false)
        try {
          const data = await wonLottery(dataToSend);
          setLoading(false);
          if (data.error) {
            setToasterMessage(data?.message||'Something Went Worng in lottery won');
            setShowToaster(true);
          } else {
            // setToasterMessage('round fetched Successfully');
            // setShowToaster(true); 
            setUserWon(data?.data?.lotteryWon)
            setParticipated(data?.data?.participated)
            setClaimedNft(data?.data?.claimed)
            setButtonStatus(true)
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
        }
    }


    const handleClaim = async () => {
        let dataToSend = {
            walletAddress: localStorage.getItem('_wallet'),
            potId: potId
        }
        console.log("")
        setLoading(true);
        try {
          const data = await lotteryClaim(dataToSend);
          console.log("data got isss hash",data);
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
            signature:data?.transactionDetails.signature,
            potId: data?.potDetails?._id,   
                walletAddress: localStorage.getItem('_wallet'),
                withdrawlId: data?.transactionDetails?._id
        }
        setLoading(true);
        try {
          console.log("datatosend",dataToSend);
          const dataNft = await claimLottery(dataToSend);

          setLoading(false);
          if (dataNft.error) {
            setToasterMessage(dataNft?.message||'Something Went Worng');
            setShowToaster(true);
          } else {
            setToasterMessage('round fetched Successfully');
            setShowToaster(true); 
            console.log('claim lottery response',dataNft)
            // console.log('====================')
            // console.log(data?.potDetails?._id)
            // console.log(localStorage.getItem('_wallet'))
            // console.log(dataNft?.transactionHash)
            // console.log(data?.transactionDetails?._id)
            // console.log('---------------')
            // let withdrawlObject = {
              // walletAddress: localStorage.getItem('_wallet'),
              // withdrawlId: data?.transactionDetails?._id
            //     txnHash:dataNft?.transactionHash ,
            //     withdrawlId: data?.transactionDetails?._id
            // }
            
            // console.log('claim nft dataTosend',withdrawlObject)

            // withdrawLottery(withdrawlObject)
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
        }
    }


    // const withdrawLottery = async (dataToSend) => {
    //     // console.log('withdrawlottery', dataToSend)
      
    //     setLoading(true);
    //     try {
    //       const data = await lotteryWithdrawl(dataToSend);
    //       setLoading(false);
    //       if (data.error) {
    //         setToasterMessage(data?.message||'Something Went Worng in withdrawl');
    //         setShowToaster(true);
    //       } else {
    //         setToasterMessage('lotery details');
    //         setShowToaster(true); 
    //         console.log('after withdraw response',data)
    //         // getLotteryLeaderBoard();
    //       }
    //     } catch (error) {
    //         setToasterMessage(error?.response?.data?.message||'Something Went Worng in withdrawl2');
    //         setShowToaster(true);
    //         setLoading(false);
    //     }
    // }

return(
      <>
                <div className="finishSlider">
                    <div className="row">
                        <div className="col-sm-12 position-relative">

                        {prevRounds?.length ? (<Slider {...settings} afterChange={handleSlideChange}> 
                          
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
                            </Slider>) : <span class='no data'></span>}

                          
                           
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
        
               
    </>

    
)
}

export default LotteryRounds;