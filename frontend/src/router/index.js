import { createRouter, createWebHistory } from '../../node_modules/vue-router'
import Log from '../components/Log.vue'
import MainPage from '../components/MainPage.vue'
import GameMode from '../components/GameMode.vue'
import Chat from '../components/Chat.vue'
import Profile from '../components/Profile.vue'
import App from '../App.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {path: '/', component: App},
    {path: '/login', component: Log},
    {path: '/main-page', component: MainPage},
    {path: '/game-mode', component: GameMode},
    {path: '/chat', component: Chat},
    {path: '/profile', component: Profile},
  ]
})

export default router
