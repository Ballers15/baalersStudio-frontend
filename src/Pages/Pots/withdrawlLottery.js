import { lotteryWithdrawl, rewardWithdrawl } from "../../Services/User/indexPot";

/**
 * Withdraw NFT to connected wallet
 * @param dataToSend Object | Transaction hash, wallet address, wihdrawlId and potId for lottery pot
 */
export async function withdrawLottery (dataToSend) {

    console.log('withdrawlottery', dataToSend);  
    // toast.dismiss()    
    try {
      const data =  await lotteryWithdrawl(dataToSend);
      if (data.error) {
        console.log(data?.message||'Something went worng in withdrawl');
      } else {
        console.log('after withdraw response',data)
      }
    } catch (error) {
        console.log(error?.response?.data?.message||'Something went worng in withdrawl2');
    }
}

/**
 * Withdraw Toekn to connected wallet
 * @param dataToSend Object | Transaction hash, wallet address, wihdrawlId and potId for reward pot
 */
export async function withdrawReward (dataToSend) {

  console.log('withdrawlottery', dataToSend);  
  // toast.dismiss()    
  try {
    const data = await rewardWithdrawl(dataToSend);
    if (data.error) {
      console.log(data?.message||'Something went worng in withdrawl');
    } else {
      console.log('lotery details');
      console.log('after withdraw response',data)
    }
  } catch (error) {
      console.log(error?.response?.data?.message||'Something went worng in withdrawl2');
  }
}