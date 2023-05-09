import Axios from './caller.service'

let login = () => {
    return Axios.get('/auth/42/login')
}

let usersMe = () => {
    // return Axios.get('/users/me')
}

let getCookie = () => {
    return Axios.get('/auth/cookiejwt')
}

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
    getCookie
}
