import { createRouter, createWebHistory } from '../../node_modules/vue-router'
import Log from '../components/Log.vue'
import MainPage from '../components/MainPage.vue'
import GameMode from '../components/GameMode.vue'
import Chat from '../components/Chat.vue'
import Profile from '../components/Profile.vue'
import Login from '../components/Login.vue'
import Mode from '../components/ModeTest.vue'
import App from '../App.vue'
import Stats from '../components/Stats.vue'
import GameHistory from '../components/GameHistory.vue'
import Ladder from '../components/Ladder.vue'
import Achievements from '../components/Achievements.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', component: Login},
    {path: '/login', component: Log},
    {path: '/main-page', component: MainPage},
    {path: '/game-mode', component: GameMode},
    {path: '/chat', component: Chat},
    {path: '/profile', component: Profile},
    {path: '/stats', component: Stats},
    {path: '/mode', component: Mode},
    {path: '/game-history', component: GameHistory},
    {path: '/ladder', component: Ladder},
    {path: '/achievements', component: Achievements},
  ]
})

export default router
