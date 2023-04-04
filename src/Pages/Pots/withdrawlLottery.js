import { lotteryWithdrawl, rewardWithdrawl } from "../../Services/User/indexPot";


export async function withdrawLottery (dataToSend) {


    console.log('withdrawlottery', dataToSend);  
    // setApiLoading(true);
    try {
      const data =  await lotteryWithdrawl(dataToSend);
      // setApiLoading(false);
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
        // setApiLoading(false);
    }
}


export async function withdrawReward (dataToSend) {


  console.log('withdrawlottery', dataToSend);  
  // setApiLoading(true);
  try {
    const data = await rewardWithdrawl(dataToSend);
    // setApiLoading(false);
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
      // setApiLoading(false);
  }
}