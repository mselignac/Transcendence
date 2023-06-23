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
let tRoomId = ref(null);
let inGame = ref(false);
let appExist = ref(true);

export default {
	methods: {
		playRequestClassic(mode: string) {
			if (isWaiting.value === false) {
				socket.emit("playRequest", {username: actualUsername.value});
				isWaiting.value = true;
			}
		},

		leaveQueue(mode: string) {
			if (isWaiting.value === true) {
				socket.emit("leaveWaiting", {username: actualUsername.value});
				isWaiting.value = false;
			}
		},

		play() {
			socket.emit("play", {roomId: tRoomId.value, username: actualUsername.value});
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
	tRoomId.value = data.roomId;
	console.log("room id", tRoomId.value);
	isWaiting.value = false;
	inGame.value = true;
	// router.push({ name: 'play', params: {room: tRoomId.value}});
})

socket.on("reset", (data) => {
	inGame.value = false;
	tRoomId.value = null;
})

</script>

<template>
	<Borders/>
	<div className="main_div">
		<Pong v-if="inGame" :roomid="tRoomId" :appExist="appExist"/>
		<!-- <button v-on:click="this.play()" v-if="inGame" >Ready</button> -->
		<div className="game_mode_div_test" v-if="!inGame">
			<div className="game_mode_one_div" v-if="!inGame">
				<button @click="this.playRequestClassic()" v-if="!inGame" className="modes_routers">Classic</button>
				<button @click="this.leaveQueue()" v-if="!inGame" className="modes_routers">Leave queue</button>
			</div>
			<div className="game_mode_two_div" v-if="!inGame">
				<RouterLink to="mode" className="modes_routers" >Mode 2</RouterLink>
			</div>
			<div className="game_mode_three_div" v-if="!inGame">
				<RouterLink to="mode" className="modes_routers" >Mode 3</RouterLink>
			</div>
		</div>
	</div>
</template>
