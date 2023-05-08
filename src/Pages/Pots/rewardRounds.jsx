import React, { useEffect, useState } from "react";
import './poolpots.css' 
import img1 from '../../Assest/img/img1.png' 
import { getRewardRounds,  isRewardClaimed, rewardClaim } from "../../Services/User/indexPot";
import 'react-multi-carousel/lib/styles.css';
import {  claimToken } from "../../Components/Smart Contract/smartContractHandler";
import Slider from "react-slick";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../Components/Redux/actions";

const RewardRounds = (props) => {
  const {previous, setRewardCurrentRoundDetails,  setRewardPrevRoundsLength, rewardRoundIndex, setRewardRoundIndex} = props;
    const dispatch = useDispatch()
    const isClaimed = useSelector(state => state.claimed.isClaimed)
    const user = useSelector(state => state.user.user)
    const walletAddress = useSelector(state => state.wallet.walletAddress)
    const [claimExpiryDate, setClaimExpiryDate] = useState('')
    const [prevRounds, setPrevRounds] = useState('')
    const [prevRoundsLength, setPrevRoundsLength] = useState('')
    const [participated, setParticipated] = useState(false)
    const [potId,setPotId] = useState('')
    const [claimed,setClaimed] = useState(false)
    const [intervalId, setIntervalId] = useState(null);
    const [buttonStatus, setButtonStatus] = useState(true)

    function SampleNextArrow(props) {
      const { className, style, onClick, buttonStatus } = props;
      return (
        <div
          className={className}
          style={{ ...style, visibility: buttonStatus ? "visible" : "hidden" }}
          onClick={onClick}
        ><p className="finishText"><i className="fa fa-arrow-right" aria-hidden="true"></i></p></div>
      );
    }
    function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, }}
          onClick={onClick}
        ><p className="finishText"><i className="fa fa-arrow-left" aria-hidden="true"></i> </p></div>
      );
    }
    var settings = {  
      className: "slider variable-width",
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true, 
      nextArrow: <SampleNextArrow buttonStatus={buttonStatus}/>,
      prevArrow: <SamplePrevArrow buttonStatus={buttonStatus}/>,
      rtl: true,
      initialSlide: prevRoundsLength-1
    };
  
   /**
   * Get current slide index upon slide change
   * @param current | active slide index
   */
  const handleSlideChange = (current) => {
      current=prevRoundsLength-current-1
      setClaimExpiryDate(prevRounds[current]?.claimExpiryDate)
      setRewardRoundIndex(current)
      setRewardCurrentRoundDetails(prevRounds[current])

        if(user !== null && walletAddress !== null) {
            // console.log(prevRounds[current]);
            claimedReward(prevRounds[current]._id)
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
  },[ walletAddress,previous,isClaimed]);


    useEffect(() => {
        if(claimExpiryDate!==''){
            // console.log("calling again in useeffecttt======");
            // console.log("in use effect intervalId",intervalId)
            clearInterval(intervalId);
            setIntervalId(null);
            claimCountdownTimer();
    
        }
    },[claimExpiryDate]);

    useEffect(()=>{
      console.log('index',rewardRoundIndex)
      if(prevRounds.length >= rewardRoundIndex){
        setRewardCurrentRoundDetails(prevRounds[rewardRoundIndex])
      }
    },[rewardRoundIndex])

    /**
    * Get array of previous rounds
    */
    const getPreviousRounds = async () => {
      setPrevRounds({})
      setPrevRoundsLength(0)
      let dataToSend = {
        walletAddress: walletAddress,
    }
        dispatch(setLoadingTrue());
        try {
          const round = await getRewardRounds(dataToSend);
          dispatch(setLoadingFalse());
          if (round.error) {
            toast.dismiss();
            toast.error(round?.message||'Something went worng');
          } else {
            // toast.success('round fetched Successfully');
            setPrevRounds(round?.data)
            setPrevRoundsLength(round?.data?.length)
            setRewardPrevRoundsLength(round?.data?.length)
            let lastIndex = round?.data?.length-1
            console.log(round?.data?.length)
            // console.log('i am set here getPreviousRounds ',round?.data[0]?.userRes);
            setParticipated(round?.data[lastIndex]?.userRes?.participated)
            setClaimed(round?.data[lastIndex]?.userRes?.claimed)
            setClaimExpiryDate(round?.data[lastIndex]?.claimExpiryDate)
            // console.log(round?.data[currentSlide]?.claimExpiryDate)
            setPotId(round?.data[lastIndex]?._id)
          }
        } catch (error) {
            toast.dismiss();
            toast.error(error?.response?.data?.message||'Something went worng');
            dispatch(setLoadingFalse());
        }
    }
    /**
     * check claim status of previous reward rounds
     * @param id | potId
     */
    const claimedReward = async (id) => {
        // console.log(id)
        setPotId(id)
        let dataToSend = {
            walletAddress: walletAddress,
            potId: id
        }
        dispatch(setLoadingTrue());
        setButtonStatus(false)
        try {
          const data = await isRewardClaimed(dataToSend);
          dispatch(setLoadingFalse());
          if (data.error) {
            toast.dismiss();
            toast.error(data?.message||'Something went worng');
          } else {
            // toast.success('Round fetched Successfully');
            let partcicipate = (data?.data?.participated)
            setParticipated(partcicipate)
            let claim = (data?.data?.claimed)
            setClaimed(claim)
            console.log(partcicipate,'isclaimed.participated',participated)
            console.log(claim,'isclaimed.claimed',claimed)
            setButtonStatus(true)
          }
        } catch (error) {
          toast.dismiss();
          toast.error(error?.response?.data?.message||'Something went worng');
            dispatch(setLoadingFalse());
        }
    }

    /**
     * Get details required for initiating the transaction
     */
    const handleClaim = async () => {
        let dataToSend = {
            walletAddress: walletAddress,
            potId: potId
        }
        dispatch(setLoadingTrue());
        try {
          const data = await rewardClaim(dataToSend);
          dispatch(setLoadingFalse());
          if (data?.error) {
            toast.dismiss();
            toast.error(data?.message||'Something went worng');
          } else {
            // toast.success(' Successfully');
            claimTransaction(data?.data)
            // console.log('create calim',data?.data)
          }
        } catch (error) {
          toast.dismiss();
          toast.error(error?.response?.data?.message||'Something went worng handle Claim 2' );
          dispatch(setLoadingFalse());
        }
    }
    /**
     * To inititate transaction upon claim for reward tokens
     * @param data object | Transaction details fetched from lotteryCalim API
     */
    const claimTransaction = async (data) => {
        let dataToSend = {
            contractAddress:data?.potDetails?.assetDetails?.contractAddress,
            amount:data?.transactionDetails?.rewardedTokenAmountDecimals?.$numberDecimal,
            nonce:data?.transactionDetails?.nonce,
            signature:data?.transactionDetails.signature,
            potId: data?.potDetails?._id,   
            withdrawlId: data?.transactionDetails?._id
        }
        console.log('calim transaction',dataToSend)
        dispatch(setLoadingTrue());
        try {
          const dataToken = await claimToken(dataToSend);
          dispatch(setLoadingFalse());
          if (dataToken?.error) {
            // console.log("")
            toast.dismiss();
            toast.error(dataToken?.message||'Something went worng');
          } 
        } catch (error) {
          console.log(error);
          toast.dismiss();
          toast.error(error?.response?.data?.message||'Something went worng');
            dispatch(setLoadingFalse());
        }
    }


return(
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
                                       {round?.potUserDetails?.length ? <><p className="winHead">Winners <span></span> </p> 
                                        <div className="row justify-content-center">
                                          {round?.potUserDetails?.map((user)=>(
                                            <div className="col-4 col-sm-4 text-center" key={user?._id}>
                                            <img src={img1} alt="" />
                                            <p className="address mb-0">{user?.walletAddress.slice(0,4)+'...'+user?.walletAddress.slice(-4)+'@'+user?.user?.userName} </p>
                                            </div>
                                          ))}
                                            
                                        </div></> : <p className="winHead noRoundText">No one participated in this round</p>}
                                    </div>
                                </div>
                            </div>)
                           )}                            
                            </Slider>) : <span className='no data'></span>}
                        </div>
                    </div>    
                    {prevRounds?.length ?  (<div className="poolBtn text-center pt-4 finishBtn">
                        <div className="playBtn">
                        {claimExpiryDate !== '' && claimed === false && participated === true && (<a onClick={()=>{handleClaim()}}><span></span> CLAIM NOW</a>)}
                        {claimExpiryDate !== '' && claimed === true && (<a className="disabled"><span></span>Already CLAIMED</a>)}
                        {claimExpiryDate === '' && claimed === false && participated === true && (<a className="disabled"><span></span>CLAIM EXPIRED</a>)}
                        {claimExpiryDate !== '' && claimed === false && participated === false && (<></>)}
                        </div>  

                        <div className="expDate">
                            { claimExpiryDate!=='' && participated === true && claimed === false &&
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
            )
        }

export default RewardRounds;