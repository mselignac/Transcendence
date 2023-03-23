<script>
export default {
    data() {
        return {
            msg: 'Login',
            count: 0,
            titleClass: 'title',
        }
    }
}
</script>

<template>
  <div className="log_div">
    <!-- <h1 :class="titleClass" @click="count++">{{count}}</h1> -->
    <!-- <button className="button_test" @click="count++">{{msg}} {{ count }}</button> -->
    <div className="log_id_div">
      <input className="button_user_log" v-model="text" placeholder='Username'>
      <input className="button_user_log" v-model="text" placeholder="Password">
    </div>
    <div className="login_div">
      <!-- <button className="button_login_log" >Login</button> -->
      <RouterLink to="/main-page" className="button_login_log">{{ msg }}</RouterLink>
    </div>
  </div>
    <!-- <div className="btn-div">
      <button className="buttonClass" @click="count++">{{ count }}</button>
    </div> -->

</template>




<!-- 

<script>
export default {
  // register child component
}
</script>

<template>
  // render child component
</template> -->