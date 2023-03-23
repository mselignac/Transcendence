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
  <div className="game_div">
    <Borders/>
    <!-- <div className="top">
      <button className="top_button">Home</button>
      <RouterLink to="/game-mode" className="top_button">Game Mode</RouterLink>
    </div> -->
    <div className="play_main">
      <RouterLink to="/game-mode" className="play_button">PLAY</RouterLink>
      <!-- <button className="play_button">PLAY</button> -->
    </div>
  </div>

</template>
