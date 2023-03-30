<script>
export default {
    data() {
        return {
            log: true
        }
    },
    methods: {
      toggle() {
        this.log = !this.log
      }
    }
}
</script>

<template>
  <!-- <div className="test_div"> -->
      <!-- <RouterLink to="/login" className="button_test" v-if="log">Login</RouterLink>
      <RouterView/> -->



    <div className="test_div">
      <RouterLink to="/login" className="button_test" @click="toggle" v-if="log">Login</RouterLink>
    </div>
    <RouterView/>
    <!-- <button className="button_test">{{ msg }}</button> -->



    <!-- <RouterLink to="/log" className="button_test">Login</RouterLink>
    <RouterView /> -->
  <!-- </div> -->

</template>
