<script setup lang="ts">
    import $socket from '../plugin/socket';
    import * as PIXI from 'pixi.js';
    import {ref} from 'vue';
    import Borders from './Borders.vue';
    import axios from 'axios';
    import { io } from "socket.io-client";
    import { accountService } from '../_services/account.service';
    import Pong from './Pong.vue';
</script>

<script lang="ts">
    let tRoomId = ref(null);

    export default {
        components: {
            Pong
        },
        props: ['room'],

        // created() {
        //     tRoomId.value = this.room;
        //     console.log("Room id ", tRoomId.value);
        // },
    };
</script>

<template>
    <Borders/>
    <div className="main_div">
        <div className="pong_game">
            <Pong :room="this.room"/>
        </div>
    </div>
</template>

<style>

.pong_game {
    width: 100vw;
    height: 100vh;
    align-items: center;
}
</style>