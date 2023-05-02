import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
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
implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect 
{
  constructor(private pong : PongService){ 
    console.log("Here");
  };

  room = new PongService();

  @WebSocketServer() server: Server;

  @SubscribeMessage('init')
  connection(client: Socket): void {
    console.log("connected to frontend");
    client.join("1");
    client.broadcast.emit("data", this.pong.dataChariot);
  }

  @SubscribeMessage('move')
  movePlayer(@MessageBody() data: string): void {
    this.pong.move(data);
    this.server.emit("data", this.pong.dataChariot);
  }

  @SubscribeMessage('play')
  play(client: Socket): void {
    console.log("bonjour 2");
    return(this.room.gamePlaying(this.server));
  }

  afterInit(server: Server) {
    console.log('Init');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }
}