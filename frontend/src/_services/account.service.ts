import Axios from './caller.service'
import { RoomChannelDto } from './room.channel.dto';
import { RoomDto } from './room.dto';
import { MessageDto } from './messages.dto';

////////////////////////////////////////////////////////
//                        USERS                       //
////////////////////////////////////////////////////////
let login = () => {
    return Axios.get('/auth/42/login')
}

let usersMe = () => {
    return Axios.get('/users/me')
}

let updateUsername = (username: string) => {
    return Axios.patch('/users/username', { username })
}

let findUser = (dto: RoomDto) => {
    return Axios.get('/chat/finduser', { params: { dto }})
}

let getUserId = (dto: object) => {
    return Axios.get('/chat/getuserid', { params: { dto }})
}



////////////////////////////////////////////////////////
//                        ROOMS                       //
////////////////////////////////////////////////////////
let createRoom = (dto: RoomDto) => {
    return Axios.post('/chat/createroom', dto)
}

let findRoom = (dto: RoomDto) => {
    return Axios.post('/chat/findroom', dto)
}

let createRoomChannel = (dto: RoomChannelDto) => {
    return Axios.post('/chat/createroomchannel', dto)
}

// let findRoomChannel = (dto: RoomChannelDto) => {
//     return Axios.post('/chat/findroomchannel', dto)
// }

let findRoomChannel = (dto: object) => {
    return Axios.post('/chat/findroomchannel', dto)
}


let editChannel = (dto: RoomChannelDto) => {
    return Axios.post('/chat/editchannel', dto)
}



////////////////////////////////////////////////////////
//                  CHANNELS/FRIENDS                  //
////////////////////////////////////////////////////////
let addFriend = (dto: RoomChannelDto) => {
    return Axios.post('/users/addfriend', dto)
}

let addChannel = (dto: RoomChannelDto) => {
    return Axios.post('/users/addchannel', dto)
}

let removeFriend = (dto: object) => {
    return Axios.post('/users/removefriend', dto)
}

let removeChannel = (dto: object) => {
    return Axios.post('/users/removechannel', dto)
}

let publicsChannels = () => {
    return Axios.get('/chat/publicschannels')
}

let sendFriendRequest = (dto: object) => {
    return Axios.post('/chat/friendsrequests', dto)
}

let removeRequest = (dto: object) => {
    return Axios.post('/chat/removerequest', dto)
}




////////////////////////////////////////////////////////
//                      MESSAGES                      //
////////////////////////////////////////////////////////
let addMessage = (dto: MessageDto) => {
    return Axios.post('/chat/addmessage', dto)
}

let getMsg = (room: String) => {
    return Axios.get('/chat/getmsg', { params: { room } })
}

let addMessageChannel = (dto: MessageDto) => {
    return Axios.post('/chat/addmsgchannel', dto)
}

let getMsgChannel = (room: String) => {
    return Axios.get('/chat/getmsgchannel', { params: { room } })
}



////////////////////////////////////////////////////////
//                       TOKENS                       //
////////////////////////////////////////////////////////
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
    updateUsername,
    findUser,
    removeFriend,
    removeChannel,
    getUserId,
    publicsChannels,
    sendFriendRequest,
    removeRequest
}
