import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {
    SubscribeMessage, WebSocketGateway, WebSocketServer,
    OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit
  } from '@nestjs/websockets';

const VERTICAL_BOUNDS = 87;
const PADDLE_SIZE = 110;
const BALLSPEED = 10;
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
            x: 50,
            y: this.board.height / 2,
            width: 0,
            height: PADDLE_SIZE,
        },

        rightPlayer: {
            x: 50,
            y: this.board.height / 2,
            width: 0,
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
                    this.dataChariot.leftPlayer.y -= 5;
                // return this.position;
                break;
            case "downL":
                if (this.dataChariot.leftPlayer.y < (this.globalheight - VERTICAL_BOUNDS - (PADDLE_SIZE/2)))
                this.dataChariot.leftPlayer.y += 5;
                // return this.position;
                break;
            case "upL":
                this.dataChariot.rightPlayer.y -= 5;
                // return this.position;
                break;
            case "downL":
                this.dataChariot.rightPlayer.y += 5;
                // return this.position;
                break;
        }
    }
    

    gamePlaying(server: Server) {
        this.server = server;
        console.log("bonjour 3");
        this.updateBall();
        this.server.to('1').emit("data", this.dataChariot);
        setTimeout(this.gamePlaying.bind(this), 10);
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

        this.checkWallCollision(this.dataChariot.ball);
    }

    //Tests if two objects are colliding
    calculateCollision(object1, object2) {
        //Define the variables we'll need to calculate
        let combinedHalfWidths, combinedHalfHeights, vx, vy;

        //Calculate the distance vector between the sprites
        vx = object1.x - object2.x;
        vy = object1.y - object2.y;

        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = object1.width / 2 + object2.width / 2;
        combinedHalfHeights = object1.height / 2 + object2.height / 2;

        //Check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {
            //A collision might be occuring. Check for a collision on the y axis
            if (Math.abs(vy) < combinedHalfHeights) {
                //There's definitely a collision happening
                this.calculateBounceAngle(object2);
            }
        }
    }


    checkWallCollision(b) {
        if(b.y + b.height / 2 >= VERTICAL_BOUNDS + this.globalheight){
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
        if (this.dataChariot.ball.x <= this.dataChariot.leftPlayer.x) {
            return true;
        } 
        else if (this.dataChariot.ball.x >= this.dataChariot.rightPlayer.x) {
            return true;
        }
        return false;
    }
}