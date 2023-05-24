import router from '@/router'
import { accountService } from '@/_services'
import Cookies from 'js-cookie';

export function authGuard(){
	accountService.saveToken(Cookies.get('jwt'));
    let token = localStorage.getItem('token')

    if(token != null && token != "undefined" && token != ""){
        return true
    }
    router.push('/')
}

export async function authGuardTest(){
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
