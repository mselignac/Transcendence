import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faMagnifyingGlass, faUser, faUsers, faHouse, faGamepad, faChartSimple, faComment, faGear } from '@fortawesome/free-solid-svg-icons'
import { faFaceLaughBeam, faCircleUser} from '@fortawesome/free-regular-svg-icons'
import router from './router'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/main.css'
import './assets/login.css'
import './assets/log.css'
import './assets/gamemode.css'
import './assets/main_page.css'
import './assets/chat.css'
import './assets/profile.css'
import './assets/border.css'
import './assets/stats.css'
import './assets/stat.css'

/* add each imported icon to the library */
library.add(faUserSecret, faFaceLaughBeam, faCircleUser, faMagnifyingGlass, faUser, faUsers, faHouse, faGamepad, faChartSimple, faComment, faGear)

const app = createApp(App)
app.use(router, VueAxios, axios)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
