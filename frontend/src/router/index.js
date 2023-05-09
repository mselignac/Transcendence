import { createRouter, createWebHistory } from '../../node_modules/vue-router'
import Login42 from '../components/Login42.vue'
import MainPage from '../components/MainPage.vue'
import GameMode from '../components/GameMode.vue'
import Chat from '../components/Chat.vue'
import Profile from '../components/Profile.vue'
import App from '../App.vue'
import Pong from '../components/Pong.vue'
import Login from '../components/Login.vue'
import Mode from '../components/ModeTest.vue'
import Stats from '../components/Stats.vue'
import GameHistory from '../components/GameHistory.vue'
import Ladder from '../components/Ladder.vue'
import Achievements from '../components/Achievements.vue'
import NotFound from '../components/NotFound.vue'
import ProfileUser from '../components/ProfileUser.vue'
import { authGuard, authGuardTest } from '../_helper/auth-guard'
import Infos from '../components/InfosChannel.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Login },
    { path: '/login', name: 'login', component: Login42 },
    { path: '/main-page', component: MainPage },
    { path: '/game-mode', component: GameMode },
    { path: '/chat/:id', component: Chat, props: true },
    { path: '/profile', component: Profile },
    { path: '/profile-user/:id', component: ProfileUser, props: true },
    { path: '/stats', component: Stats },
    { path: '/mode', component: Mode },
    { path: '/game-history', component: GameHistory },
    { path: '/ladder', component: Ladder },
    { path: '/achievements', component: Achievements },
    { path: '/infos/:id', component: Infos , props: true},
    { path: '/:pathMatch(.*)*', name: 'error', component: NotFound },
    { path: '/pong', component: Pong },
  ]
})

router.beforeEach((to, from, next) => {

  if(to.matched[0].name != 'login' && to.matched[0].name != 'home'
    && to.matched[0].name != 'error') {
    authGuard()
  }
  if (to.matched[0].name == 'home')
    authGuardTest()
  next()
})

export default router
