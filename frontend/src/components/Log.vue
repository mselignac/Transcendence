<script>
export default {
    data() {
        return {
            msg: 'Login',
            text: '',
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

</template>
