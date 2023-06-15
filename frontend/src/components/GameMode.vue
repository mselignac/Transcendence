<script setup lang="ts">
import { PlaneGeometry } from 'pixi.js';
import Borders from './Borders.vue'
import Pong from './Pong.vue'
import $socket from '../plugin/socket';
import {ref} from 'vue';
import { io } from "socket.io-client";
import { accountService } from '../_services/account.service'
import router from '../router';
</script>

<script lang="ts">
let socket = $socket;
let actualUsername = ref(false);
let isWaiting = ref(false);
let leftUsername = ref(false);
let rightUsername = ref(false);
let tRoomId = ref(null);
let side = ref(false);
let leftReady = ref(false);
let rightReady = ref(false);


export default {
	methods: {
		playRequestClassic(mode: string) {
			if (isWaiting.value == false) {
				socket.emit("playRequest", {username: actualUsername.value});
				isWaiting.value = true;
			}
		},
	},

	async created() {
	await accountService.usersMe()
	.then((response) => {
		actualUsername.value = response.data.login
	})
},
}
/*
RECEIVE MESSAGE FROM BACKEND
*/

socket.on('roomAssigned', (data) => {
	leftUsername.value = data.leftUsername;
	rightUsername.value = data.rightUsername;

	tRoomId.value = data.roomId;

	if (data.isLeft)
		side.value = "left";
	else
		side.value = "right";
	router.push({ path: '/play'});
})

</script>

<template>
	<Borders/>
	<div className="main_div">
		<div className="game_mode_div_test">
			<div className="game_mode_one_div">
				<button v-on:click="this.playRequestClassic()" className="modes_routers">Classic</button>
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
