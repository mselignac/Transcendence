import axios from 'axios'
import { accountService } from './account.service'

const Axios = axios.create({
    baseURL: 'http://10.11.8.8:3000'
})

Axios.interceptors.request.use(request => {
    console.log(request)

    // request.headers.Access_Control_Allow_Origin = 'http://10.11.8.8:8080'
    let token = accountService.getToken()

    if (token) {
        request.headers.Authorization = 'Bearer '+ token
    }

    return request
})

export default Axios
