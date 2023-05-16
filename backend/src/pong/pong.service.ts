import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {
    SubscribeMessage, WebSocketGateway, WebSocketServer,
    OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit
  } from '@nestjs/websockets';

const VERTICAL_BOUNDS = 1000 * (1 / 20.5);
const PADDLE_SIZE = 110;
const BALLSPEED = 5;
const MAXBOUNCEANGLE = 5 * Math.PI / 12;

@Injectable()
export class PongService {
    constructor() {}

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
            width: 10,
            height: PADDLE_SIZE,
        },

        rightPlayer: {
            x: this.board.width - (this.board.width / 20),
            y: this.board.height / 2,
            width: 10,
            height: PADDLE_SIZE,
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
        console.log("connected to frontend");
        this.server.emit("data", this.dataChariot);
    }

    move(data: any) {
        switch(data) {
            case "upL":
                if (this.dataChariot.leftPlayer.y > (VERTICAL_BOUNDS + (PADDLE_SIZE /2)))
                    this.dataChariot.leftPlayer.y -= 10;
                // return this.position;
                break;
            case "downL":
                if (this.dataChariot.leftPlayer.y < (this.globalheight - VERTICAL_BOUNDS - (PADDLE_SIZE/2)))
                this.dataChariot.leftPlayer.y += 10;
                // return this.position;
                break;
            case "upR":
                if (this.dataChariot.rightPlayer.y > (VERTICAL_BOUNDS + (PADDLE_SIZE /2)))
                    this.dataChariot.rightPlayer.y -= 10;
                // return this.position;
                break;
            case "downR":
                if (this.dataChariot.rightPlayer.y < (this.globalheight - VERTICAL_BOUNDS - (PADDLE_SIZE/2)))
                    this.dataChariot.rightPlayer.y += 10;
                // return this.position;
                break;
        }
    }
    
    loop() {
        this.updateBall();
        // console.log("vx, vy: ", this.dataChariot.ball.vx, this.dataChariot.ball.vy);
        this.server.to("1").emit("data", this.dataChariot);
        setTimeout(this.loop.bind(this), 10);
    }

    gamePlaying(server: Server) {
        // console.log("server hbvzreghzzierhzibhzerbizhbzbzihrbzireiebvzirb", server);
        this.server = server;
        this.calculateBounceAngle(this.dataChariot.leftPlayer);
        this.loop();
        // server.to("1").emit("data", this.dataChariot);
        // setTimeout(this.gamePlaying.bind(this), 10);
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
                this.calculateBounceAngle(object2);
            }
        }
    }


    checkWallCollision(b) {
        if(b.y + b.height / 2 >= this.globalheight - VERTICAL_BOUNDS){
            b.vy *= -1;
        } 
        else if (b.y - b.height / 2 <= VERTICAL_BOUNDS) {
            b.vy *= -1;
        }
    }

    calculateBounceAngle(paddle) {
        let relativeIntersectY = paddle.y - this.dataChariot.ball.y;
    
        let normalizedRelativeIntersectionY = (relativeIntersectY / (PADDLE_SIZE / 2));
        let bounceAngle = normalizedRelativeIntersectionY * MAXBOUNCEANGLE;
        if (this.dataChariot.ball.vx > 0) {
            this.dataChariot.ball.vx = BALLSPEED * -Math.cos(bounceAngle);
        } 
        else {
            this.dataChariot.ball.vx = BALLSPEED * Math.cos(bounceAngle);
        }
        this.dataChariot.ball.vy = BALLSPEED * -Math.sin(bounceAngle);
    }

    checkIfScored() {
        // console.log("Ball X: ", this.dataChariot.ball.x);
        // console.log("Left X: ", this.dataChariot.leftPlayer.x);
        // console.log("Right X: ", this.dataChariot.rightPlayer.x);
        if (this.dataChariot.ball.x <= this.dataChariot.leftPlayer.x) {
            return true;
        } 
        else if (this.dataChariot.ball.x >= this.dataChariot.rightPlayer.x) {
            return true;
        }
        return false;
    }
}