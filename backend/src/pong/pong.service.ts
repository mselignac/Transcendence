import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {
    SubscribeMessage, WebSocketGateway, WebSocketServer,
    OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit
  } from '@nestjs/websockets';

@Injectable()
export class PongService {
    constructor() {}

    readonly globalwidth: number = 1000;
    readonly globalheight: number = 1000;
    readonly board: {
        width: number,
        height: number,
    } = {
        width: this.globalwidth,
        height: this.globalheight,
    };
    position = {
        x: 20,
        y: 20,
    }

    socket: Server;

    connection() {
        console.log("connected to frontend");
        this.socket.emit("position", this.position);
    }

    move(data) {
        switch(data) {
            case "left":
                this.position.x -= 5;
                this.socket.emit("position", this.position);
                break;
            case "right":
                this.position.x += 5;
                this.socket.emit("position", this.position);
                break;
            case "up":
                this.position.y -= 5;
                this.socket.emit("position", this.position);
                break;
            case "down":
                this.position.y += 5;
                this.socket.emit("position", this.position);
                break;
        }
    }    
}