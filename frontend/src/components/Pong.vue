<template>
    <div class="connections">
        <canvas id="pixi"></canvas>
        <p>
            <button v-on:click="play()">Play</button>
            <button v-on:click="playRequest()">Play Request</button>
        </p>
    </div>
</template>

<script>
    import $socket from '../plugin/socket';
    import * as PIXI from 'pixi.js';
    import {ref} from 'vue';
    import { io } from "socket.io-client";

    let socket = $socket;
    let leftUsername = ref(false);
    let rightUsername = ref(false);
    let tRoomId = ref(null);
    let side = ref(false);

    // const socket = io("ws://localhost:3001");

    export default {
        watch: {
            boardexist: function (newVal, oldVal) {
            // watch it
            //console.log("Prop changed: ", newVal, " | was: ", oldVal);
            document.querySelector("#my-canvas-wrapper")?.remove();
            },
        },
        name: 'Pong',
        data() {
            return {
                position: {
                    x: 0,
                    y: 0
                },
                active: true,
            }
        },

        // created() { 
        //     this.socket = io("ws://localhost:3001");
        // },
        mounted() {
            // console.log("ZBOUI");
            //     socket.on("connect", () => {
            //         console.log("connect to backend");
            //         socket.emit("init");
            //     })
            //     this.context = this.$refs.game.getContext("2d");
            //     socket.on("position", data => {
            //     this.position = data;
            //     this.context.clearRect(0, 0, this.$refs.game.width, this.$refs.game.height);
            //     this.context.fillStyle = "#FFFFFF";
            //     this.context.fillRect(0, 0, this.$refs.game.width, this.$refs.game.width);
            //     this.context.fillStyle = "#70135e";
            //     this.context.fillRect(this.position.x, this.position.y, 20, 20);
            // });
            if (this.active == true) {
                console.log(document.querySelector("my-canvas-wrapper"));
                socket.emit("init");
                this.Game();
            }
        },
        methods: {
            move(direction) { socket.emit("move", direction); 
            socket.on('error', function (err) {
                console.log(err);
            });},

            playRequest() {
                socket.emit("playRequest", {username: undefined});
            },

            play() {
                console.log("bonjour");
                socket.emit("play", {roomId: tRoomId.value});
            },

            Game() {
                var canvas = document.getElementById('pixi') 
                const PongApp = new PIXI.Application({background: '#000000',
                    // width: window.innerWidth,
                    // height: window.innerHeight - 300,
                    resizeTo: window,
                    view: canvas});
                // document.body.appendChild(PongApp.view);
                
                const gameScene = new PIXI.Container();
                let leftPaddle, rightPaddle, ball, state;

                PongApp.stage.addChild(gameScene);

                const backImgTex = PIXI.Texture.from('/pong_bg.png');
                const paddleTex = PIXI.Texture.from('/paddle.png');
                const ballTex = PIXI.Texture.from('/ball.png');

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
                const leftUserText = new PIXI.Text("T");
                const rightUserText = new PIXI.Text("T");

                gameScene.addChild(leftUserText);
                gameScene.addChild(rightUserText);
                
                leftUserText.anchor.set(0.5, 0.5);
                leftUserText.position.set(backImgSprite.width / 4, backImgSprite.height / 15);

                rightUserText.anchor.set(0.5, 0.5);
                rightUserText.position.set(backImgSprite.width - (backImgSprite.width / 4), backImgSprite.height / 15);

                const leftScoreText = new PIXI.Text("0");
                const rightScoreText = new PIXI.Text("0");

                gameScene.addChild(leftScoreText);
                gameScene.addChild(rightScoreText);

                leftScoreText.anchor.set(0.5, 0.5);
                leftScoreText.position.set(backImgSprite.width / 1.8, backImgSprite.height / 15);

                rightScoreText.anchor.set(0.5, 0.5);
                rightScoreText.position.set(backImgSprite.width - (backImgSprite.width / 1.8), backImgSprite.height / 15);
                //Paddles Setup
                //Left
                leftPaddle.anchor.set(0.5, 0.5);
                leftPaddle.position.set((backImgSprite.width / 2) - (backImgSprite.width * 0.45), backImgSprite.height / 2);

                leftPaddle.scale.x = 2;
                // leftPaddle.scale.y = 2;

                leftPaddle.height = backImgSprite.height / 3.5; 

                leftPaddle.vy = 0;
                gameScene.addChild(leftPaddle);

                //Right
                rightPaddle.anchor.set(0.5, 0.5);
                rightPaddle.position.set((backImgSprite.width / 2) + (backImgSprite.width * 0.45), backImgSprite.height / 2);
                
                rightPaddle.scale.x = 2;
                // rightPaddle.scale.y = 2;

                rightPaddle.height = backImgSprite.height / 3.5; 

                rightPaddle.vy = 0;
                gameScene.addChild(rightPaddle);

                //Ball Setup
                ball.anchor.set(0.5, 0.5);
                ball.position.x = backImgSprite.width / 2;
                ball.position.y = backImgSprite.height / 2;

                ball.scale.x = 2;
                ball.scale.y = 2;
                
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
                    // if (rightPaddle.vy < 0)
                    //     socket.emit("move", 'upR');
                    // if (rightPaddle.vy > 0)
                    //     socket.emit("move", 'downR');
                    
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

                socket.on('roomAssigned', (data) => {
                    leftUsername.value = data.leftUsername;
                    rightUsername.value = data.rightUsername;

                    leftUserText.text = data.leftUsername;
                    rightUserText.text = data.rightUsername;
                    tRoomId.value = data.roomId;

                    if (data.isLeft)
                        side.value = "left";
                    else
                        side.value = "right";
                })
            },

        },
    }
</script>

<style scoped>
#my-canvas-wrapper {
  position: absolute;
}
</style>