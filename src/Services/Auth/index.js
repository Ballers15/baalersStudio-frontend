import { axiosInstance } from '../Interceptor';

export function userLogin(data) {
    return (axiosInstance.post('/auth/v1/user/login', data).then(res => res.data))
  }