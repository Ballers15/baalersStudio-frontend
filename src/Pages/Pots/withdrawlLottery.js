import { useState } from "react";
import { lotteryWithdrawl, rewardWithdrawl } from "../../Services/User/indexPot";

   


export function withdrawLottery (dataToSend) {


    console.log('withdrawlottery', dataToSend);  
    // setLoading(true);
    try {
      const data =  lotteryWithdrawl(dataToSend);
      // setLoading(false);
      if (data.error) {
        console.log(data?.message||'Something Went Worng in withdrawl');
        // setShowToaster(true);
      } else {
        console.log('lotery details');
        // setShowToaster(true); 
        console.log('after withdraw response',data)
        // getLotteryLeaderBoard();
      }
    } catch (error) {
        console.log(error?.response?.data?.message||'Something Went Worng in withdrawl2');
        // setShowToaster(true);
        // setLoading(false);
    }
}


export function withdrawReward (dataToSend) {


  console.log('withdrawlottery', dataToSend);  
  // setLoading(true);
  try {
    const data =  rewardWithdrawl(dataToSend);
    // setLoading(false);
    if (data.error) {
      console.log(data?.message||'Something Went Worng in withdrawl');
      // setShowToaster(true);
    } else {
      console.log('lotery details');
      // setShowToaster(true); 
      console.log('after withdraw response',data)
      // getLotteryLeaderBoard();
    }
  } catch (error) {
      console.log(error?.response?.data?.message||'Something Went Worng in withdrawl2');
      // setShowToaster(true);
      // setLoading(false);
  }
}