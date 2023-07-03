import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

const VERTICAL_BOUNDS = 1000 / 20.5;
const PADDLE_SIZE = 1000 / 4.2;
const MAXBOUNCEANGLE = 5 * Math.PI / 12;

@Injectable()
export class PongService {
    constructor() {}

    id: number;
    specialMode: boolean = false;
    ballSpeed: number = 7;
    bounce: number = 0;
    leftReady: boolean = false;
    rightReady: boolean = false;
    isPlaying: boolean = false;
    side: boolean = false;
    readonly globalheight: number = 1000;
    readonly globalwidth: number = this.globalheight * 5 / 3;
    readonly board: {
        width: number,
        height: number,
    } = {
        width: this.globalwidth,
        height: this.globalheight,
    };
    dataChariot = {

        leftPlayer: {
            x: this.board.width / 20,
            y: this.board.height / 2,
            width: this.board.width / 19,
            height: PADDLE_SIZE,
            nickname: "",
            score: 0,
            isWall: false,
        },

        rightPlayer: {
            x: this.board.width - (this.board.width / 20),
            y: this.board.height / 2,
            width: this.board.width / 19,
            height: PADDLE_SIZE,
            nickname: "",
            score: 0,
            isWall: false,
        },

        ball: {
            x: this.board.width / 2,
            y: this.board.height / 2,
            vx: 0,
            vy: 0,
            width: 0,
            height: 0,
        },

        middleWall: {
            one: {
                x: this.board.width / 2,
                y: this.board.height / 3,
                width: this.board.width / 19,
                height: PADDLE_SIZE / 1.5,
                isWall: true,
            },
            
            two: {
                x: this.board.width / 2,
                y: this.board.height - this.board.height / 3,
                width: this.board.width / 19,
                height: PADDLE_SIZE / 1.5,
                isWall: true,
            },
        },
    }

    server: Server;

    connection() {
        console.log("User connected to room ", this.id);
        this.server.to(this.id.toString()).emit("data", this.dataChariot);
    }

    move(data: any) {
        if (this.isPlaying) {
            switch(data.direction) {
                case "upL":
                    if (this.dataChariot.leftPlayer.y > (VERTICAL_BOUNDS + (PADDLE_SIZE / 2)) - 10)
                        this.dataChariot.leftPlayer.y -= 15;
                    break;
                case "downL":
                    if (this.dataChariot.leftPlayer.y < (this.globalheight - VERTICAL_BOUNDS - (PADDLE_SIZE / 2)) + 10)
                    this.dataChariot.leftPlayer.y += 15;
                    break;
                case "upR":
                    if (this.dataChariot.rightPlayer.y > (VERTICAL_BOUNDS + (PADDLE_SIZE / 2)) - 10)
                        this.dataChariot.rightPlayer.y -= 15;
                    break;
                case "downR":
                    if (this.dataChariot.rightPlayer.y < (this.globalheight - VERTICAL_BOUNDS - (PADDLE_SIZE / 2)) + 10)
                        this.dataChariot.rightPlayer.y += 15;
                    break;
            }
        }
    }
    
    loop() {
        if (this.isPlaying) {
            this.updateBall();
            if (this.dataChariot.leftPlayer.score == 10) {
                this.isPlaying = false;
                this.server.to(this.id.toString()).emit("data", this.dataChariot);
                this.server.to(this.id.toString()).emit("endGame", {winner: this.dataChariot.rightPlayer.nickname});
                setTimeout(this.endGame.bind(this), 5000);
            }
            else if (this.dataChariot.rightPlayer.score == 10) {
                this.isPlaying = false;
                this.server.to(this.id.toString()).emit("data", this.dataChariot);
                this.server.to(this.id.toString()).emit("endGame", {winner: this.dataChariot.leftPlayer.nickname});
                setTimeout(this.endGame.bind(this), 5000);
            }
            if (this.dataChariot.leftPlayer.score < 10 && this.dataChariot.rightPlayer.score < 10) {
                this.server.to(this.id.toString()).emit("data", this.dataChariot);
                setTimeout(this.loop.bind(this), 10);
            }
        }
    }

    gamePlaying(server: Server) {
        this.server = server;
        this.isPlaying = true;
        this.calculateBounceAngle(this.dataChariot.leftPlayer, true, false);
        this.loop();
    }

    endGame() {
        this.isPlaying = false;
        if (this.server) {
            this.server.socketsLeave(this.id.toString());
            // this.server.in(this.id.toString()).disconnectSockets(true);
        }
    }

    updateBall() {
        if (this.checkIfScored()) {
            this.dataChariot.ball.vx *= -1;
            this.dataChariot.ball.x = this.globalwidth / 2;
            this.dataChariot.ball.y = this.globalheight / 2;
        }

        this.dataChariot.ball.x += this.dataChariot.ball.vx;
        this.dataChariot.ball.y += this.dataChariot.ball.vy;

        this.calculateCollision(this.dataChariot.ball, this.dataChariot.leftPlayer); 
        this.calculateCollision(this.dataChariot.ball, this.dataChariot.rightPlayer);

        if (this.specialMode) {
            this.calculateCollision(this.dataChariot.ball, this.dataChariot.middleWall.one); 
            this.calculateCollision(this.dataChariot.ball, this.dataChariot.middleWall.two);
        }

        this.checkWallCollision(this.dataChariot.ball);
    }

    //Tests if two objects are colliding
    calculateCollision(object1, object2) {
        if (object2.x < this.board.width / 2 && object1.vx > 0)
            return false;
        else if (object2.x > this.board.width / 2 && object1.vx < 0)
            return false;

        let combinedHalfWidths, combinedHalfHeights, vx, vy;
        
        //Calculate the distance vector between the sprites
        vx = object1.x - object2.x;
        vy = object1.y - object2.y;

        combinedHalfWidths = object1.width / 2 + object2.width / 2;
        combinedHalfHeights = object1.height / 2 + object2.height / 2;

        //Check for a collision on the hor axis
        if (Math.abs(vx) < combinedHalfWidths) {
            //A collision might be occuring. Check for a collision on the vert axis
            if (Math.abs(vy) < combinedHalfHeights) {
                //There's definitely a collision happening
                if (object2.isWall === false)
                    this.calculateBounceAngle(object2, false, false);
                else
                    this.calculateBounceAngle(object2, false, true);
                return true;
            }
        }
        return false;
    }


    checkWallCollision(b) {
        if(b.y + b.height / 2 >= this.globalheight - VERTICAL_BOUNDS){
            b.vy *= -1;
        } 
        else if (b.y - b.height / 2 <= VERTICAL_BOUNDS) {
            b.vy *= -1;
        }
    }

    calculateBounceAngle(paddle, isStart, isWall) {
        let relativeIntersectY = paddle.y - this.dataChariot.ball.y;
    
        let normalizedRelativeIntersectionY = (relativeIntersectY / (PADDLE_SIZE / 2));
        let bounceAngle = normalizedRelativeIntersectionY * MAXBOUNCEANGLE;
        if (this.dataChariot.ball.vx > 0) {
            this.dataChariot.ball.vx = this.ballSpeed * -Math.cos(bounceAngle);
            //adjust ball position
            if (!isStart && !isWall)
                this.dataChariot.ball.x = this.dataChariot.rightPlayer.x - (this.dataChariot.rightPlayer.width / 3);
        } 
        else {
            this.dataChariot.ball.vx = this.ballSpeed * Math.cos(bounceAngle);
            //adjust ball position
            if (!isStart && !isWall)
                this.dataChariot.ball.x = this.dataChariot.leftPlayer.x + (this.dataChariot.leftPlayer.width / 3);
        }
        this.dataChariot.ball.vy = this.ballSpeed * -Math.sin(bounceAngle);
        
        this.bounce++;
        if (!(this.bounce % 1) && this.ballSpeed < 15)
            this.ballSpeed += 0.5;
    }

    checkIfScored() {
        if (this.dataChariot.ball.x <= this.globalwidth / 30) {
            this.dataChariot.leftPlayer.score++;
            this.bounce = 0;
            this.ballSpeed = 7;
            this.dataChariot.ball.vx = this.ballSpeed * Math.cos(0);
            this.dataChariot.ball.vy = this.ballSpeed * -Math.sin(0);
            this.dataChariot.leftPlayer.y = this.board.height / 2;
            this.dataChariot.rightPlayer.y = this.board.height / 2;
            return true;
        } 
        else if (this.dataChariot.ball.x >= this.globalwidth - (this.globalwidth / 30)) {
            this.dataChariot.rightPlayer.score++;
            this.bounce = 0;
            this.ballSpeed = 7;
            this.dataChariot.ball.vx = this.ballSpeed * -Math.cos(0);
            this.dataChariot.ball.vy = this.ballSpeed * -Math.sin(0);
            this.dataChariot.leftPlayer.y = this.board.height / 2;
            this.dataChariot.rightPlayer.y = this.board.height / 2;
            return true;
        }
        return false;
    }
}