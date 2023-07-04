<script setup lang="ts">
import Borders from './Borders.vue'
import Pong from './Pong.vue'
import $socket from '../plugin/socket';
import { ref } from 'vue';
import { accountService } from '../_services/account.service'
import router from '@/router';

</script>

<script lang="ts">
let socket = $socket;
let actualUsername = ref(false);
let isWaiting = ref(false);
let tRoomId = ref(null);
let inGame = ref(false);
let appExist = ref(true);
let isPlaying = ref(false);

export default {
	methods: {
		playRequestClassic(mode: string) {
			if (isWaiting.value === false) {
				socket.emit("playRequest", {username: actualUsername.value});
				isWaiting.value = true;
			}
		},

		playRequestSpecial(mode: string) {
			if (isWaiting.value === false) {
				socket.emit("specialPlayRequest", {username: actualUsername.value});
				isWaiting.value = true;
			}
		},

		leaveQueue(mode: string) {
			if (isWaiting.value === true) {
				socket.emit("leaveWaiting", {username: actualUsername.value});
				isWaiting.value = false;
			}
		},
		specialLeaveQueue(mode: string) {
			if (isWaiting.value === true) {
				socket.emit("leaveSpecialWaiting", {username: actualUsername.value});
				isWaiting.value = false;
			}
		},

		play() {
			socket.emit("play", {roomId: tRoomId.value, username: actualUsername.value});
		},
	},

	beforeRouteLeave(to: any, from: any, next: any) {
		if (inGame.value === true) {
			socket.emit('leavePage');
			inGame.value = false;
			isWaiting.value = false;
			isPlaying.value = false;
		}
		if (isWaiting.value === true) {
			socket.emit("leaveWaiting", {username: actualUsername.value});
			socket.emit("leaveSpecialWaiting", {username: actualUsername.value});
			isWaiting.value = false;
			inGame.value = false;
			isWaiting.value = false;
			isPlaying.value = false;
		}
   		next();
 	},

	async created() {
	await accountService.usersMe()
	.then((response) => { actualUsername.value = response.data.login })
    .catch (res => console.log(res));	
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
})

socket.on("reset", (data) => {
	isPlaying.value = false;
	inGame.value = false;
	tRoomId.value = null;
	appExist.value = false;
	router.go();
})

socket.on('gameStarted', (data) => {
	isPlaying.value = true;
})

</script>

<template>
	<Borders/>
	<div className="main_div" ref="mainDiv">
		<Pong ref="pongRef" v-if="inGame" :roomid="tRoomId" :appExist="appExist" :dimensions="this.$refs.mainDiv"/>
		<button @click="this.play()" v-if="inGame && !isPlaying" className="ready_button">Ready</button>
		<!-- <button v-on:click="this.play()" v-if="inGame" >Ready</button> -->
		<div class="lds-roller" v-if="isWaiting"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
		<div className="game_mode_div_test" v-if="!inGame">
			<div className="game_mode_one_div" v-if="!inGame">
				<button @click="this.playRequestClassic()" v-if="!inGame" className="modes_routers">Classic</button>
				<button @click="this.leaveQueue()" v-if="!inGame" className="quit_queue">Leave</button>
			</div>
			<div className="game_mode_two_div" v-if="!inGame">
				<button @click="this.playRequestSpecial()" v-if="!inGame" className="modes_routers">Special</button>
				<button @click="this.specialLeaveQueue()" v-if="!inGame" className="quit_queue">Leave</button>
			</div>
		</div>
	</div>
</template>
