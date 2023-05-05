import React, { useEffect, useState } from "react";
import './poolpots.css' 
import { Table, Button, Form } from 'react-bootstrap';
import {  leaderBoardReward } from "../../Services/User/indexPot";
import 'react-multi-carousel/lib/styles.css'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../Components/Redux/actions";

   
const LeaderBoardReward = (props) => {
    const walletAddress = useSelector(state => state.wallet.walletAddress)
    const user = useSelector(state => state.user.user)
    const _u = JSON.parse(user)
    const {reload, rewardCurrentRoundDetails, setRewardCurrentRoundDetails, rewardPrevRoundsLength, rewardRoundIndex, setRewardRoundIndex, expiryTime} = props;
    const [leaderBoardDetails,setLeaderBoardDetails] = useState('')
    const [leaderSearch,setLeaderSearch]  = useState('')
    const dispatch = useDispatch()
    let prevBtn = document.getElementById('LeaderPrevBtn')
    let nextBtn = document.getElementById('LeaderNextBtn')
    let activeBtn = document.getElementById('LeaderActivePotBtn')

    useEffect(() => {
         getRewardLeaderBoard()
    }, [rewardCurrentRoundDetails])

    
    // useEffect(() => {
    //     console.log('index 2 in', rewardRoundIndex, 'id',rewardCurrentRoundDetails._id,'len',rewardPrevRoundsLength)
    // }, [rewardRoundIndex])

    useEffect(()=>{
      getRewardLeaderBoard(leaderSearch);
    },[reload])

    useEffect(() => {

        if(rewardRoundIndex === -1 && activeBtn && prevBtn){
            activeBtn.classList.add('disabled')
            prevBtn.classList.add('disabled')
        }
        if(rewardRoundIndex >= 0 && prevBtn && nextBtn && activeBtn) {
            activeBtn.classList.remove('disabled')
            // previous button
          if(rewardRoundIndex === 0){
            prevBtn.classList.add('disabled')
          }
          else{
            prevBtn.classList.remove('disabled')
          }
          //next button
          if(rewardRoundIndex === rewardPrevRoundsLength-1){
            nextBtn.classList.add('disabled')
          }
          else{
            nextBtn.classList.remove('disabled')
          }
        //   if(expiryTime !)
        }
        }, [rewardRoundIndex])

    /**
    * Get leaderboard data of active pot
    * @param data String | Search input (username)
    */
    const getRewardLeaderBoard = async (data) => {
        setLeaderBoardDetails({})
        let dataToSend = {};
        if(rewardCurrentRoundDetails){
            dataToSend = {
                search: data,
                potId: rewardCurrentRoundDetails._id,
                walletAddress: walletAddress,
                userId: _u?.user?.userId
            }
        }
        else{
            dataToSend = {
                search: data,
                potId: '',
                walletAddress: walletAddress,
                userId: _u?.user?.userId
            }
        }
        dispatch(setLoadingTrue());
        try {
          const leader = await leaderBoardReward(dataToSend);
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
            if(rewardRoundIndex >= -1 && rewardRoundIndex+1 < rewardPrevRoundsLength)
                setRewardRoundIndex(rewardRoundIndex+1)
        }
    
         /**
         * Get previous index of leaderboard round
         */
        const handlePrevIndex = () => {
            if(rewardRoundIndex > 0)
                setRewardRoundIndex(rewardRoundIndex-1)
        }
        
        /**
         * Handle go to active pot button
         */
        const handleActiveIndex = () => {
        if(rewardRoundIndex !==-1){
            if(expiryTime !==''){
                setRewardCurrentRoundDetails({})
                setLeaderBoardDetails({})
                setRewardRoundIndex(-1)
            }
            else{
                if(rewardRoundIndex !== rewardPrevRoundsLength-1)
                   setRewardRoundIndex(rewardPrevRoundsLength-1)
            }
            }
        }

    /**
     * Fromat large number
     * @param value Number | large number > 10^10
     * @returns formatted number
     */
    const formatNumberDecimal = (value) => {
        if(value > Math.pow(10,10)){
        const shortenedValue = parseFloat(value).toExponential(4);
        return shortenedValue;
        }
        else
        return value;
      };

    
return (  
              <div className="">                    
                <div className="searchBox container mb-3"> 
                <div className="row">
                    <div className="col-sm-6">
                    <input className="searchTab"
                        type="search"
                        placeholder="Search by name"  
                        onChange={(e)=>{getRewardLeaderBoard(e.target.value); setLeaderSearch(e.target.value);}}
                        />
                    </div>
                    <div className="col-sm-6">
                        <div className="d-flex justify-content-end">
                        <div id='LeaderPrevBtn' className="borderPink angleIcon disabled" onClick={()=>{handlePrevIndex()}}><i class="fa fa-angle-left" aria-hidden="true"></i></div>
                        <div className="borderPink">
                            <input
                            type='number'
                            min='0'
                            max={rewardPrevRoundsLength}
                            disabled
                            />
                            <span className="leaderboardInput">#{rewardRoundIndex!==-1 ? rewardRoundIndex+1 : 'active'}</span>
                            </div>
                        <div id='LeaderNextBtn'  className="borderPink angleIcon" onClick={()=>{handleNextIndex()}}><i class="fa fa-angle-right" aria-hidden="true"></i></div>
                        <div id='LeaderActivePotBtn' className="borderPink angleIcon disabled" onClick={()=>{handleActiveIndex()}}><i class="fa fa-angle-double-right" aria-hidden="true"></i></div>
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
                        <th>Points</th>
                        <th>ID</th>
                        <th>In game cash</th>
                        <th>Collectibles</th>
                        <th>Wallet Address</th> 
                    </tr>
                    </thead>
                    <tbody>

                {leaderBoardDetails.length && leaderBoardDetails?.map((User,index)=>{
                    return (
                    <tr key={User._id} className={User?.rank ? "active" : ""}>
                        <td>{User?.rank ? (User?.rank) : (index+1)}</td>
                        <td>{(User?.rewardPointsPercentage*10000).toFixed(2)}</td>
                        <td>{User?.userId?.userName}</td>
                        <td>$ {formatNumberDecimal(User?.amount?.$numberDecimal)}</td>
                        <td>{User?.nftHolded}</td>
                        <td>{User?.walletAddress?.slice(0,5)+'..'+User?.walletAddress?.slice(-5)}</td> 
                    </tr>)
                }) }
                    
                </tbody>
                </Table> 
                
                ) : (<div style={{textAlign: ' center'}} >No Data !</div>)} 
                </div>

            </div>
          
    )
    
}

export default LeaderBoardReward;