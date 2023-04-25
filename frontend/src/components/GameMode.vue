<script setup>
import Borders from './Borders.vue'
</script>

<script>
export default {
    data() {
        return {
            msg: 'test log',
            count: 0,
            titleClass: 'title',
        }
    }
}
</script>

<template>
  <Borders/>
  <div className="main_div">
    <div className="game_mode_div_test">
      <div className="game_mode_one_div">
        <RouterLink to="mode" className="modes_routers">Mode 1</RouterLink>
      </div>
      <div className="game_mode_two_div">
        <RouterLink to="mode" className="modes_routers" >Mode 2</RouterLink>
      </div>
      <div className="game_mode_three_div">
        <RouterLink to="mode" className="modes_routers" >Mode 3</RouterLink>
      </div>
    </div>
  </div>
</template>
