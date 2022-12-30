import axios from 'axios';
import { environment } from '../../Environments/environment';
let url = environment.apiUrl;

export function userLogin(data) {
    return (axios.post(url + 'auth/v1/user/login', data).then(res => res.data))
  }