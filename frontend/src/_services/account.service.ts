import Axios from './caller.service'
import { RoomChannelDto } from './room.channel.dto';
import { RoomDto } from './room.dto';
import { MessageDto } from './messages.dto';

let login = () => {
    return Axios.get('/auth/42/login')
}

let usersMe = () => {
    return Axios.get('/users/me')
}

let updateUsername = (username: string) => {
    return Axios.patch('/users/username', { username })
}

let createRoom = (dto: RoomDto) => {
    return Axios.post('/chat/createroom', dto)
}

let findRoom = (dto: RoomDto) => {
    console.log('findroom')
    console.log(dto)
    return Axios.post('/chat/findroom', dto)
}

let createRoomChannel = (dto: RoomChannelDto) => {
    return Axios.post('/chat/createroomchannel', dto)
}

let findRoomChannel = (dto: RoomChannelDto) => {
    console.log('findroom')
    console.log(dto)
    return Axios.post('/chat/findroomchannel', dto)
}

let editChannel = (dto: RoomChannelDto) => {
    console.log('edit', dto)
    return Axios.post('/chat/editchannel', dto)
}

let addFriend = (dto: RoomChannelDto) => {
    console.log(dto)
    console.log('ca marche add friend')
    return Axios.post('/users/addfriend', dto)
}

let addChannel = (dto: RoomChannelDto) => {
    console.log(dto)
    console.log('ca marche add friend')
    return Axios.post('/users/addchannel', dto)
}

let addMessage = (dto: MessageDto) => {
    console.log(dto)
    return Axios.post('/chat/addmessage', dto)
}

let getMsg = (room: String) => {
    // return Axios.get('/chat/getmsg', room)
    return Axios.get('/chat/getmsg', { params: { room } })
}

let addMessageChannel = (dto: MessageDto) => {
    console.log(dto)
    return Axios.post('/chat/addmsgchannel', dto)
}

let getMsgChannel = (room: String) => {
    // return Axios.get('/chat/getmsg', room)
    return Axios.get('/chat/getmsgchannel', { params: { room } })
}

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
    findRoom,
    createRoomChannel,
    findRoomChannel,
    editChannel,
    addFriend,
    addChannel,
    addMessage,
    getMsg,
    addMessageChannel,
    getMsgChannel,
    updateUsername
    // getCookie
}
