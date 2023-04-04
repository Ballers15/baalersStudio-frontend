import React, { useEffect, useState } from "react";
import './poolpots.css' 
import { Table, Button, Form } from 'react-bootstrap';
import { leaderBoardLottery } from "../../Services/User/indexPot";
import 'react-multi-carousel/lib/styles.css'; 
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../Components/Redux/actions";

const LeaderBoardLottery = (props) => {
    const dispatch = useDispatch()
    const [leaderBoardDetails,setLeaderBoardDetails] = useState('')
    const [leaderSearch,setLeaderSearch]  = useState('')


    useEffect(()=>{
        getLotteryLeaderBoard();
    },[props.reload])

    const getLotteryLeaderBoard = async (data) => {
        let dataToSend = {
            search: data,
        }
        dispatch(setLoadingTrue());
        try {
          const leader = await leaderBoardLottery(dataToSend);
          dispatch(setLoadingFalse());
          if (leader.error) {
            toast.error(leader?.message||'Something Went Worng');
        } else {
            setLeaderBoardDetails(leader?.data)
          }
        } catch (error) {
            toast.error(error?.response?.data?.message||'Something Went Worng');
            dispatch(setLoadingFalse());
        }
         
    }


    const handleSearchUser = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.preventDefault();
        getLotteryLeaderBoard(leaderSearch);
    }

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
                    <h4>Search Leaderboard</h4>
                    <Form className="d-flex position-relative align-items-center" onSubmit={handleSearchUser} onReset={()=>{ getLotteryLeaderBoard();}}>
                       <Form.Control
                            type="search"
                            placeholder="Playername#Tagline"
                            className="me-2 searchBar"
                            aria-label="Search"
                            onChange={(e)=>{getLotteryLeaderBoard(e.target.value); setLeaderSearch(e.target.value);}}
                        />
                        <Button className="searchIcon" type='submit' ><i className="fa fa-search" aria-hidden="true"></i></Button>
                        {/* <Button className="resetIcon" type = 'reset' ><i className="fa fa-times" aria-hidden="true"></i></Button> */}
                    </Form>
                </div>
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
                </Table> 
                
            </div>
          
    )
    
}

export default LeaderBoardLottery;