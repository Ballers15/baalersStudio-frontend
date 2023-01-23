import axios from 'axios';
import { environment } from '../../Environments/environment';
let url = environment.apiUrl;

export function subscribeMailJet(data) {
    return (axios.post(url + 'auth/v1/user/register/mailjet', data).then(res => res.data))
  }