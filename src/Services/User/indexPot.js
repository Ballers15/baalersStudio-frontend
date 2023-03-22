import axios from 'axios';
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

export function getPrevRounds(){
  return (axiosInstance.get(url + 'pot/v1/user/get/lottery/pot/previous/rounds').then(res => res.data)) // get previous rounds
}

export function leaderBoardLottery(data){
  return (axiosInstance.get(url + 'pot/v1/user/get/lottery/pot/leaderboard', {params: data}).then(res=>res.data)) // lottery leaderboard
}