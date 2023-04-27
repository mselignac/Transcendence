import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {
    SubscribeMessage, WebSocketGateway, WebSocketServer,
    OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit
  } from '@nestjs/websockets';

@Injectable()
export class ChatService {
    constructor() {}

    server: Server;

    // connection() {
    //     console.log("connected to frontend");
    //     this.server.emit("data", this.dataChariot);
    // }
}
