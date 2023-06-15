// import { createRouter, createWebHistory } from '../../node_modules/vue-router'
// import Login42 from '../components/Login42.vue'
// import MainPage from '../components/MainPage.vue'
// import GameMode from '../components/GameMode.vue'
// import Chat from '../components/Chat.vue'
// import Profile from '../components/Profile.vue'
// import App from '../App.vue'
// import Pong from '../components/Pong.vue'
// import Login from '../components/Login.vue'
// import Mode from '../components/ModeTest.vue'
// import Stats from '../components/Stats.vue'
// import GameHistory from '../components/GameHistory.vue'
// import Ladder from '../components/Ladder.vue'
// // import Achievements from '../components/Achievements.vue'
// import NotFound from '../components/NotFound.vue'
// import ProfileUser from '../components/ProfileUser.vue'
// import { authGuard } from '../_helper/auth-guard'
// import Infos from '../components/InfosChannel.vue'
// import Channel from '../components/Channel.vue'


// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     { path: '/', name: 'test', component: Login },
//     { path: '/login', component: Login42 },
//     { path: '/main-page', name: 'main-page', component: MainPage },
//     { path: '/game-mode', name: 'game-mode',component: GameMode },
//     { path: '/chat/:idchat', name: 'chat',component: Chat, props: true },
//     { path: '/profile', name: 'profile',component: Profile },
//     { path: '/profile-user/:id', name: 'profile-user',component: ProfileUser, props: true },
//     { path: '/stats', name: 'stats',component: Stats },
//     { path: '/mode', name: 'mode',component: Mode },
//     { path: '/game-history', name: 'game-history',component: GameHistory },
//     { path: '/ladder', name: 'ladder',component: Ladder },
//     // { path: '/achievements', name: 'achievements',component: Achievements },
//     { path: '/infos/:idchannel', name: 'infos',component: Infos , props: true},
//     { path: '/:pathMatch(.*)*', name: 'error',component: NotFound },
//     { path: '/pong', name: 'pong',component: Pong },
//     { path: '/channel/:idchannel', name: 'channel', component: Channel, props: true }
//   ]
// })



// router.beforeEach((to, from, next) => {
//   // const teeee: tamere = to.matched[0]
//   if(to.matched[0].name != 'test' && to.matched[0].name != 'login' && to.matched[0].name != 'error'

//       // to.matched[0].name ==  'main-page' ||
//       // to.matched[0].name == 'game-mode' ||
//       // to.matched[0].name == 'chat' ||
//       // to.matched[0].name == 'profile' ||
//       // to.matched[0].name == 'profile-user' ||
//       // to.matched[0].name == 'stats' ||
//       // to.matched[0].name == 'mode' ||
//       // to.matched[0].name == 'game-history' ||
//       // to.matched[0].name == 'ladder' ||
//       // to.matched[0].name == 'pong'
//       ){
//     authGuard()
//   }
//   next()
// })

// export default router


// (\\d+)?       -> props

import { createRouter, createWebHistory } from '../../node_modules/vue-router'
import Login42 from '../components/Login42.vue'
import MainPage from '../components/MainPage.vue'
import GameMode from '../components/GameMode.vue'
import Chat from '../components/Chat.vue'
import Profile from '../components/Profile.vue'
import App from '../App.vue'
import Pong from '../components/Pong.vue'
import GamePage from '../components/GamePage.vue'
import Login from '../components/Login.vue'
import Mode from '../components/ModeTest.vue'
import Stats from '../components/Stats.vue'
import GameHistory from '../components/GameHistory.vue'
import Ladder from '../components/Ladder.vue'
import NotFound from '../components/NotFound.vue'
import ProfileUser from '../components/ProfileUser.vue'
import { authGuard, authGuardTest } from '../_helper/auth-guard'
import Infos from '../components/InfosChannel.vue'
import Channel from '../components/Channel.vue'
import List from '../components/ListChannels.vue'
import FriendsRequests from '../components/FriendsRequest.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Login },
    { path: '/login', name: 'login', component: Login42 },
    { path: '/main-page', component: MainPage },
    { path: '/game-mode', component: GameMode },
    { path: '/chat/:idchat', component: Chat, props: true },
    { path: '/profile', component: Profile },
    { path: '/profile-user/:id', component: ProfileUser, props: true },
    { path: '/stats', component: Stats },
    { path: '/mode', component: Mode },
    { path: '/game-history', component: GameHistory },
    { path: '/ladder', component: Ladder },
    { path: '/infos/:idchannel', component: Infos , props: true},
    { path: '/:pathMatch(.*)*', name: 'error', component: NotFound },
    { path: '/pong', component: Pong },
    { path: '/list-channels', component: List },
    { path: '/channel/:idchannel', name: 'channel', component: Channel, props: true },
    { path: '/friend-request', component: FriendsRequests },
    { path: '/play', component: GamePage},
  ]
})

router.beforeEach((to, from, next) => {

  if(to.matched[0].name != 'login' && to.matched[0].name != 'home'
    && to.matched[0].name != 'error') {
    authGuard()
  }
  if (to.matched[0].name == 'home' && to.matched[0].name == 'choose-username')
    authGuardTest()
  next()
})

export default router
