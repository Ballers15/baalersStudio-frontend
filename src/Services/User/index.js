import axios from 'axios';
import { environment } from '../../Environments/environment';
import { axiosInstance } from '../Interceptor';
let url = environment.apiUrl;

export function subscribeMailJet(data) {
    return (axios.post(url + 'auth/v1/user/register/mailjet', data).then(res => res.data)) // data{email}
 }

export function registerUser(data) {
   return (axiosInstance.post(url + 'auth/v1/user/registry', data).then(res => res.data)) // data:{email, password}
 }

 export function verifyOtp(data) {
  return (axiosInstance.post(url + 'auth/v1/otp/verify', data).then(res => res.data)) // data{email, otp}
}

export function checkUserName(data) {
  return (axiosInstance.get(url + 'auth/v1/check/userName', {params: data}).then(res => res.data)) // data{userName,email}
}

export function userSignup(data) {
  return (axiosInstance.post(url + 'auth/v1/user/signup', data).then(res => res.data)) // data{name,firstname,lastName,email,userName, password, repeat}
}

export function forgotPassword(data) {
  return (axiosInstance.post(url + 'auth/v1/user/forgot/password', data).then(res => res.data)) // data {email}
}

export function forgotPasswordLink(data) {
  return (axiosInstance.get(url + `auth/v1/user/forgot/verify/link/${data}`).then(res => res.data)) // data {token}
}

export function changePassword(data) {
  return (axiosInstance.post(url + 'auth/v1/user/forgot/change/password', data).then(res => res.data)) // data {password,repeat,token}
}

export function resetPassword(data) {
  return (axiosInstance.post(url + 'auth/v1/user/reset/password', data).then(res => res.data)) //data {newPassword, confirmPassword, oldPassword}
}

export function userLogin(data) {
  return (axiosInstance.post(url + 'auth/v1/user/login', data).then(res => res.data)) // data {email, password}
}

export function getAllUsers(data) {
  return (axiosInstance.get('users/v1/all',{params: data}).then(res => res.data));
 }