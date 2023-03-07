import { axiosInstance } from '../Interceptor';

export function AddRewardPot(data) {
  return (axiosInstance.post('/pot/v1/admin/create/reward/pot', data).then(res => res.data));
}
  
export function getAllRewardPot() {
  return (axiosInstance.get('/pot/v1/admin/getall/reward/pot').then(res => res.data));
}
export function getUpcomingRewardPot() {
  return (axiosInstance.get('/pot/v1/admin/upcoming/reward/pot').then(res => res.data));
}
export function getArchivesRewardPot() {
  return (axiosInstance.get('/pot/v1/admin/upcoming/reward/pot').then(res => res.data));
}
export function getRewardPotById(data) {
  return (axiosInstance.get('/pot/v1/admin/getbyid/reward/pot',{params: data}).then(res => res.data));
}

export function updateRewardPotDetail(data) {
  return (axiosInstance.patch('/pot/v1/admin/update/reward/pot',data).then(res => res.data));
}

export function updateRewardPotStatus(data) {
  return (axiosInstance.patch('/pot/v1/admin/reward/pot/status',data).then(res => res.data));
}