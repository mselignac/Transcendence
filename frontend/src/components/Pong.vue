<script setup lang="ts">
	import $socket from '../plugin/socket';
	import * as PIXI from 'pixi.js';
	import {ref} from 'vue';
	import Borders from './Borders.vue'
	import axios from 'axios';
	import { io } from "socket.io-client";
	import { accountService } from '../_services/account.service'

</script>

<script lang="ts">
	
	let socket = $socket;
	let actualUsername = ref(false);
	let leftUsername = ref(false);
	let rightUsername = ref(false);
	let tRoomId = ref(null);
	let side = ref(false);
	let leftReady = ref(false);
	let rightReady = ref(false);
	
	export default {
		watch: {
			boardexist: function (newVal, oldVal) {
			document.querySelector("#my-canvas-wrapper")?.remove();
			},
		},
		name: 'Pong',
		data() {
			return {
				newUsername: '',
				active: true,
			}
		},
		props: ['room'],

		mounted() {

			if (this.active == true) {
				socket.emit("init");
				this.Game();
			}
		},
		methods: {
			move(direction: string) { socket.emit("move", direction); 
			socket.on('error', function (err) {
				console.log(err);
			});},

			// playRequest() {
			// 	socket.emit("playRequest", {username: actualUsername.value});
			// },

			play() {
				console.log("bonjour");
				socket.emit("play", {roomId: tRoomId.value, side: side.value});
			},

			Game() {
				// var canvas = document.getElementById('pong')
				const PongApp = new PIXI.Application({
					// autoResize: true,
					// resolution: devicePixelRatio,
					width: window.innerWidth,
					height: window.innerHeight - 300,
					// resizeTo: window,
					// view: canvas,
					backgroundAlpha: 0,
				});
				this.$refs.pong_canvas.appendChild(PongApp.view);
				// resize();
				// document.body.appendChild(PongApp.view);
				
				const gameScene = new PIXI.Container();
				let leftPaddle, rightPaddle, ball, state, leftCross, leftCheck, rightCross, rightCheck;

				PongApp.stage.addChild(gameScene);

				const backImgTex = PIXI.Texture.from('/pong_bg.png');
				const paddleTex = PIXI.Texture.from('/paddle.png');
				const ballTex = PIXI.Texture.from('/ball.png');
				const crossTex = PIXI.Texture.from('/cross.png');
				const checkTex = PIXI.Texture.from('/check.png');

				const backImgSprite = new PIXI.Sprite(backImgTex);
				leftPaddle = new PIXI.Sprite(paddleTex);
				rightPaddle = new PIXI.Sprite(paddleTex);
				ball = new PIXI.Sprite(ballTex);
				
				//Background Setup
				// backImgSprite.scale.x = PongApp.view.width / 1000;
				// backImgSprite.scale.y = backImgSprite.scale.x;

				gameScene.width = PongApp.renderer.height * 5 / 3;
				gameScene.height = PongApp.renderer.height;

				// backImgSprite.anchor.set(0.5, 0.5);
				backImgSprite.width = PongApp.renderer.height * 5 / 3;
				backImgSprite.height = PongApp.renderer.height;

				gameScene.addChild(backImgSprite);

				// Username display
				const leftUserText = new PIXI.Text("");
				const rightUserText = new PIXI.Text("");

				gameScene.addChild(leftUserText);
				gameScene.addChild(rightUserText);
				
				leftUserText.anchor.set(0.5, 0.5);
				leftUserText.position.set(backImgSprite.width / 4, backImgSprite.height / 15);
				leftUserText.style.fontSize = backImgSprite.width / 60;

				rightUserText.anchor.set(0.5, 0.5);
				rightUserText.position.set(backImgSprite.width - (backImgSprite.width / 4), backImgSprite.height / 15);
				rightUserText.style.fontSize = backImgSprite.width / 60;

				//Score display
				const leftScoreText = new PIXI.Text("0");
				const rightScoreText = new PIXI.Text("0");

				gameScene.addChild(leftScoreText);
				gameScene.addChild(rightScoreText);

				leftScoreText.anchor.set(1, 0);
				leftScoreText.position.set(backImgSprite.width / 1.8, backImgSprite.height / 15);
				leftScoreText.style.fontSize = backImgSprite.width / 30;

				rightScoreText.anchor.set(0, 0);
				rightScoreText.position.set(backImgSprite.width - (backImgSprite.width / 1.8), backImgSprite.height / 15);
				rightScoreText.style.fontSize = backImgSprite.width / 30;

				//End Text
				const endText = new PIXI.Text("");

				gameScene.addChild(endText);

				endText.anchor.set(0.5, 0.5);
				endText.position.set(backImgSprite.width / 2, backImgSprite.height / 2);
				endText.style.fontSize = backImgSprite.width / 10;
				endText.visible = false;

				//Waiting Sprites display
				leftCross = new PIXI.Sprite(crossTex);
				leftCheck = new PIXI.Sprite(checkTex);

				rightCross = new PIXI.Sprite(crossTex);
				rightCheck = new PIXI.Sprite(checkTex);
				
				gameScene.addChild(leftCross, leftCheck, rightCross, rightCheck);

				leftCross.width = backImgSprite.width / 30;
				leftCheck.width = backImgSprite.width / 30;
				rightCross.width = backImgSprite.width / 30;
				rightCheck.width = backImgSprite.width / 30;
				leftCross.height = leftCross.width
				leftCheck.height = leftCross.width
				rightCross.height = leftCross.width
				rightCheck.height = leftCross.width


				leftCross.position.set(backImgSprite.width / 19 , backImgSprite.height / 15);
				leftCheck.position.set(backImgSprite.width / 19 , backImgSprite.height / 15);

				rightCross.anchor.set(1, 0);
				rightCheck.anchor.set(1, 0);
				rightCross.position.set(backImgSprite.width - (backImgSprite.width / 19) , backImgSprite.height / 15);
				rightCheck.position.set(backImgSprite.width - (backImgSprite.width / 19) , backImgSprite.height / 15);

				leftCross.visible = false;
				leftCheck.visible = false;
				rightCross.visible = false;
				rightCheck.visible = false;

				//Paddles Setup
				//Left
				leftPaddle.anchor.set(0.5, 0.5);
				leftPaddle.position.set((backImgSprite.width / 2) - (backImgSprite.width * 0.45), backImgSprite.height / 2);

				leftPaddle.width = backImgSprite.width / 19;
				// leftPaddle.scale.y = 2;

				leftPaddle.height = backImgSprite.height / 3.5; 

				leftPaddle.vy = 0;
				gameScene.addChild(leftPaddle);

				//Right
				rightPaddle.anchor.set(0.5, 0.5);
				rightPaddle.position.set((backImgSprite.width / 2) + (backImgSprite.width * 0.45), backImgSprite.height / 2);
				
				rightPaddle.width = backImgSprite.width / 19;
				// rightPaddle.scale.y = 2;

				rightPaddle.height = backImgSprite.height / 3.5; 

				rightPaddle.vy = 0;
				gameScene.addChild(rightPaddle);

				//Ball Setup
				ball.anchor.set(0.5, 0.5);
				ball.position.x = backImgSprite.width / 2;
				ball.position.y = backImgSprite.height / 2;

				ball.width = backImgSprite.width / 20;
				ball.height = ball.width;
				
				ball.vx = 0;
				ball.vy = 0;

				gameScene.addChild(ball);

				//Key listener
				const   up = keyboard("ArrowUp"),
						down = keyboard("ArrowDown"),
						upR = keyboard("ArrowLeft"),
						downR = keyboard("ArrowRight");

				//Up
				up.press = () => {
					leftPaddle.vy = -1;
				};
				up.release = () => {
					if (!down.isDown) {
						leftPaddle.vy = 0;
					}
				};

				//Down
				down.press = () => {
					leftPaddle.vy = 1;
				};
				down.release = () => {
					if (!up.isDown) {
						leftPaddle.vy = 0;
					}
				};

				upR.press = () => {
					rightPaddle.vy = -1;
				};
				upR.release = () => {
					if (!downR.isDown) {
						rightPaddle.vy = 0;
					}
				};

				//Down
				downR.press = () => {
					rightPaddle.vy = 1;
				};
				downR.release = () => {
					if (!upR.isDown) {
						rightPaddle.vy = 0;
					}
				};

				state = play;
				PongApp.ticker.add((delta) => gameLoop(delta));


				// gameScene.x = PongApp.screen.width / 2;
				// gameScene.y = PongApp.screen.height / 2;

				window.addEventListener('resize', resize);

				function resize() {
   				// Récupérez les nouvelles dimensions de la div.
    			let width = this.pong_canvas.offsetWidth;
    			let height = this.pong_canvas.offsetHeight;

    			// Redimensionnez l'application Pixi.
    			PongApp.renderer.resize(width, height);
}

				function keyboard(value) {
					const key = {};
					key.value = value;
					key.isDown = false;
					key.isUp = true;
					key.press = undefined;
					key.release = undefined;
					//The `downHandler`
					key.downHandler = (event) => {
						if (event.key === key.value) {
						if (key.isUp && key.press) {
							key.press();
						}
						key.isDown = true;
						key.isUp = false;
						event.preventDefault();
						}
					};

					//The `upHandler`
					key.upHandler = (event) => {
						if (event.key === key.value) {
						if (key.isDown && key.release) {
							key.release();
						}
						key.isDown = false;
						key.isUp = true;
						event.preventDefault();
						}
					};

					//Attach event listeners
					const downListener = key.downHandler.bind(key);
					const upListener = key.upHandler.bind(key);
					
					window.addEventListener("keydown", downListener, false);
					window.addEventListener("keyup", upListener, false);
					
					// Detach event listeners
					key.unsubscribe = () => {
						window.removeEventListener("keydown", downListener);
						window.removeEventListener("keyup", upListener);
					};
					
					return key;
				}

				function gameLoop(delta) {
					state(delta);
				}

				function play(delta) {
					if (leftPaddle.vy < 0 && side.value === "left")
						socket.emit("move", {roomId: tRoomId.value, direction: 'upL'});
					if (leftPaddle.vy > 0 && side.value === "left")
						socket.emit("move", {roomId: tRoomId.value, direction: 'downL'});
				
					if (leftPaddle.vy < 0 && side.value === "right")
						socket.emit("move", {roomId: tRoomId.value, direction: 'upR'});
					if (leftPaddle.vy > 0 && side.value === "right")
						socket.emit("move", {roomId: tRoomId.value, direction: 'downR'});                    
				}

				socket.on('data', dataChariot => {
					leftPaddle.y = (dataChariot.leftPlayer.y / 1000) * backImgSprite.height;
					rightPaddle.y = (dataChariot.rightPlayer.y / 1000) * backImgSprite.height;
					// ball.x = backImgSprite.width * dataChariot.ball.x / (1000 * 5 / 3);
					ball.position.x = dataChariot.ball.x * backImgSprite.width / (1000 * 5 / 3);
					ball.position.y = (dataChariot.ball.y / 1000) * backImgSprite.height;

					leftScoreText.text = String(dataChariot.leftPlayer.score);
					rightScoreText.text = String(dataChariot.rightPlayer.score);
				})

				socket.on('initGame', (data) => {
					leftUsername.value = data.leftUsername;
					rightUsername.value = data.rightUsername;

					leftUserText.text = data.leftUsername;
					rightUserText.text = data.rightUsername;

					if (data.isLeft)
						side.value = "left";
					else
						side.value = "right";
					
						leftCross.visible = true;
						rightCross.visible = true;
				})

				socket.on('readyMsg', (data) => {
					if (data.side == "left"){
						leftReady.value = true;
						leftCross.visible = false;
						leftCheck.visible = true;
					}
					else{
						rightReady.value = true;
						rightCross.visible = false;
						rightCheck.visible = true;
					}

					if (leftReady.value && rightReady.value){
						leftCheck.visible = false;
						rightCheck.visible = false;
					}
				})
				socket.on('endGame', (data) => {
					endText.text = data.winner + " has won !";
					endText.visible = true;
					// 
					socket.emit("gameEnded", {id: tRoomId.value});
				})
				socket.on('reset', (data) => {
					// leftScoreText.destroy(true);
					// rightScoreText.destroy(true);
					// leftUserText.destroy(true);
					// rightUserText.destroy(true);
					// leftPaddle.destroy(true);
					// rightPaddle.destroy(true);
					// rightCheck.destroy(true);
					// rightCross.destroy(true);
					// leftCheck.destroy(true);
					// leftCross.destroy(true);
					// ballTex.destroy(true);
					// backImgTex.destroy(true);
					// PongApp.stage.destroy(true);
					// PongApp.destroy(true);

					this.$router.push({ path: '/game-mode'});
				})
			},

		},
		async created() {
			await accountService.usersMe()
			.then((response) => {
				actualUsername.value = response.data.login
			})
			tRoomId.value = this.room;
			console.log("Room id afefwef", tRoomId.value);
			socket.emit("requestInfo", {roomId: tRoomId.value, username: actualUsername.value})
		},
	}
</script>

<template>
		<div ref="pong_canvas" class="pong"></div>
		<p>
			<button v-on:click="this.play()">Ready</button>
			<button v-on:click="this.playRequest()">Play Request</button>
		</p>
</template>

<!-- <style scoped>
.pong {
	width: 80%; /* Ajustez le pourcentage selon vos besoins */
  height: 60vh;
}
</style> -->