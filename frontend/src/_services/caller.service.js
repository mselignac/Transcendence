import axios from 'axios'
import { accountService } from './account.service'

const Axios = axios.create({
    baseURL: 'http://localhost:3001'
})

Axios.interceptors.request.use(request => {
    console.log(request)

    let token = accountService.getToken()

    if (token) {
        request.headers.Authorization = 'Bearer '+token
    }

    return request
})

export default Axios
