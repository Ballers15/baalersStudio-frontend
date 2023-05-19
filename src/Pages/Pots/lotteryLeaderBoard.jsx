import React, { useEffect, useState } from "react";
import './poolpots.css' 
import { Table } from 'react-bootstrap';
import { leaderBoardLottery } from "../../Services/User/indexPot";
import 'react-multi-carousel/lib/styles.css'; 
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../Components/Redux/actions";
import { formatNumberDecimal } from "../../Components/functions";

const LeaderBoardLottery = (props) => {
    const walletAddress = useSelector(state => state.wallet.walletAddress)
    const user = useSelector(state => state.user.user)
    const _u = JSON.parse(user)
    const {reload, lotteryPrevRoundsLength, lotteryCurrentRoundDetails, lotteryRoundIndex, setLotteryRoundIndex, expiryTime,activeLotteryId} = props;
    const dispatch = useDispatch()
    const [leaderBoardDetails,setLeaderBoardDetails] = useState({})
    const [leaderSearch,setLeaderSearch]  = useState('')
    let prevBtn = document.getElementById('LeaderPrevBtn')
    let nextBtn = document.getElementById('LeaderNextBtn')
    let activeBtn = document.getElementById('LeaderActivePotBtn')
 
    useEffect(() => {
        if(lotteryCurrentRoundDetails?._id !== undefined)
            getLotteryLeaderBoard(leaderSearch)
    }, [lotteryCurrentRoundDetails,reload,lotteryRoundIndex])



    useEffect(() => {
        console.log(lotteryRoundIndex,'index')
        if(lotteryRoundIndex === -1 && activeBtn && prevBtn){
            activeBtn.classList.add('disabled')
            prevBtn.classList.add('disabled')
        }

    if(lotteryRoundIndex >= 0 && prevBtn && nextBtn && activeBtn) {
        activeBtn.classList.remove('disabled')
        // previous button
      if(lotteryRoundIndex === 0){
        prevBtn.classList.add('disabled')
      }
      else{
        prevBtn.classList.remove('disabled')
      }
      //next button
      if(lotteryRoundIndex === lotteryPrevRoundsLength-1){
        nextBtn.classList.add('disabled')
      }
      else{
        nextBtn.classList.remove('disabled')
      }
      
    //   if(expiryTime !)
    }
    }, [lotteryRoundIndex])
    
    /**
     * Get leaderboard data of active pot
     * @param data String | Search input (username)
     */
    const getLotteryLeaderBoard = async (data) => {
        setLeaderBoardDetails({})
        let dataToSend = {};
            if(lotteryRoundIndex !==-1){
        dataToSend = {
            search: data,
            potId: lotteryCurrentRoundDetails._id,
            walletAddress: walletAddress,
            userId: _u?.user?.userId
            }
        }
        else{
            dataToSend = {
                search: data,
                potId: activeLotteryId,
                walletAddress: walletAddress,
                userId: _u?.user?.userId
            }
    }
        dispatch(setLoadingTrue());
        try {
          const leader = await leaderBoardLottery(dataToSend);
          dispatch(setLoadingFalse());
          if (leader.error) {
            toast.dismiss();
            toast.error(leader?.message||'Something went worng');
        } else {
            setLeaderBoardDetails(leader?.data)
          }
        } catch (error) {
            toast.dismiss();
            toast.error(error?.response?.data?.message||'Something went worng');
            dispatch(setLoadingFalse());
        }
    }

    /**
     * Get next index of leaderboard round
     */
    const handleNextIndex = () => {
        if(lotteryRoundIndex >= -1 && lotteryRoundIndex+1 < lotteryPrevRoundsLength)
            setLotteryRoundIndex(lotteryRoundIndex+1)
    }

     /**
     * Get previous index of leaderboard round
     */
    const handlePrevIndex = () => {
        if(lotteryRoundIndex > 0)
            setLotteryRoundIndex(lotteryRoundIndex-1)
    }

    /**
    * Handle go to active pot button
    */
    const handleActiveIndex = () => {
    if(lotteryRoundIndex !==-1){
        if(expiryTime !==''){
            setLeaderBoardDetails({})
            setLotteryRoundIndex(-1)
        }
        else{
            if(lotteryRoundIndex !== lotteryPrevRoundsLength-1)
               setLotteryRoundIndex(lotteryPrevRoundsLength-1)
        }
    }
}

    
return(  
              <div className="">
                <div className="searchBox container mb-3"> 
                <div className="row">
                    <div className="col-sm-6">
                    <input className="searchTab"
                        type="search"
                        placeholder="Search by name" 
                        onChange={(e)=>{getLotteryLeaderBoard(e.target.value); setLeaderSearch(e.target.value);}}
                        />
                    </div>
                    <div className="col-sm-6">
                        <div className="d-flex justify-content-end">
                        <div id='LeaderPrevBtn' className="borderPink angleIcon" onClick={()=>{handlePrevIndex()}}><i class="fa fa-angle-left" aria-hidden="true"></i></div>
                          <div className="borderPink">
                            <input
                            type='number'
                            min='0'
                            max={lotteryPrevRoundsLength}
                            disabled
                            />
                            <span className="leaderboardInput">#{lotteryRoundIndex!==-1 ? lotteryRoundIndex+1 : 'active'}</span>
                            </div>
                        <div id='LeaderNextBtn'  className="borderPink angleIcon" onClick={()=>{handleNextIndex()}}><i class="fa fa-angle-right" aria-hidden="true"></i></div>
                        <div id='LeaderActivePotBtn' className="borderPink angleIcon"  onClick={()=>{handleActiveIndex()}}><i class="fa fa-angle-double-right" aria-hidden="true"></i></div>
                        </div>
                    </div>
                </div>
                </div>
                <div className="container">
                {leaderBoardDetails?.length !== 0 ? (
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>ID</th>
                        <th>In game cash</th>
                        <th>Wallet Address</th> 
                    </tr>
                    </thead>
                    <tbody>

                {leaderBoardDetails.length && leaderBoardDetails?.map((User,index)=>{
                    return (
                        <tr key={User._id} className={User?.rank ? "active" : ""}>
                        <td>{User?.rank ? (User?.rank) : (index+1)}</td>
                        <td>{User?.userId?.userName}</td>
                        <td>$ {formatNumberDecimal(User?.amount?.$numberDecimal)}</td>
                        <td>{User?.walletAddress?.slice(0,5)+'..'+User?.walletAddress?.slice(-5)}</td> 
                    </tr>)
                }) }
                    
                </tbody>
                </Table> ) : (<div style={{textAlign: ' center'}} >No Data !</div>)}
                </div>
            </div>
    )
    
}

export default LeaderBoardLottery;