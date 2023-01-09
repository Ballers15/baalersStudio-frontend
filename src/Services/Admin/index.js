import axios from 'axios';
import { environment } from '../../Environments/environment';
let url = environment.apiUrl;
let u = localStorage.getItem('_u');
let _u = JSON.parse(u);
let config = {
  'x-access-user':_u?.user?.accountId,
  'x-access-token': _u?.token
}

export function AddRewardPot(data) {
  return (axios.post(url + 'pot/v1/admin/create/reward/pot', data, { headers: config }).then(res => res.data));
}
  
export function getAllRewardPot() {
  return (axios.get(url + 'pot/v1/admin/getall/reward/pot', { headers: config }).then(res => res.data));
}

export function getRewardPotById(data) {
  return (axios.get(url + 'pot/v1/admin/getbyid/reward/pot',{headers: config,params: data}).then(res => res.data));
}

export function updateRewardPotDetail(data) {
  return (axios.patch(url + 'pot/v1/admin/update/reward/pot',data,{headers: config}).then(res => res.data));
}

export function updateRewardPotStatus(data) {
  return (axios.patch(url + 'pot/v1/admin/reward/pot/status',data,{headers: config}).then(res => res.data));
}