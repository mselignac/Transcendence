<script setup lang="ts">
import { accountService } from '@/_services';
import Borders from './Borders.vue'
import router from '@/router';
import Cookies from 'js-cookie';
</script>

<script lang="ts">
export default {
    data() {
        return {
            popup: false,
            login: '',
            twofactor: false,
            popup2fa: false,
            msg: '',
            validate: localStorage.getItem('validate') ? true : false
        }
    },

    methods: {
      async change_popup() {
        await accountService.updateUsername(this.login)
        this.popup = !this.popup
        this.login = ''
        router.go()
      },

      async change_popup2fa() {
        await accountService.authenticate(this.msg)
        .then(() => {
          this.popup2fa = !this.popup2fa,
          localStorage.setItem('validate', 'true'),
          this.msg = ''
        })
        .catch(res => console.log(res))
      }
    },

    async created() {
      await accountService.usersMe()
        .then(res => {
          this.login = res.data.login,
          this.twofactor = res.data.twofactor
        })
        .catch(res => {
          accountService.logout(),
          console.log(res)
        })

        if (!this.login)
          this.popup = true

        if (this.twofactor == true && this.validate == false)
        {
          accountService.save2FaToken(Cookies.get('2fajwt')),
          this.popup2fa = true
        }
    }
}

</script>

<template>
    <Borders/>
    <div v-if="popup" className="test_popup">
      <div className="test_popup2">
          <form @submit.prevent="change_popup">
            <input pattern="[a-zA-Z]+" title="only letters accepted" v-model="login" placeholder='set login' :maxlength="9">
          </form>
      </div>
    </div>

    <div v-if="popup2fa" className="test_popup">
      <div className="test_popup2">
          <form @submit.prevent="change_popup2fa">
            <input pattern="[0-9]+" title="only digit" v-model="msg" placeholder='2fa Code' :maxlength="9">
          </form>
      </div>
    </div>
    <div className="main_div">
      <div className="main_page_div">
        <div className="main_page_top">
          <div className="main_page_top_left">
            <RouterLink to="/stats" className="main_page_stats">Stats</RouterLink>
          </div>
          <div className="main_page_top_right">
            <RouterLink to="/list-channels" className="main_page_chat">Chat</RouterLink>
          </div>
        </div>
        <div className="main_page_bottom">
          <RouterLink to="/game-mode" className="main_page_play">PLAY</RouterLink>
        </div>
      </div>
    </div>

</template>
