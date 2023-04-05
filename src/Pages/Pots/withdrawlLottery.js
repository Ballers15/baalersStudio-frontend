import { lotteryWithdrawl, rewardWithdrawl } from "../../Services/User/indexPot";


export async function withdrawLottery (dataToSend) {


    console.log('withdrawlottery', dataToSend);  
    try {
      const data =  await lotteryWithdrawl(dataToSend);
      if (data.error) {
        console.log(data?.message||'Something Went Worng in withdrawl');
      } else {
        console.log('lotery details');
        console.log('after withdraw response',data)
      }
    } catch (error) {
        console.log(error?.response?.data?.message||'Something Went Worng in withdrawl2');
    }
}


export async function withdrawReward (dataToSend) {


  console.log('withdrawlottery', dataToSend);  
  try {
    const data = await rewardWithdrawl(dataToSend);
    if (data.error) {
      console.log(data?.message||'Something Went Worng in withdrawl');
    } else {
      console.log('lotery details');
      console.log('after withdraw response',data)
    }
  } catch (error) {
      console.log(error?.response?.data?.message||'Something Went Worng in withdrawl2');
  }
}