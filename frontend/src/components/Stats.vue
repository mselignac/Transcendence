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
        <div className="stats_div">
            <div className="stats_one_div">
                <RouterLink to="game-history" className="stats_routers">Game history</RouterLink>
            </div>
            <div className="stats_two_div">
                <RouterLink to="ladder" className="stats_routers">Ladder lvl X</RouterLink>
            </div>
            <!-- <div className="stats_three_div">
                <RouterLink to="achievements" className="stats_routers">Achievements</RouterLink>
            </div> -->
        </div>
    </div>
</template>
