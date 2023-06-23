<script setup lang="ts">
import Borders from './Borders.vue'
import { accountService } from '@/_services';
import router from '@/router';
</script>

<script lang="ts">
export default {
    props: ['id'],
    data() {
        return {
            ladder: ''
        }
    },
    methods: {
        async goHistory() {
            await router.push('/game-history/' + this.id)
            router.go()

        }
    },
    async created() {
        await accountService.ladder()
        .then(res => this.ladder = res.data )
    }
}
</script>



<template>
  <Borders/>
  <div className="main_div">
    <div className="stat_div">
        <div className="stats_left">
            <div className="game_history_test">
                <button @click="goHistory()" className="game_history_button_test">Game history</button>
            </div>
        </div>

        <div className="stats_right">
            <div className="stats_right_top">
                <h1>Ladder</h1>
            </div>
            <div className="stats_right_bottom">
                <li v-for="user in ladder">
                    <div className="ladder_element" v-if="user.login != id">
                        <h1 v-if="user.victory != 0 && ladder[0] == user" className="login_ladder"><font-awesome-icon icon="fa-solid fa-crown" /></h1>
                        <h1 className="login_ladder">{{ user.login }}</h1>
                        <h1 className="login_ladder">victories: {{ user.victory }}</h1>
                    </div>
                    <div className="ladder_me_element" v-else>
                        <h1 v-if="user.victory != 0 && ladder[0] == user" className="login_ladder"><font-awesome-icon icon="fa-solid fa-crown" /></h1>
                        <h1 className="me_ladder">{{ user.login }}</h1>
                        <h1 className="me_ladder">victories: {{ user.victory }}</h1>
                    </div>
                </li>
            </div>
        </div>

    </div>
  </div>

</template>
