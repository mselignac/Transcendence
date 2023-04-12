import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import Login from './components/Login.vue'
// import Log from './components/Log.vue'
// import GameMode from './components/GameMode.vue'
// import Page from './components/MainPage.vue'
// import Chat from './components/Chat.vue'
// import Profile from './components/Profile.vue'

import './assets/main.css'
import './assets/login.css'
import './assets/log.css'
import './assets/gamemode.css'
import './assets/main_page.css'
import './assets/chat.css'
import './assets/profile.css'

const app = createApp(App)
app.use(router)
router.isReady().then(() => {
    app.mount('#app')
})

// createApp(App).mount('#app')
// createApp(Login).mount('#login')
// createApp(Log).mount('#log')
// createApp(GameMode).mount('#game_mode')
// createApp(Page).mount('#main_page')
// createApp(Chat).mount('#chat')
// createApp(Profile).mount('#profile')
