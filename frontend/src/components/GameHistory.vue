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
            <div className="lvl_test">
                <RouterLink to="ladder" className="game_history_button_test">Ladder lvl X</RouterLink>
            </div>
            <div className="game_history_test">
                <RouterLink to="achievements" className="game_history_button_test">Achievements</RouterLink>
            </div>
        </div>
        <div className="stats_right">
            <div className="stats_right_top">
                <h1>Game history</h1>
            </div>
        </div>
    </div>

  </div>

</template>





    <!-- <div className="user_div_test">
        <div className="user_left">
            <div className="user_left_top">
                <h1>Username</h1>
                <h1>+</h1>
                <h1>photo profile</h1>
            </div>
            <div className="user_left_other">
                <div className="game_history">
                    <button className="game_history_button">Game history</button>
                </div>
                <div className="lvl">
                    <button className="game_history_button">Ladder lvl X</button>
                </div>
                <div className="achievements">
                    <button className="game_history_button">Achievements</button>
                </div>
            </div>
        </div>
        <div className="user_right">
            <div className="user_right_title">
                <h1 className="bold_only">Game history</h1>
            </div>
            <div className="game_history_div">
              <div className="player_left">
                <h1 className="players">username</h1>
                <h1 className="players">username</h1>
                <h1 className="players">username</h1>
                <h1 className="players">username</h1>
              </div>
              <div className="game_history_vs">
                <h1 className="vs">vs</h1>
                <h1 className="vs">vs</h1>
                <h1 className="vs">vs</h1>
                <h1 className="vs">vs</h1>
              </div>
              <div className="player_right">
                <h1 className="players">username</h1>
                <h1 className="players">username</h1>
                <h1 className="players">username</h1>
                <h1 className="players">username</h1>
              </div>
              <div className="score">
                <h1 className="players">score</h1>
                <h1 className="players">score</h1>
                <h1 className="players">score</h1>
                <h1 className="players">score</h1>
              </div>
              <div className="victory">
                <h1 className="players">victoire/defaite</h1>
                <h1 className="players">victoire/defaite</h1>
                <h1 className="players">victoire/defaite</h1>
                <h1 className="players">victoire/defaite</h1>
              </div>
            </div>
        </div>
    </div> -->