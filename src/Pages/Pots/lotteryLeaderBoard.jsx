import React, { useEffect, useState } from "react";
import './poolpots.css' 
import { Table, Form } from 'react-bootstrap';
import { leaderBoardLottery } from "../../Services/User/indexPot";
import 'react-multi-carousel/lib/styles.css'; 
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../Components/Redux/actions";

const LeaderBoardLottery = (props) => {
    const {reload, lotteryPrevRoundsLength, lotteryCurrentRoundDetails, setLotteryCurrentRoundDetails, lotteryRoundIndex, setLotteryRoundIndex, expiryTime} = props;
    const dispatch = useDispatch()
    const [leaderBoardDetails,setLeaderBoardDetails] = useState({})
    const [leaderSearch,setLeaderSearch]  = useState('')
    let prevBtn = document.getElementById('LeaderPrevBtn')
    let nextBtn = document.getElementById('LeaderNextBtn')
    let activePotBtn = document.getElementById('LeaderActivePotBtn')
 
    useEffect(() => {
        getLotteryLeaderBoard()
    }, [lotteryCurrentRoundDetails])

    // useEffect(() => {
    //     console.log('index 2 in', lotteryRoundIndex, 'id',lotteryCurrentRoundDetails._id,'len',hash+lotteryPrevRoundsLength)
    //     }, [lotteryRoundIndex])

    useEffect(()=>{
        getLotteryLeaderBoard(leaderSearch);
    },[reload])

    useEffect(() => {
    if(lotteryRoundIndex) {
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
        if(lotteryCurrentRoundDetails){
        dataToSend = {
            search: data,
            potId: lotteryCurrentRoundDetails._id
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

    
    const handleIndexChange = (e) => {
        if(e.target.value > 0 ){
        if(e.target.value <= lotteryPrevRoundsLength)
            setLotteryRoundIndex(e.target.value-1)
        else
            setLotteryRoundIndex(lotteryPrevRoundsLength-1)
        }
    }

    /**
     * Get next index of leaderboard round
     */
    const handleNextIndex = () => {
        if(lotteryRoundIndex >= 0 && lotteryRoundIndex+1 < lotteryPrevRoundsLength)
            setLotteryRoundIndex(lotteryRoundIndex+1)
    }

     /**
     * Get previous index of leaderboard round
     */
    const handlePrevIndex = () => {
        if(lotteryRoundIndex > 0 && lotteryRoundIndex <= lotteryPrevRoundsLength)
            setLotteryRoundIndex(lotteryRoundIndex-1)
    }

    /**
         * Handle go to active pot button
         */
    const handleActiveIndex = () => {
        if(expiryTime !==''){
            setLotteryCurrentRoundDetails({})
            setLotteryRoundIndex()
        }
        else{
            if(lotteryRoundIndex !== lotteryPrevRoundsLength-1)
               setLotteryRoundIndex(lotteryPrevRoundsLength-1)
        }
    }

    /**
    * Format large number
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

    
return(  
              <div className="">
             <div className="searchBox">
                    {/* <h4>Search Leaderboard</h4>
                    <Form className="d-flex position-relative align-items-center" onSubmit={handleSearchUser} onReset={()=>{ getLotteryLeaderBoard();}}>
                       <Form.Control
                            type="search"
                            placeholder="Playername#Tagline"
                            className="me-2 searchBar"
                            aria-label="Search"
                            onChange={(e)=>{getLotteryLeaderBoard(e.target.value); setLeaderSearch(e.target.value);}}
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
                        onChange={(e)=>{getLotteryLeaderBoard(e.target.value); setLeaderSearch(e.target.value);}}
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
                            max={lotteryPrevRoundsLength}
                            value={lotteryRoundIndex && (lotteryRoundIndex)}
                            />
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
                    <tr key={User._id} >
                        <td>{index+1}</td>
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