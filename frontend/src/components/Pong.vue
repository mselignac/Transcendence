<script setup lang="ts">
	import $socket from '../plugin/socket';
	import * as PIXI from 'pixi.js';
	import { ref, watch, defineComponent } from 'vue';
	import { accountService } from '../_services/account.service'

</script>

<script lang="ts">
	
	let socket = $socket;
	let actualUsername = ref(false);
	let leftUsername = ref(false);
	let rightUsername = ref(false);
	let tRoomId = ref(null);
	let side = ref("");
	let leftReady = ref(false);
	let rightReady = ref(false);
	let isSpecial = ref(false);
	let gameDiv = ref(null);
	let isPlaying = ref(false);
	
	export default defineComponent ({
		props: ['roomid', 'appExist', 'dimensions'],

		name: 'Pong',

		data() {
			return {
				newUsername: '',
				active: true,
			}
		},

		mounted() {
			gameDiv.value = this.dimensions;
			if (this.active === true) {
				this.Game();
			}
		},
		methods: {
			move(direction: string) { socket.emit("move", direction); 
			socket.on('error', function (err) {
				console.log(err); 
			});},

			play() {
				socket.emit("play", {roomId: tRoomId.value, username: actualUsername.value});
			},

			Game() {
				const PongApp = new PIXI.Application({
					width: gameDiv.value.clientWidth,
					height: gameDiv.value.clientWidth * 3 / 5,
					resolution: devicePixelRatio,
					backgroundAlpha: 0,
				});
				if (document.querySelector("#pong-canvas") != null)
          			document.querySelector("#pong-canvas")?.appendChild(PongApp.view);
				PongApp.resize(PongApp.view.parentNode.width, PongApp.view.parentNode.height);
				
				const gameScene = new PIXI.Container();
				let leftPaddle: any, rightPaddle: any, ball: any, state: any, leftCross: any, leftCheck: any, rightCross: any, rightCheck: any, upMidWall: any, downMidWall: any;

				PongApp.stage.addChild(gameScene);

				const backImgTex = PIXI.Texture.from('/pong_bg.png');
				const paddleTex = PIXI.Texture.from('/paddle.png');
				const ballTex = PIXI.Texture.from('/ball.png');
				const crossTex = PIXI.Texture.from('/cross.png');
				const checkTex = PIXI.Texture.from('/check.png');

				const backImgSprite = new PIXI.Sprite(backImgTex);
				leftPaddle = new PIXI.Sprite(paddleTex);
				rightPaddle = new PIXI.Sprite(paddleTex);

				upMidWall = new PIXI.Sprite(paddleTex);
				downMidWall = new PIXI.Sprite(paddleTex);

				ball = new PIXI.Sprite(ballTex);
				
				//Background Setup

				gameScene.width = PongApp.renderer.height * 5 / 3;
				gameScene.height = PongApp.renderer.height;

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
				leftCross.height = backImgSprite.width / 30;
				leftCheck.height = backImgSprite.width / 30;
				rightCross.height = backImgSprite.width / 30;
				rightCheck.height = backImgSprite.width / 30;


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

				leftPaddle.height = backImgSprite.height / 3.5; 

				leftPaddle.vy = 0;
				gameScene.addChild(leftPaddle);

				//Right
				rightPaddle.anchor.set(0.5, 0.5);
				rightPaddle.position.set((backImgSprite.width / 2) + (backImgSprite.width * 0.45), backImgSprite.height / 2);
				
				rightPaddle.width = backImgSprite.width / 19;

				rightPaddle.height = backImgSprite.height / 3.5; 

				rightPaddle.vy = 0;
				gameScene.addChild(rightPaddle);

				//Middle walls setup
				upMidWall.anchor.set(0.5, 0.5);
				downMidWall.anchor.set(0.5, 0.5);

				upMidWall.width = backImgSprite.width / 19;
				downMidWall.width = backImgSprite.width / 19;

				upMidWall.height = (backImgSprite.height / 3.5) / 1.5; 
				downMidWall.height = (backImgSprite.height / 3.5) / 1.5;

				upMidWall.position.set((backImgSprite.width / 2), backImgSprite.height / 3);
				downMidWall.position.set((backImgSprite.width / 2), backImgSprite.height - backImgSprite.height / 3);

				gameScene.addChild(upMidWall);
				gameScene.addChild(downMidWall);

				upMidWall.visible = false;
				downMidWall.visible = false;

				//Ball Setup
				ball.anchor.set(0.5, 0.5);
				ball.position.x = backImgSprite.width / 2;
				ball.position.y = backImgSprite.height / 2;

				ball.width = backImgSprite.width / 20;
				ball.height = ball.width;
				
				ball.vx = 0;
				ball.vy = 0;
				ball.visible = true;
				gameScene.addChild(ball);

				//Key listener
				const   up = keyboard("ArrowUp"),
						down = keyboard("ArrowDown");

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

				state = play;
				PongApp.ticker.add((delta) => gameLoop(delta));


				// gameScene.x = PongApp.screen.width / 2;
				// gameScene.y = PongApp.screen.height / 2;

				// window.addEventListener('resize', resize);
                window.addEventListener('resize', () => {
					const parent = PongApp.view.parentNode;

					// let newWidth = parent.clientWidth;
					// let newHeight = gameDiv.value.clientWidth * 3 / 5;
					PongApp.renderer.resize(gameDiv.value.clientWidth, gameDiv.value.clientWidth * 3 / 5);
					// PongApp.renderer.resolution = devicePixelRatio;
					// gameScene.width = PongApp.renderer.width;
					// gameScene.height = PongApp.renderer.width * 3 / 5;
					backImgSprite.width = PongApp.renderer.width;
					backImgSprite.height = PongApp.renderer.width * 3 / 5;
					leftCross.width = backImgSprite.width / 30;
					leftCheck.width = backImgSprite.width / 30;
					rightCross.width = backImgSprite.width / 30;
					rightCheck.width = backImgSprite.width / 30;
					leftCross.height = backImgSprite.width / 30;
					leftCheck.height = backImgSprite.width / 30;
					rightCross.height = backImgSprite.width / 30;
					rightCheck.height = backImgSprite.width / 30;
					leftPaddle.width = backImgSprite.width / 19;
					leftPaddle.height = backImgSprite.height / 3.5; 
					rightPaddle.width = backImgSprite.width / 19;
					rightPaddle.height = backImgSprite.height / 3.5;
					upMidWall.width = backImgSprite.width / 19;
					downMidWall.width = backImgSprite.width / 19;
					upMidWall.height = (backImgSprite.height / 3.5) / 1.5; 
					downMidWall.height = (backImgSprite.height / 3.5) / 1.5;
					ball.width = backImgSprite.width / 20;
					ball.height = ball.width;
					leftUserText.position.set(backImgSprite.width / 4, backImgSprite.height / 15);
					rightUserText.position.set(backImgSprite.width - (backImgSprite.width / 4), backImgSprite.height / 15);
					leftScoreText.position.set(backImgSprite.width / 1.8, backImgSprite.height / 15);
					rightScoreText.position.set(backImgSprite.width - (backImgSprite.width / 1.8), backImgSprite.height / 15);
					endText.position.set(backImgSprite.width / 2, backImgSprite.height / 2);
					leftCross.position.set(backImgSprite.width / 19 , backImgSprite.height / 15);
					leftCheck.position.set(backImgSprite.width / 19 , backImgSprite.height / 15);
					rightCross.position.set(backImgSprite.width - (backImgSprite.width / 19) , backImgSprite.height / 15);
					rightCheck.position.set(backImgSprite.width - (backImgSprite.width / 19) , backImgSprite.height / 15);
					leftPaddle.position.set((backImgSprite.width / 2) - (backImgSprite.width * 0.45), backImgSprite.height / 2);
					rightPaddle.position.set((backImgSprite.width / 2) + (backImgSprite.width * 0.45), backImgSprite.height / 2);
					upMidWall.position.set((backImgSprite.width / 2), backImgSprite.height / 3);
					downMidWall.position.set((backImgSprite.width / 2), backImgSprite.height - backImgSprite.height / 3);
					leftCross.position.set(backImgSprite.width / 19 , backImgSprite.height / 15);
					leftCheck.position.set(backImgSprite.width / 19 , backImgSprite.height / 15);
					rightCross.position.set(backImgSprite.width - (backImgSprite.width / 19) , backImgSprite.height / 15);
					rightCheck.position.set(backImgSprite.width - (backImgSprite.width / 19) , backImgSprite.height / 15);
					ball.position.x = backImgSprite.width / 2;
					ball.position.y = backImgSprite.height / 2;
					endText.style.fontSize = backImgSprite.width / 15;
				});

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

					isSpecial.value = data.isSpecial;
					if (data.isSpecial) {
						upMidWall.visible = true;
						downMidWall.visible = true;
					}
					else {
						upMidWall.visible = false;
						downMidWall.visible = false;
					}

					if (data.isLeft)
						side.value = "left";
					else
						side.value = "right";
					
						leftCross.visible = true;
						rightCross.visible = true;
				})

				socket.on('readyMsg', (data) => {
					if (data.side === "left"){
						leftReady.value = true;
						leftCross.visible = false;
						leftCheck.visible = true;
					}
					else {
						rightReady.value = true;
						rightCross.visible = false;
						rightCheck.visible = true;
					}

					if (leftReady.value === true && rightReady.value === true) {
						leftCheck.visible = false;
						rightCheck.visible = false;
						isPlaying.value = true;
					}
				})
				socket.on('endGame', (data) => {
					if (data.winner === "false")
						endText.text = "Player has disconnected";
					else
						endText.text = data.winner + " has won !";
					endText.style.fontSize = backImgSprite.width / 15;
					endText.visible = true;
					ball.visible = false;
					if (actualUsername.value === data.winner && data.winner !== "false")
						accountService.addVictory({ login: data.winner })
						.catch(res => console.log(res))
					if (side._value == 'right' && data.winner !== "false")
						accountService.game({ user_one: leftUsername._value, user_two: rightUsername._value, score_one: leftScoreText.text, score_two: rightScoreText.text, victory: data.winner })
					socket.emit("gameEnded", {id: tRoomId.value});
				})
				socket.on('reset', (data) => {
					rightReady.value = false;
					leftReady.value = false;
					this.active = false;
					isPlaying.value = false;
					up.unsubscribe();
					down.unsubscribe();
				})
			},

		},
		async created() {
			await accountService.usersMe()
			.then((response) => {
				actualUsername.value = response.data.login
			})
			tRoomId.value = this.roomid;
			socket.emit("requestInfo", {roomId: tRoomId.value, username: actualUsername.value})
		},
	})
</script>

<template>
		<div id="pong-canvas"></div>
		<div className="div_button">
		</div>
</template>