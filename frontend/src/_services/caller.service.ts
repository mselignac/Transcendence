import axios from 'axios'
import { accountService } from './account.service'

const { VITE_APP_BACKEND_PORT: port, VITE_APP_HOST: host } = await import.meta.env;

const Axios = axios.create({
    baseURL: `http://${host}:${port}`
})

const Axios2fa = axios.create({
    baseURL: `http://${host}:${port}`
})

Axios2fa.interceptors.request.use(request => {
    let token = accountService.getToken("2faToken")

    if (token) {
        request.headers.Authorization = 'Bearer ' + token
    }

    return request
})

Axios.interceptors.request.use(request => {

    let token = accountService.getToken("token")

    if (token) {
        request.headers.Authorization = 'Bearer ' + token
    }

    return request
})

export { Axios, Axios2fa }
