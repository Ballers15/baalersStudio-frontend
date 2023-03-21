import axios from 'axios';
import { environment } from '../../Environments/environment';
import { axiosInstance } from '../Interceptor';
let url = environment.apiUrl;

export function getActivePot(data) {
    return (axiosInstance.get(url + 'pot/v1/user/get/active/pot', {params: data}).then(res => res.data)) // get active pos (lottery / reward)
}

export function redeemCashLottery(data) {
  return (axiosInstance.post(url + 'user/v1/add/lottery/pot/balance',data).then(res => res.data))
}

export function redeemCashReward(data) {
  return (axiosInstance.post(url + 'user/v1/add/reward/pot/balance',data).then(res => res.data))
}

export function leaderBoardLottery(data){
  return (axiosInstance.get(url + 'pot/v1/user/get/lottery/pot/leaderboard', {params: data}).then(res=>res.data)) // lottery leaderboard
}