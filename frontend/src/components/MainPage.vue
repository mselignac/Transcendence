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
      <div className="main_page_div">
        <div className="main_page_top">
          <div className="main_page_top_left">
            <RouterLink to="/stats" className="main_page_stats">Stats</RouterLink>
          </div>
          <div className="main_page_top_right">
            <RouterLink to="/chat" className="main_page_chat">Chat</RouterLink>
          </div>
        </div>
        <div className="main_page_bottom">
          <RouterLink to="/game-mode" className="main_page_play">PLAY</RouterLink>
        </div>
      </div>
    </div>

</template>
