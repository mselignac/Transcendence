import router from '@/router'

export function authGuard(to){
    let token = localStorage.getItem('token')
    // token = true

    if(token){
        return true
    }

    router.push('/main-page')
}
