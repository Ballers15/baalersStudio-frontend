import React, { useEffect, useState } from "react";
import './poolpots.css' 
import { Table, Button, Form } from 'react-bootstrap';
import {  leaderBoardReward } from "../../Services/User/indexPot";
import 'react-multi-carousel/lib/styles.css'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../Components/Redux/actions";

   
const LeaderBoardReward = (props) => {
    const {reload, rewardCurrentRoundDetails, setRewardCurrentRoundDetails, rewardPrevRoundsLength, rewardRoundIndex, setRewardRoundIndex, expiryTime} = props;
    const [leaderBoardDetails,setLeaderBoardDetails] = useState('')
    const [leaderSearch,setLeaderSearch]  = useState('')
    const dispatch = useDispatch()
    let prevBtn = document.getElementById('LeaderPrevBtn')
    let nextBtn = document.getElementById('LeaderNextBtn')
    let activePotBtn = document.getElementById('LeaderActivePotBtn')

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
        if(rewardRoundIndex) {
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
                potId: rewardCurrentRoundDetails._id
            }
        }
        else{
            dataToSend = {
                search: data,
                potId: ''
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

    const handleIndexChange = (e) => {
        if(e.target.value > 0 ){
        if(e.target.value <= rewardPrevRoundsLength)
            setRewardRoundIndex(e.target.value-1)
        else
            setRewardRoundIndex(rewardPrevRoundsLength-1)
        }
    }

    /**
     * Get next index of leaderboard round
     */
        const handleNextIndex = () => {
            if(rewardRoundIndex >= 0 && rewardRoundIndex+1 < rewardPrevRoundsLength)
                setRewardRoundIndex(rewardRoundIndex+1)
        }
    
         /**
         * Get previous index of leaderboard round
         */
        const handlePrevIndex = () => {
            if(rewardRoundIndex > 0 && rewardRoundIndex <= rewardPrevRoundsLength)
            setRewardRoundIndex(rewardRoundIndex-1)
        }
        
        /**
         * Handle go to active pot button
         */
        const handleActiveIndex = () => {
            if(expiryTime !==''){
                setRewardCurrentRoundDetails({})
            }
            else{
                if(rewardRoundIndex !== rewardPrevRoundsLength-1)
                   setRewardRoundIndex(rewardPrevRoundsLength-1)
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
                <div className="searchBox">
                    {/*<h4>Search Leaderboard</h4>
                     <Form className="d-flex position-relative align-items-center" onSubmit={handleSearchUser} onReset={()=>{ getRewardLeaderBoard();}}>
                       <Form.Control
                            type="search"
                            placeholder="Playername#Tagline"
                            className="me-2 searchBar"
                            aria-label="Search"
                            onChange={(e)=>{getRewardLeaderBoard(e.target.value); setLeaderSearch(e.target.value);}}
                        />
                        <Button className="searchIcon" type='submit' ><i className="fa fa-search" aria-hidden="true"></i></Button>
                    </Form> */}
                </div>
                    
                <div className="container mb-3"> 
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
                        <div id='LeaderPrevBtn' className="borderPink angleIcon" onClick={()=>{handlePrevIndex()}}><i class="fa fa-angle-left" aria-hidden="true"></i></div>
                        <div className="borderPink">#
                            <input
                            type='number'
                            onChange={(e)=>{handleIndexChange(e)}}
                            min='0'
                            max={rewardPrevRoundsLength}
                            value={rewardRoundIndex}
                            />
                            </div>
                        <div id='LeaderNextBtn'  className="borderPink angleIcon" onClick={()=>{handleNextIndex()}}><i class="fa fa-angle-right" aria-hidden="true"></i></div>
                        <div id='LeaderActivePotBtn' className="borderPink angleIcon" onClick={()=>{handleActiveIndex()}}><i class="fa fa-angle-double-right" aria-hidden="true"></i></div>
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
                    <tr key={User._id} >
                        <td>{index+1}</td>
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