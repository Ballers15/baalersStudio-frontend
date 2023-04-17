import { axiosInstance } from '../Interceptor';
/**
 * 
 * @param  data Object | Pot details
 */
export function AddRewardPot(data) {
  return (axiosInstance.post('/pot/v1/admin/create/reward/pot', data).then(res => res.data));
}
  
/**
 * 
 * @param data params | Pot type
 */
export function getAllRewardPot(data) {
  return (axiosInstance.get('/pot/v1/admin/getall/reward/pot',{params: data}).then(res => res.data));
}

/**
 * 
 * @param data params | Pot type
 */
export function getUpcomingRewardPot(data) {
  return (axiosInstance.get('/pot/v1/admin/upcoming/reward/pot',{params: data}).then(res => res.data));
}

/**
 * 
 * @param data params | Pot type
 */
export function getArchivesRewardPot(data) {
  return (axiosInstance.get('/pot/v1/admin/archive/reward/pot',{params: data}).then(res => res.data));
}

/**
 * 
 * @param data params | Pot Id
 */
export function getRewardPotById(data) {
  return (axiosInstance.get('/pot/v1/admin/getbyid/reward/pot',{params: data}).then(res => res.data));
}

/**
 * 
 * @param data Object | Pot details
 * @returns 
 */
export function updateRewardPotDetail(data) {
  return (axiosInstance.patch('/pot/v1/admin/update/reward/pot',data).then(res => res.data));
}

/**
 * 
 * @param data Object | PotId and Current active status
 * @returns 
 */
export function updateRewardPotStatus(data) {
  return (axiosInstance.patch('/pot/v1/admin/reward/pot/status',data).then(res => res.data));
}

/**
 * 
 * @param data Object | Pot Id & (email, wallet address) filter
 * @returns 
 */
export function getSpecificPotUsers (data) {
  return (axiosInstance.get('user/v1/specific/pot/users',{params:data}).then(res=>res.data));
}

/**
 * 
 * @param data Object | Pot Id, claim status
 * @returns 
 */
export function updateRewardClaimStatus (data) {
  return (axiosInstance.patch('pot/v1/admin/stop/reward/pot/claim',data).then(res => res.data));
}

/**
 * 
 * @returns All users data
 */
export function getUsersCount () {
  return (axiosInstance.get('users/v1/admin/get/users/count').then(res => res.data));
}

/**
 * 
 * @returns All pot details
 */
export function getPotCounts () {
  return (axiosInstance.get('pot/v1/admin/pot/counts').then(res => res.data));
}
/**
 * 
 * @returns Total Amount Claimed by NFT
 */
export function getPotClaim () {
  return (axiosInstance.get('user/v1/admin/pot/claim/analytics').then(res => res.data));
}

/**
 * 
 * @returns Pie chart data
 */
export function getPiechart() {
  return (axiosInstance.get('user/v1/admin/get/user/piechart').then(res => res.data))
}

/**
 * 
 * @param data Object | Pot Type
 * @returns 
 */
export function getBarChart(data) {
  return (axiosInstance.get('user/v1/admin/get/user/barchart',{params: data}).then(res => res.data))
}