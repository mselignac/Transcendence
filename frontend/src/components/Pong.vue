<template>
    <div>
        <canvas ref="game" width="640" height="480" style="border: 1px solid black;"></canvas>
        <p>
            <button v-on:click="move('right')">Right</button>
            <button v-on:click="move('left')">Left</button>
            <button v-on:click="move('up')">Up</button>
            <button v-on:click="move('down')">Down</button>
        </p>
    </div>
</template>

<script>

    import { io } from "socket.io-client";

    const socket = io("ws://localhost:3000");

    export default {
        name: 'Pong',
        data() {
            return {
                socket: {},
                context: {},
                position: {
                    x: 0,
                    y: 0
                }
            }
        },
        // created() { 
        //     this.socket = io("ws://localhost:3000");
        // },
        mounted() {
                this.context = this.$refs.game.getContext("2d");
                socket.on("position", data => {
                this.position = data;
                this.context.clearRect(0, 0, this.$refs.game.width, this.$refs.game.height);
                this.context.fillStyle = "#FFFFFF";
                this.context.fillRect(0, 0, this.$refs.game.width, this.$refs.game.width);
                this.context.fillStyle = "#70135e";
                this.context.fillRect(this.position.x, this.position.y, 20, 20);
            });
        },
        methods: {
            move(direction) { socket.emit("move", direction); 
            socket.on('error', function (err) {
                console.log(err);
            });},
        }
    }
</script>

<style scoped></style>