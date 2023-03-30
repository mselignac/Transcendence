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
    <div className="stat_div">
        <div className="stats_left">
            <div className="game_history_test">
                <RouterLink to="game-history" className="game_history_button_test">Game history</RouterLink>
            </div>
            <div className="lvl_test">
                <RouterLink to="ladder" className="game_history_button_test">Ladder lvl X</RouterLink>
            </div>
        </div>
        <div className="stats_right">
            <div className="stats_right_top">
                <h1>Achievements</h1>
            </div>
        </div>
    </div>
  </div>

</template>