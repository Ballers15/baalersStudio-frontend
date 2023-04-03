import React, { useEffect, useState } from "react";
import './poolpots.css' 
import img1 from '../../Assest/img/img1.png' 
import { getPrevRounds, lotteryClaim, wonLottery } from "../../Services/User/indexPot";
import 'react-multi-carousel/lib/styles.css';
import {  useParams } from "react-router-dom";
import { claimNft, withdrawlMsg } from "../../Components/Smart Contract/smartContractHandler";
import Slider from "react-slick";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const LotteryRounds = (props) => {

    const user = localStorage.getItem('_u')
    const walletAddress = localStorage.getItem('_wallet')
    const { type } = useParams();
    const [potType, setPotType] = useState('')
    // const setShowToaster = (param) => showToaster(param);
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
        ><p className="finishText" ><i className="fa fa-arrow-left" aria-hidden="true"></i><span className="desk">Finished Rounds</span> </p></div>
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
            toast.error(round?.message||'Something Went Worng in preious rounds');
          } else {
            setPrevRounds(round?.data)
            setClaimExpiryDate(round?.data[currentSlide]?.claimExpiryDate)
            setUserWon(round?.data[0]?.userRes?.lotteryWon)
            setParticipated(round?.data[0]?.userRes?.participated)
            setClaimedNft(round?.data[0]?.userRes?.claimed)
            setPotId(round?.data[0]?._id)
          }
        } catch (error) {
            toast.error(error ||'Something Went Worng in preious rounds');
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
            toast.error(data?.message||'Something Went Worng in lottery won');
            // setShowToaster(true);
          } else {
            setUserWon(data?.data?.lotteryWon)
            setParticipated(data?.data?.participated)
            setClaimedNft(data?.data?.claimed)
            setButtonStatus(true)
          }
        } catch (error) {
            toast.error(error?.response?.data?.message||'Something Went Worng');
            // setShowToaster(true);
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
            toast.error(data?.message||'Something Went Worng');
            // setShowToaster(true);
          } else {
            toast.success('Round fetched Successfully');
            // setShowToaster(true); 
            claimTransaction(data?.data)
          }
        } catch (error) {
            toast.error(error?.response?.data?.message||'Something Went Worng');
            // setShowToaster(true);
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
            withdrawlId: data?.transactionDetails?._id
        }
        setLoading(true);
        try {
          console.log("datatosend",dataToSend);
          const dataNft = await claimNft(dataToSend);

          setLoading(false);
          if (dataNft.error) {
            toast.error(dataNft?.message||'Something Went Worng');
            // setShowToaster(true);
          } else {
            toast.success('Round fetched Successfully');
            // setShowToaster(true); 
            console.log('claim lottery response',dataNft)
          }
        } catch (error) {
            toast.error(error?.response?.data?.message||'Something Went Worng');
            // setShowToaster(true);
            setLoading(false);
        }
    }


return(
             <>
                <div className="finishSlider">
                    <div className="row">
                        <div className="col-sm-12 position-relative">

                        {prevRounds?.length ? (<Slider {...settings} afterChange={handleSlideChange}> 
                          
                           {prevRounds?.length && prevRounds?.map((round,index)=>(
                            <div key={index+1} id={index}>
                                <div className="d-md-flex">
                                    <img className="wthMob" src={img1} alt="" />
                                    <div className="roundDiv">
                                        <h3>Round {index+1} </h3>
                                        <p><span>Drawn {new Date(round?.endDate).toLocaleString('en-US', {
                                          month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, })}</span></p>
                                        <p className="winHead">Winners <span></span> </p> 
                                        <div className="row justify-content-center">
                                            <div className="col-4 col-sm-4 text-center">
                                            <img src={img1} alt="" />
                                            <p className="address mb-0">{round?.potUserDetails?.walletAddress?.slice(0,4)+'...'+round?.potUserDetails?.walletAddress.slice(-4)+'@'+round?.userDetails?.userName} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                            </div>)
                           )}                            
                            </Slider>) : <span className='no data'></span>}

                          
                           
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
                    </div>) :  <span className='no data'></span>}           
                </div>               
    </>

    
)
}

export default LotteryRounds;