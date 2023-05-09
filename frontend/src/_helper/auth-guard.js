import router from '@/router'
import { accountService } from '@/_services'
import Cookies from 'js-cookie';

export function authGuard(to){
	accountService.saveToken(Cookies.get('jwt'));
    let token = localStorage.getItem('token')

    if(token != null && token != "undefined" && token != ""){
        return true
    }
    router.push('/')
}

export function authGuardTest(to){
    let token = localStorage.getItem('token')

    if(token != null && token != "undefined" && token != ""){
        router.push('/main-page')
        return true
    }
}
