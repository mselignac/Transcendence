<script setup lang="ts">
import { accountService } from '@/_services';
import Borders from './Borders.vue'
import router from '@/router';
</script>

<script lang="ts">
export default {
    props: ['id'],
    data() {
        return {
            msg: 'test log',
            count: 0,
            titleClass: 'title',
            username: this.id,
            games: '',
            games2: ''
        }
    },
    methods: {
        async goLadder() {
            await router.push('/ladder/' + this.id)
            router.go()

        }
    },
    async created() {
        await accountService.getGame({ user_one: this.id })
        .then(res => this.games = res.data )

        await accountService.getGame2({ user_one: this.id })
        .then(res => this.games2 = res.data )

        // console.log(this.games)
    }
}
</script>

<template>
  <Borders/>
  <div className="main_div">
    <div className="stat_div">
        <div className="stats_left">
            <div className="game_history_test">
                <button @click="goLadder()" className="game_history_button_test">Ladder</button>
            </div>
        </div>
        <div className="stats_right">
            <div className="stats_right_top">
                <h1>Game history</h1>
            </div>
            <div className="game_history_div">
                <div className="user_left">
                    <li v-for="game in games">
                        <h1  className="game_history_element">{{ game.user_one }}</h1>
                    </li>
                    <li v-for="game in games2">
                        <h1  className="game_history_element">{{ game.user_one }}</h1>
                    </li>
                </div>
                <div className="vs">
                    <li v-for="game in games">
                        <h1  className="vs_element">VS</h1>
                    </li>
                    <li v-for="game in games2">
                        <h1  className="vs_element">VS</h1>
                    </li>
                </div>
                <div className="user_right">
                    <li v-for="game in games">
                        <h1  className="game_history_element">{{ game.user_two }}</h1>
                    </li>
                    <li v-for="game in games2">
                        <h1  className="game_history_element">{{ game.user_two }}</h1>
                    </li>
                </div>
                <div className="score">
                    <li v-for="game in games">
                        <h1  className="game_history_element">{{ game.score_one }} / {{ game.score_two }}</h1>
                    </li>
                    <li v-for="game in games2">
                        <h1  className="game_history_element">{{ game.score_one }} / {{ game.score_two }}</h1>
                    </li>
                </div>
                <div className="victory">
                    <li v-for="game in games">
                        <h1  className="game_history_element">{{ game.victory }}</h1>
                    </li>
                    <li v-for="game in games2">
                        <h1  className="game_history_element">{{ game.victory }}</h1>
                    </li>
                </div>
            </div>
        </div>
    </div>

  </div>

</template>
