import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {
    SubscribeMessage, WebSocketGateway, WebSocketServer,
    OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit
  } from '@nestjs/websockets';

const VERTICAL_BOUNDS = 1000 / 20.5;
const PADDLE_SIZE = 1000 / 4.2;
const MAXBOUNCEANGLE = 5 * Math.PI / 12;

@Injectable()
export class PongService {
    constructor() {}

    id: number;
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
        },

        rightPlayer: {
            x: this.board.width - (this.board.width / 20),
            y: this.board.height / 2,
            width: this.board.width / 19,
            height: PADDLE_SIZE,
            nickname: "",
            score: 0,
        },

        ball: {
            x: this.board.width / 2,
            y: this.board.height / 2,
            vx: 0,
            vy: 0,
            width: 0,
            height: 0,
        },
    }

    server: Server;

    connection() {
        console.log("User connected to room ", this.id);
        this.server.to(this.id.toString()).emit("data", this.dataChariot);
    }

    move(data: any) {
        switch(data.direction) {
            case "upL":
                console.log("UpL");
                if (this.dataChariot.leftPlayer.y > (VERTICAL_BOUNDS + (PADDLE_SIZE / 2)) - 10)
                    this.dataChariot.leftPlayer.y -= 10;
                // return this.position;
                break;
            case "downL":
                console.log("DownL");
                if (this.dataChariot.leftPlayer.y < (this.globalheight - VERTICAL_BOUNDS - (PADDLE_SIZE / 2)) + 10)
                this.dataChariot.leftPlayer.y += 10;
                // return this.position;
                break;
            case "upR":
                console.log("UpR");
                if (this.dataChariot.rightPlayer.y > (VERTICAL_BOUNDS + (PADDLE_SIZE / 2)) - 10)
                    this.dataChariot.rightPlayer.y -= 10;
                // return this.position;
                break;
            case "downR":
                console.log("DownR");
                if (this.dataChariot.rightPlayer.y < (this.globalheight - VERTICAL_BOUNDS - (PADDLE_SIZE / 2)) + 10)
                    this.dataChariot.rightPlayer.y += 10;
                // return this.position;
                break;
        }
    }
    
    loop() {
        this.updateBall();
        // console.log("vx, vy: ", this.dataChariot.ball.vx, this.dataChariot.ball.vy);
        if (this.dataChariot.leftPlayer.score == 10) {
            this.server.to(this.id.toString()).emit("endGame", {winner: this.dataChariot.rightPlayer.nickname});
            setTimeout(this.endGame.bind(this), 5000);
        }
        else if (this.dataChariot.rightPlayer.score == 10) {
            this.server.to(this.id.toString()).emit("endGame", {winner: this.dataChariot.leftPlayer.nickname});
            setTimeout(this.endGame.bind(this), 5000);
        }
        if (this.dataChariot.leftPlayer.score < 10 && this.dataChariot.rightPlayer.score < 10) {
            this.server.to(this.id.toString()).emit("data", this.dataChariot);
            setTimeout(this.loop.bind(this), 10);
        }
    }

    gamePlaying(server: Server) {
        // console.log("server hbvzreghzzierhzibhzerbizhbzbzihrbzireiebvzirb", server);
        this.server = server;
        this.isPlaying = true;
        this.calculateBounceAngle(this.dataChariot.leftPlayer, true);
        this.loop();
        // server.to("1").emit("data", this.dataChariot);
        // setTimeout(this.gamePlaying.bind(this), 10);
    }

    endGame() {
        this.server.socketsLeave(this.id.toString());
    }

    updateBall() {
        // console.log("Is scored :", this.checkIfScored());
        if (this.checkIfScored()) {
            this.dataChariot.ball.vx *= -1;
            this.dataChariot.ball.x = this.globalwidth / 2;
            this.dataChariot.ball.y = this.globalheight / 2;
        }

        console.log("Ball X ", this.dataChariot.ball.x);

        this.dataChariot.ball.x += this.dataChariot.ball.vx;
        this.dataChariot.ball.y += this.dataChariot.ball.vy;

        this.calculateCollision(this.dataChariot.ball, this.dataChariot.leftPlayer); 
        this.calculateCollision(this.dataChariot.ball, this.dataChariot.rightPlayer);

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
                this.calculateBounceAngle(object2, false);
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

    calculateBounceAngle(paddle, isStart) {
        let relativeIntersectY = paddle.y - this.dataChariot.ball.y;
    
        let normalizedRelativeIntersectionY = (relativeIntersectY / (PADDLE_SIZE / 2));
        let bounceAngle = normalizedRelativeIntersectionY * MAXBOUNCEANGLE;
        if (this.dataChariot.ball.vx > 0) {
            this.dataChariot.ball.vx = this.ballSpeed * -Math.cos(bounceAngle);
            //adjust ball position
            if (!isStart)
                this.dataChariot.ball.x = this.dataChariot.rightPlayer.x - (this.dataChariot.rightPlayer.width / 3);
        } 
        else {
            this.dataChariot.ball.vx = this.ballSpeed * Math.cos(bounceAngle);
            //adjust ball position
            if (!isStart)
                this.dataChariot.ball.x = this.dataChariot.leftPlayer.x + (this.dataChariot.leftPlayer.width / 3);
        }
        this.dataChariot.ball.vy = this.ballSpeed * -Math.sin(bounceAngle);
        
        this.bounce++;
        if (!(this.bounce % 1) && this.ballSpeed < 15)
            this.ballSpeed += 0.5;
    }

    checkIfScored() {
        // let vball = {x: this.dataChariot.ball.x, y: this.dataChariot.ball.y, vx: this.dataChariot.ball.vx, vy: this.dataChariot.ball.vy, width: this.dataChariot.ball.width, height: this.dataChariot.ball.height};
        // vball.x -= vball.vx / 2; 
        // console.log("Ball X: ", this.dataChariot.ball.x);
        // console.log("Left X: ", this.dataChariot.leftPlayer.x);
        // console.log("Right X: ", this.dataChariot.rightPlayer.x);
        if (this.dataChariot.ball.x <= this.globalwidth / 30) {
            this.dataChariot.leftPlayer.score++;
            this.bounce = 0;
            this.ballSpeed = 7;
            this.dataChariot.ball.vx = this.ballSpeed * Math.cos(0);
            this.dataChariot.ball.vy = this.ballSpeed * -Math.sin(0);
            return true;
        } 
        else if (this.dataChariot.ball.x >= this.globalwidth - (this.globalwidth / 30)) {
            // if (this.calculateCollision(vball, this.dataChariot.rightPlayer))
            //     return false;
            this.dataChariot.rightPlayer.score++;
            this.bounce = 0;
            this.ballSpeed = 7;
            this.dataChariot.ball.vx = this.ballSpeed * -Math.cos(0);
            this.dataChariot.ball.vy = this.ballSpeed * -Math.sin(0);
            return true;
        }
        return false;
    }
}