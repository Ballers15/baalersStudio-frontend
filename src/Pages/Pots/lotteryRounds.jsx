import React, { useEffect, useState } from "react";
import './poolpots.css' 
import img1 from '../../Assest/img/img1.png' 
import { getPrevRounds, lotteryClaim, lotteryWithdrawl, wonLottery } from "../../Services/User/indexPot";
import Loader from "../../Components/Loader";
import Toaster from "../../Components/Toaster";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {  useParams } from "react-router-dom";
import { claimLottery } from "../../Components/Smart Contract/smartContractHandler";
import Slider from "react-slick";


function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ><p className="finishText"><i class="fa fa-arrow-left" aria-hidden="true"></i> Finished Rounds</p></div>
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
  prevArrow: <SamplePrevArrow />
};


const LotteryRounds = () => {

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

   const handleSlideChange = (current) => {
    console.log("current",current);
       const index = current % prevRounds.length;
       setCurrentSlide(index)
        setClaimExpiryDate(prevRounds[currentSlide]?.claimExpiryDate)
    
        if(user !== null && walletAddress !== null) {
            console.log(prevRounds[currentSlide]);
            lotteryWon(prevRounds[currentSlide]._id)
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
             console.log('i am set here claimCountdownTimer')
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
            // console.log("calling again in useeffecttt======");
            // console.log("in use effect intervalId",intervalId)
            clearInterval(intervalId);
            setIntervalId(null);
            claimCountdownTimer();
    
        }
    },[claimExpiryDate]);

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
            console.log('i am set here getPreviousRounds ');
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
            console.log('claim lottery',dataNft)
            console.log('====================')
            console.log(data?.potDetails?._id)
            console.log(localStorage.getItem('_wallet'))
            console.log(dataNft?.transactionHash)
            console.log(data?.transactionDetails?._id)
            console.log('---------------')
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
            // getLotteryLeaderBoard();
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng in withdrawl2');
            setShowToaster(true);
            setLoading(false);
        }
    }

return(
    <>

                <div className="finishSlider">
                    <div className="row">
                        <div className="col-sm-12 position-relative">

                        {prevRounds?.length ? (<Slider {...settings}> 
                          
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