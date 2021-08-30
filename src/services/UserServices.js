import { baseServices } from './baseServices'

export class UserServices extends baseServices{
  constructor(){
    super()
  }
  signInUser = (user) => {
    return this.post(`Users/signin`,user);
  }
  signUpUser = (user) => {
    return this.post(`Users/signup`,user);
  }
  getListUser = () => {
    return this.get(`Users/getUser`)
  }
  deleteUser = (iduser) => {
    return this.delete(`Users/deleteUser?id=${iduser}`)
  }
  getUserDetail = (iduser) => {
    return this.get(`Users/getUser?keyword=${iduser}`)
  }
  editUser = (user) => {
    return this.put(`Users/editUser`,user)
  }
  getListUserSearch = (keyword) => {
    return this.get(`Users/getUser?keyword=${keyword}`)
  }
}

export const userServices = new UserServices();