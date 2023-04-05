import React, { useEffect, useState } from "react";
import './poolpots.css' 
import img1 from '../../Assest/img/img1.png' 
import { getPrevRounds, lotteryClaim, wonLottery } from "../../Services/User/indexPot";
import 'react-multi-carousel/lib/styles.css';
import { claimNft } from "../../Components/Smart Contract/smartContractHandler";
import Slider from "react-slick";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../Components/Redux/actions";




const LotteryRounds = (props) => {
    const dispatch = useDispatch()
    const isClaimed = useSelector(state => state.claimed.isClaimed)
    const user = localStorage.getItem('_u')
    const walletAddress = localStorage.getItem('_wallet')
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


    useEffect(() => {
      getPreviousRounds()  
  },[ localStorage.getItem('_wallet'),props.previous,isClaimed ]);

    useEffect(() => {
        if(claimExpiryDate!==''){
            clearInterval(intervalId);
            setIntervalId(null);
            claimCountdownTimer();
        }
    },[claimExpiryDate]);


  const getPreviousRounds = async () => {
    let dataToSend = {
        walletAddress: localStorage.getItem('_wallet'),
    }
        dispatch(setLoadingTrue());
        try {
          const round = await getPrevRounds(dataToSend);
          dispatch(setLoadingFalse());
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
            dispatch(setLoadingFalse());
        }
    }

    const lotteryWon = async (id) => {
        // console.log(id)
        setPotId(id)
        let dataToSend = {
            walletAddress: localStorage.getItem('_wallet'),
            potId: id
        }
        dispatch(setLoadingTrue());
        setButtonStatus(false)
        try {
          const data = await wonLottery(dataToSend);
          dispatch(setLoadingFalse());
          if (data.error) {
            toast.error(data?.message||'Something Went Worng in lottery won');
          } else {
            setUserWon(data?.data?.lotteryWon)
            setParticipated(data?.data?.participated)
            setClaimedNft(data?.data?.claimed)
            setButtonStatus(true)
          }
        } catch (error) {
            toast.error(error?.response?.data?.message||'Something Went Worng');
            dispatch(setLoadingFalse());
        }
    }


    const handleClaim = async () => {
        let dataToSend = {
            walletAddress: localStorage.getItem('_wallet'),
            potId: potId
        }
        console.log("")
        dispatch(setLoadingTrue());
        try {
          const data = await lotteryClaim(dataToSend);
          console.log("data got isss hash",data);
          dispatch(setLoadingFalse());
          if (data?.error) {
            toast.error(data?.message||'Something Went Worng');
          } else {
            // toast.success('Round fetched Successfully');
            claimTransaction(data?.data)
          }
        } catch (error) {
            toast.error(error?.response?.data?.message||'Something Went Worng');
            dispatch(setLoadingFalse());
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
        dispatch(setLoadingTrue());
        try {
          console.log("datatosend",dataToSend);
          const dataNft = await claimNft(dataToSend);

          dispatch(setLoadingFalse());
          if (dataNft?.error) {
            toast.error(dataNft?.message||'Something Went Worng');
          } else {

            console.log('claim lottery response',dataNft)
          }
        } catch (error) {
            toast.error(error?.response?.data?.message||'Something Went Worng');
            dispatch(setLoadingFalse());
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
                        {userWon === true && claimExpiryDate !== '' && claimedNft === false  && (<a onClick={()=>{handleClaim()}}><span></span> CLAIM NOW</a>)}
                        {userWon === true && claimExpiryDate !== '' && claimedNft === true && (<a className="disabled"><span></span>Already CLAIMED</a>)}
                        {userWon === true && claimExpiryDate === '' && claimedNft === false && ( <a className="disabled" ><span></span> CLAIM EXPIRED</a>) }
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