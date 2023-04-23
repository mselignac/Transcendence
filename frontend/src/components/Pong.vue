<template>
    <div class="connections">
        <canvas id="pixi"></canvas>
        <p>
            <button v-on:click="play()">Play</button>
        </p>
    </div>
</template>

<script>
    import $socket from '../plugin/socket';
    import * as PIXI from 'pixi.js';
    import { io } from "socket.io-client";

    let socket = $socket;

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

            play() {
                console.log("bonjour");
                socket.emit("play");
            },

            Game() {
                var canvas = document.getElementById('pixi') 
                const PongApp = new PIXI.Application({background: '#000000',
                    // width: window.innerWidth,
                    // height: window.innerHeight-300,
                    resizeTo: window,
                    view: canvas});
                // document.body.appendChild(PongApp.view);
                
                const gameScene = new PIXI.Container();
                let leftPaddle, rightPaddle, ball, state;

                PongApp.stage.addChild(gameScene);

                const backImgTex = PIXI.Texture.from('/ZIZIPONG.png');
                const paddleTex = PIXI.Texture.from('/paddle.png');
                const ballTex = PIXI.Texture.from('/ball.png');

                const backImgSprite = new PIXI.Sprite(backImgTex);
                leftPaddle = new PIXI.Sprite(paddleTex);
                rightPaddle = new PIXI.Sprite(paddleTex);
                ball = new PIXI.Sprite(ballTex);
                // backImgSprite.scale.x = PongApp.view.width / 1000;
                // backImgSprite.scale.y = backImgSprite.scale.x;
                
                //Background Setup
                backImgSprite.anchor.set(0.5, 0.5);
                backImgSprite.x = PongApp.screen.width / 2;
                backImgSprite.y = PongApp.screen.height / 2;
                backImgSprite.width = PongApp.renderer.height * 5 / 3;
                backImgSprite.height = PongApp.renderer.height;

                const heightRatio = backImgSprite.height / 1000;
                const widthRatio = backImgSprite.width / 1000;
                gameScene.addChild(backImgSprite);

                //Paddles Setup
                //Left
                leftPaddle.anchor.set(0.5, 0.5);
                leftPaddle.position.set(backImgSprite.x - ((leftPaddle.width / 2) + (backImgSprite.width / 2) * 0.87), backImgSprite.height / 2);

                leftPaddle.scale.x = 2;
                leftPaddle.scale.y = 2;

                leftPaddle.vy = 0;
                gameScene.addChild(leftPaddle);

                //Right
                rightPaddle.anchor.set(0.5, 0.5);
                rightPaddle.position.set(backImgSprite.x + ((rightPaddle.width / 2) + (backImgSprite.width / 2) * 0.87), backImgSprite.height / 2);
                
                rightPaddle.scale.x = 2;
                rightPaddle.scale.y = 2;

                rightPaddle.vy = 0;
                gameScene.addChild(rightPaddle);

                //Ball Setup
                ball.anchor.set(0.5, 0.5);
                ball.x = backImgSprite.x;
                ball.y = backImgSprite.y;

                ball.scale.x = 2;
                ball.scale.y = 2;
                
                ball.vx = 0;
                ball.vy = 0;

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
                    if (leftPaddle.vy < 0)
                        socket.emit("move", 'upL');
                    if (leftPaddle.vy > 0)
                        socket.emit("move", 'downL');
                    
                }

                socket.on('data', dataChariot => {
                    leftPaddle.y = dataChariot.leftPlayer.y * heightRatio;
                    ball.x = dataChariot.ball.x;
                    ball.y = dataChariot.ball.y * heightRatio;
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