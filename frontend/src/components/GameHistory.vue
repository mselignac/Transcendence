<script setup lang="ts">
import Borders from './Borders.vue'
</script>

<script lang="ts">
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
                <RouterLink to="ladder" className="game_history_button_test">Ladder lvl X</RouterLink>
            </div>
            <!-- <div className="game_history_test">
                <RouterLink to="achievements" className="game_history_button_test">Achievements</RouterLink>
            </div> -->
        </div>
        <div className="stats_right">
            <div className="stats_right_top">
                <h1>Game history</h1>
            </div>
            <div className="game_history_div">
                <div className="user_left">
                    <h1 className="game_history_element">username</h1>
                    <h1 className="game_history_element">username</h1>
                    <h1 className="game_history_element">username</h1>
                    <h1 className="game_history_element">username</h1>
                </div>
                <div className="vs">
                    <h1 className="vs_element">VS</h1>
                    <h1 className="vs_element">VS</h1>
                    <h1 className="vs_element">VS</h1>
                    <h1 className="vs_element">VS</h1>
                </div>
                <div className="user_right">
                    <h1 className="game_history_element">username</h1>
                    <h1 className="game_history_element">username</h1>
                    <h1 className="game_history_element">username</h1>
                    <h1 className="game_history_element">username</h1>
                </div>
                <div className="score">
                    <h1 className="game_history_element">score</h1>
                    <h1 className="game_history_element">score</h1>
                    <h1 className="game_history_element">score</h1>
                    <h1 className="game_history_element">score</h1>
                </div>
                <div className="victory">
                    <h1 className="game_history_element">victory</h1>
                    <h1 className="game_history_element">victory</h1>
                    <h1 className="game_history_element">victory</h1>
                    <h1 className="game_history_element">victory</h1>
                </div>
            </div>
            <h1>(a changer, c'etait juste pour voir le rendu vite fait)</h1>
        </div>
    </div>

  </div>

</template>
