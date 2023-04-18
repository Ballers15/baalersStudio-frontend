import { environment } from '../../Environments/environment';
import { axiosInstance } from '../Interceptor';
let url = environment.apiUrl;

/**
 * Get active pot details
 * @param data Object
 * @returns active pot details
 */
export function getActivePot(data) {
    return (axiosInstance.get(url + 'pot/v1/user/get/active/pot', {params: data}).then(res => res.data)) // get active pos (lottery / reward)
}

/**
 * Get users in game cash amount
 * @param data ObJect | User details
 * @returns 
 */
export function getGameCash(data){
  return (axiosInstance.get(url + 'user/v1/get/game/cash',{params: data}).then(res => res.data)) // get gamecash of user
}

/**
 * Add / burn game cash in lottry pool
 * @param data Object
 */
export function redeemCashLottery(data) {
  return (axiosInstance.post(url + 'user/v1/add/lottery/pot/balance',data).then(res => res.data)) // redeem game cash in lottery pot
}

/**
 * Add / burn game cash in reward pool
 * @param data Object
 */
export function redeemCashReward(data) {
  return (axiosInstance.post(url + 'user/v1/add/reward/pot/balance',data).then(res => res.data)) // redeem game cash in reward pot
}

/**
 * Get previous lottery pot rounds
 * @param data Object
 * @returns 
 */
export function getPrevRounds(data){
  return (axiosInstance.get(url + 'pot/v1/user/get/lottery/pot/previous/rounds',{params: data}).then(res => res.data)) // get previous rounds
}

/**
 * Check user has participated, won or has claimed the pot 
 * @param data Object
 */
export function wonLottery(data) {
  return (axiosInstance.get(url + 'user/v1/check/user/won/lottery',{params: data}).then(res => res.data))
}

/**
 * Initiate prize / reward claim and get transaction hash
 * @param data Object
 * @returns 
 */
export function lotteryClaim(data) {
  return (axiosInstance.post(url + 'user/v1/create/lottery/claim',data).then( res => res.data))
}

/**
 * WIthdraw prize / reward
 * @param data Object
 */
export function lotteryWithdrawl(data) {
  console.log('api called withdraw',data)
  return (axiosInstance.post(url + 'user/v1/update/lottery/withdrawl',  data).then( res => res.data))
}

//     "potId":"64005b92cef436093454f6c8",   
//     "walletAddress":"0xd946F28962A96C45d9Bc16F16ca50d8350296A4E",
//     "txnHash":"0x60a53080ee77cb0fd421c355423993ef13c5017c87a041a85c061149b6002542",
//     "withdrawlId":"6400b2d83916c0e1eebb3ca8" 


/**
 * Get leader board data of current active lottery pot
 * @param data Object
 */
export function leaderBoardLottery(data){
  return (axiosInstance.get(url + 'pot/v1/user/get/lottery/pot/leaderboard', {params: data}).then(res=>res.data)) // lottery leaderboard
}

/**
 * Get previous reward pot rounds
 * @param data Object
 * @returns 
 */
export function getRewardRounds(data){
  return (axiosInstance.get(url + 'pot/v1/user/get/reward/pot/previous/rounds',{params: data}).then(res => res.data)) // get previous rounds
}

/**
 * Get leader board data of current active reward pot
 * @param data Object
 */
export function leaderBoardReward(data){
  return (axiosInstance.get(url + 'pot/v1/user/get/reward/pot/leaderboard', {params: data}).then(res=>res.data)) // lottery leaderboard
}

/**
 * Get status of reawrd claim
 * @param data Object
 */
export function isRewardClaimed(data) {
  return (axiosInstance.get(url + 'user/v1/check/user/claimed/reward',{params: data}).then(res => res.data))
}

/**
 * Initiate claim to get transaction hash
 * @param data Object
 */
export function rewardClaim(data) {
  return (axiosInstance.post(url + 'user/v1/create/claim/withdrawl',data).then(res => res.data))
}

/**
 * Withdraw prize / reward
 * @param data Object
 */
export function rewardWithdrawl(data) {
  console.log('api called withdraw',data)
  return (axiosInstance.post(url + 'user/v1/update/withdrawl',  data).then( res => res.data))
}

/**
 * Check if token is available in contract address or not
 * @param data Object
 */
export function checkNftClaim(data) {
  return (axiosInstance.get(url + 'pot/v1/check/nft/claim/contract',{params: data}).then(res => res.data))
}