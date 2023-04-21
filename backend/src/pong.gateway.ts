import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
    SubscribeMessage,
    MessageBody,
  } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { PongService } from './pong/pong.service'
// import { emit } from process;

@WebSocketGateway({cors: true})

export class PongGateway
{
  constructor(private pong : PongService){ console.log("Here"); };
  @WebSocketServer() server: Server;

  @SubscribeMessage('init')
  connection() {
    console.log("connected to frontend");
    this.server.emit("data", this.pong.dataChariot);
  }

  @SubscribeMessage('move')
  movePlayer(@MessageBody() data: string) {
    this.pong.move(data);
    this.server.emit("data", this.pong.dataChariot);
  }
}