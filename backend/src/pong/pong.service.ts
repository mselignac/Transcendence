import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {
    SubscribeMessage, WebSocketGateway, WebSocketServer,
    OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit
  } from '@nestjs/websockets';

const VERTICAL_BOUNDS = 87;
const PADDLE_SIZE = 110;

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
        leftPlayerPosY: this.board.height / 2,
        rightPlayerPosY: this.board.height / 2,

        ballPosX: this.board.width / 2,
        ballPosY: this.board.height / 2,
    }

    socket: Server;

    connection() {
        console.log("connected to frontend");
        this.socket.emit("data", this.dataChariot);
    }

    move(data: any) {
        switch(data) {
            case "upL":
                if (this.dataChariot.leftPlayerPosY > (VERTICAL_BOUNDS + (PADDLE_SIZE /2)))
                    this.dataChariot.leftPlayerPosY -= 5;
                // return this.position;
                break;
            case "downL":
                if (this.dataChariot.leftPlayerPosY < (this.globalheight - VERTICAL_BOUNDS - (PADDLE_SIZE/2)))
                this.dataChariot.leftPlayerPosY += 5;
                // return this.position;
                break;
            case "upL":
                this.dataChariot.rightPlayerPosY -= 5;
                // return this.position;
                break;
            case "downL":
                this.dataChariot.rightPlayerPosY += 5;
                // return this.position;
                break;
        }
    }

    updateBall() {

    }

    checkWallCollision(b) {
        if(b.y + b.height / 2 >= PADDING + SCREENHEIGHT){
            b.vy *= -1;
        } else if (b.y - b.height / 2 <= PADDING) {
            b.vy *= -1;
        }
    }

    calculateBounceAngle(paddle) {
        let relativeIntersectY = paddle.y - ball.y;
    
        let normalizedRelativeIntersectionY = (relativeIntersectY / (paddleRight.height / 2));
        let bounceAngle = normalizedRelativeIntersectionY * MAXBOUNCEANGLE;
        if (ball.vx > 0) {
            ball.vx = BALLSPEED * -Math.cos(bounceAngle);
        } else {
            ball.vx = BALLSPEED * Math.cos(bounceAngle);
        }
        ball.vy = BALLSPEED * -Math.sin(bounceAngle);
        adjustAI();
    }
}