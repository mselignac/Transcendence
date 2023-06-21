import router from '@/router'
import { accountService } from '@/_services'
import Cookies from 'js-cookie';

export function authGuard() {
	accountService.saveToken(Cookies.get('jwt'));
    let token = localStorage.getItem('token')

    if(token != null && token != "undefined" && token != ""){
        return true
    }
    router.push('/')
}

export async function authGuardUsername() {
    let login;
    await accountService.usersMe()
    .then((res) => {
        login = res.data.login;
    })
    .catch(res => console.log(res))

    if (login != null){
        return true
    }
    router.push('/main-page')
}

export async function authGuard2fa() {
    let twofactor;
    await accountService.usersMe()
    .then((res) => {
        twofactor = res.data.twofactor;
    })
    .catch(res => console.log(res))

    let token = localStorage.getItem('validate')

    if (twofactor == false)
        return true
    else if (token != null && token != "undefined" && token != "" && twofactor == true) {
        return true
    }
    router.push('/main-page')
}
