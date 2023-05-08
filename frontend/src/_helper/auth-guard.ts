import router from '@/router'

export function authGuard(){
    // let token = localStorage.getItem('token')

    // let token = Cookies.isKey('jwt')
    // let token = Cookies.get('jwt')   


    console.log('authguard')



    // A CHANGER////////////////////////////
    ////////////////////////////////////////
    let token = true
    ////////////////////////////////////////
    ////////////////////////////////////////



    if(token){
        return true
    }

    router.push('/')
}
