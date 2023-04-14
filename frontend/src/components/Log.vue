<!-- <script>

import { accountService } from '../_services';

export default {
    data() {
        return {
            msg: 'Login',
            text: '',
            text2: '',
            user: {
              email: '',
              password: ''
            }
        }
    },
    methods: {
      login(){
      }
    }
}
</script>

<template>
  <div className="log_div">
    <div className="log_id_div">
      <input className="button_user_log" v-model="text" placeholder='Username'>
      <input className="button_user_log" v-model="text" placeholder="Password">
    </div>
    <div className="login_div">
      <RouterLink to="/main-page" className="button_login_log">{{ msg }}</RouterLink>
    </div>
  </div>

</template> -->





<template>
  <div>
      <h1>Connexion</h1>
      <form @submit.prevent="login">
          <div class="formGroup">
              <label for="user_email">Email</label>
              <input type="text" id="user_email" v-model="user.login"/>
          </div>
          <div class="formGroup">
              <label for="user_password">Mot de passe</label>
              <input type="text" id="user_password" v-model="user.password"/>
          </div>
          <div class="formGroup">
              <button type="submit" class="button">Connexion</button>
            <!-- <RouterLink to="/main-page" class="button"> Connexion </RouterLink> -->
          </div>
      </form>
  </div>
</template>

<script>
import { accountService } from '@/_services'
export default {
  name: 'Login',
  data(){
      return {
          user: {
              login: '',
              password: ''
          }
      }
  },
  methods: {
      // login(){
      //     accountService.login(this.user)
      //         .then(res => {
      //           console.log(res.data)
      //           accountService.saveToken(res.data.access_token)
      //           this.$router.push( { path: '/main-page' })
      //         })
      //         .catch(err => {
      //           console.log(err)
      //           this.$router.push( { path: '/main-page' })
      //         })
      // }
      login() {
          accountService.usersMe()
              .then(res => {
                console.log(res.data)
                // accountService.saveToken(res.data.access_token)
                this.$router.push( { path: '/main-page' })
              })
              .catch(err => {
                console.log(err)
                this.$router.push( { path: '/main-page' })
              })
      }
  }
}
</script>

<style>
  form{
      max-width: 300px;
      margin: 0 auto;
  }
  .formGroup{
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
  }
</style>
