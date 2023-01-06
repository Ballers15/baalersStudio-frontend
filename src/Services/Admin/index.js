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
    return (axios.post(url + 'pot/v1/admin/create/reward/pot', data,{headers:config}).then(res => res.data))
  }