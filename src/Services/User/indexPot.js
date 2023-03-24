import { environment } from '../../Environments/environment';
import { axiosInstance } from '../Interceptor';
let url = environment.apiUrl;

export function getActivePot(data) {
    return (axiosInstance.get(url + 'pot/v1/user/get/active/pot', {params: data}).then(res => res.data)) // get active pos (lottery / reward)
}

export function getGameCash(data){
  return (axiosInstance.get(url + 'user/v1/get/game/cash',{params: data}).then(res => res.data)) // get gamecash of user
}

export function redeemCashLottery(data) {
  return (axiosInstance.post(url + 'user/v1/add/lottery/pot/balance',data).then(res => res.data)) // redeem game cash in lottery pot
}

export function redeemCashReward(data) {
  return (axiosInstance.post(url + 'user/v1/add/reward/pot/balance',data).then(res => res.data)) // redeem game cash in reward pot
}

export function getPrevRounds(data){
  return (axiosInstance.get(url + 'pot/v1/user/get/lottery/pot/previous/rounds',{params: data}).then(res => res.data)) // get previous rounds
}

export function wonLottery(data) {
  return (axiosInstance.get(url + 'user/v1/check/user/won/lottery',{params: data}).then(res => res.data))
}

export function lotteryClaim(data) {
  return (axiosInstance.post(url + 'user/v1/create/lottery/claim',data).then( res => res.data))
}

export function lotteryWithdrawl(data) {
  console.log('api called withdraw',data)
  return (axiosInstance.post(url + 'user/v1/update/lottery/withdrawl',  data).then( res => res.data))
}

//     "potId":"64005b92cef436093454f6c8",   
//     "walletAddress":"0xd946F28962A96C45d9Bc16F16ca50d8350296A4E",
//     "txnHash":"0x60a53080ee77cb0fd421c355423993ef13c5017c87a041a85c061149b6002542",
//     "withdrawlId":"6400b2d83916c0e1eebb3ca8" 



export function leaderBoardLottery(data){
  return (axiosInstance.get(url + 'pot/v1/user/get/lottery/pot/leaderboard', {params: data}).then(res=>res.data)) // lottery leaderboard
}