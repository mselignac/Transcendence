// import router from '@/router'

// export function authGuard(){
//     // let token = localStorage.getItem('token')

//     // let token = Cookies.isKey('jwt')
//     // let token = Cookies.get('jwt')   


//     console.log('authguard')



//     // A CHANGER////////////////////////////
//     ////////////////////////////////////////
//     let token = true
//     ////////////////////////////////////////
//     ////////////////////////////////////////



//     if(token){
//         return true
//     }

//     router.push('/')
// }

import router from '@/router'
import { accountService } from '@/_services'
import Cookies from 'js-cookie';

export function authGuard(){
	accountService.saveToken(Cookies.get('jwt'));
    let token = localStorage.getItem('token')

    console.log('authGuard')
    if(token != null && token != "undefined" && token != ""){
        return true
    }
    router.push('/')
}

export function authGuardTest(){
    let token = localStorage.getItem('token')

    console.log('authGuardTest')
    if(token != null && token != "undefined" && token != ""){
        router.push('/main-page')
        return true
    }
}
