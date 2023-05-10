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

/**
 * 
 * @param data Object | wallet address 
 * @returns pools count for wallet address
 */
export function getPoolsParticipated(data) {
  return (axiosInstance.get('user/v1/count/pool/participated',{params: data}).then(res => res.data))
}

/**
 * 
 * @param data Object | wallet address 
 * @returns 17 Nft array with exists attribute 
 */
export function getUserNft(data) {
  return (axiosInstance.get('users/v1/check/nfts',{params: data}).then(res => res.data))
}

/**
 * 
 * @param data Object | wallet address 
 * @returns 
 */
export function getTokenBalance(data) {
  return (axiosInstance.get('users/v1/token/balance',{params: data}).then(res => res.data))
}

/**
 * 
 * @returns User notifications
 */
export function userNotifications(){
  return (axiosInstance.get('notifications/v1/user/get/notifications').then(res => res.data))
}

/**
 * Mark particular notification as read
 * @param data Object | notificationId
 */
export function readSingleNotification(data){
  return (axiosInstance.post('notifications/v1/user/read/particular/notifications',data).then(res => res.data))
}

/**
 * Post request to read all notifications
 */
export function readAllNotifications(){
  return (axiosInstance.post('notifications/v1/user/read/all/notifications').then(res => res.data))
}