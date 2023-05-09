import Axios from './caller.service'
// import { RoomDto } from '../../../backend/src/chat/room.dto'
import { RoomDto } from './room.dto';

let login = () => {
    return Axios.get('/auth/42/login')
}

let usersMe = () => {
    return Axios.get('/users/me')
}

let createRoom = (dto: RoomDto) => {
    return Axios.post('/chat/createroom', dto)
}

let findRoom = (dto: RoomDto) => {
    console.log('findroom')
    console.log(dto)
    return Axios.post('/chat/findroom', dto)
}

// let getCookie  = () => {
//     return Axios.get('auth/cookiejwt')
// }

let logout = () => {
    localStorage.removeItem('token')
}

let getToken = () => {
    return localStorage.getItem('token')
}

let saveToken = (token: string) => {
    localStorage.setItem('token', token)
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token  //transforme une variable (ici: string) en booleen (si vide -> false, sinon true)
}

export const accountService = {
    login,
    logout,
    saveToken,
    getToken,
    isLogged,
    usersMe,
    createRoom,
    findRoom
    // getCookie
}
