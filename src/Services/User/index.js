import axios from 'axios';
import { environment } from '../../Environments/environment';
import { axiosInstance } from '../Interceptor';
let url = environment.apiUrl;

export function subscribeMailJet(data) {
    return (axios.post(url + 'auth/v1/user/register/mailjet', data).then(res => res.data)) // data{email}
 }

/**
 * @param data Object | email and password
 *
 */
export function registerUser(data) {
   return (axiosInstance.post(url + 'auth/v1/user/registry', data).then(res => res.data)) // data:{email, password}
 }

 /**
 * @param data Object | email and OTP
 * 
 */
 export function verifyOtp(data) {
  return (axiosInstance.post(url + 'auth/v1/otp/verify', data).then(res => res.data)) // data{email, otp}
}

 /**
 * @param data Object | username and email
 * 
 */
export function checkUserName(data) {
  return (axiosInstance.get(url + 'auth/v1/check/userName', {params: data}).then(res => res.data)) // data{userName,email}
}

 /**
 * @param data Object | email,userName, password, repeat
 * 
 */
export function userSignup(data) {
  return (axiosInstance.post(url + 'auth/v1/user/signup', data).then(res => res.data)) // data{email,userName, password, repeat}
}

 /**
 * @param data Object | email
 * 
 */
export function forgotPassword(data) {
  return (axiosInstance.post(url + 'auth/v1/user/forgot/password', data).then(res => res.data)) // data {email}
}

 /**
 * @param data Object | token
 * 
 */
export function forgotPasswordLink(data) {
  return (axiosInstance.get(url + `auth/v1/user/forgot/verify/link/${data}`).then(res => res.data)) // data {token}
}

 /**
 * @param data Object | password, repeat password, token
 * 
 */
export function changePassword(data) {
  return (axiosInstance.post(url + 'auth/v1/user/forgot/change/password', data).then(res => res.data)) // data {password,repeat,token}
}


export function resetPassword(data) {
  return (axiosInstance.post(url + 'auth/v1/user/reset/password', data).then(res => res.data)) 
}

// export function userLogin(data) {
//   return (axiosInstance.post(url + 'auth/v1/user/login', data).then(res => res.data)) // data {email, password}
// }

/**
 * 
 * @param data Object | Search data (if any)
 * @returns all users
 */
export function getAllUsers(data) {
  return (axiosInstance.get('users/v1/all',{params: data}).then(res => res.data));
}

/**
 * 
 * @param data Object | User Id
 * @returns 
 */
export function getUserWalletDetails(data){
  return (axiosInstance.get('users/v1/user/game/details',{params: data}).then(res => res.data));
}

/**
 * 
 * @param data Object | user Id , current blocked status
 */
export function updateUserStatus(data) {
  return (axiosInstance.patch('users/v1/admin/update/users/status',data).then(res => res.data))
}
