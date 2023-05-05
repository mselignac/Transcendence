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
    console.log("dto = ")
    console.log(dto)
    console.log(typeof(dto))

    // let tmp: RoomDto {
    //     name: dto.name
    // }
    return Axios.post('/chat/createroom', dto )
    // return Axios.post('/chat/createroom', { params: dto })
    // return Axios.post('/chat/createroom',  { headers: {
    //     name: '1',
    //     user_one: 'salut',
    //     user_two: 'camarchepas'
    //   }})
    // return Axios.post('/chat/createroom', JSON.stringify(dto))
    // return Axios.post('/chat/createroom', JSON.stringify(tmp), {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // });

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

let saveToken = (token) => {
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
    // getCookie
}
