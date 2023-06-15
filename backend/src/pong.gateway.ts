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

type waitingRoom = {
  client: Socket;
  username?: string;
};

@WebSocketGateway({cors: true})

export class PongGateway
implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect 
{
  constructor(private pong : PongService){ 
    console.log("Here");
  };

  room = new PongService();

  private gameRoomList: Array<PongService> = new Array<PongService>();
  private waitingRoomList: Array<waitingRoom> = [];
  private roomCount: number = 0;

  @WebSocketServer() server: Server;

  @SubscribeMessage('init')
  connection(client: Socket): void {
    console.log("connected to frontend");
    // client.join("1");
    // client.broadcast.emit("data", this.room.dataChariot);
  }

  @SubscribeMessage('move')
  movePlayer(client: Socket, data: any): void {
    this.gameRoomList[data.roomId].move(data);
    // this.server.to(data.roomId.toString()).emit("data", this.room.dataChariot);
  }

  @SubscribeMessage('play')
  play(client: Socket, data: any): void {
    if (data.side === "left"){ 
      this.gameRoomList[data.roomId].leftReady = true;
      this.server.to(data.roomId.toString()).emit("readyMsg", {side: "left"});
    }
    if (data.side === "right"){
      this.gameRoomList[data.roomId].rightReady = true;
      this.server.to(data.roomId.toString()).emit("readyMsg", {side: "right"});
    }

    if (!this.gameRoomList[data.roomId].isPlaying
        && this.gameRoomList[data.roomId].leftReady
        && this.gameRoomList[data.roomId].rightReady)
      return(this.gameRoomList[data.roomId].gamePlaying(this.server));
  }

  @SubscribeMessage('playRequest')
  playRequest(client: Socket, data: any): void {
    console.log("Request arrived from: ", data.username);
    const newWaitingRoom: waitingRoom = {
      client: client,
      username: data.username,
    };

    this.waitingRoomList.push(newWaitingRoom);
    if (this.waitingRoomList.length >= 2)
      this.gameInit(this.waitingRoomList[0], this.waitingRoomList[1]);
  }

  gameInit(leftPlayer: waitingRoom, rightPlayer: waitingRoom) {
    this.gameRoomList.push(new PongService());
    this.gameRoomList.slice(-1)[0].id = this.roomCount;

  
    if (leftPlayer.username == undefined)
      leftPlayer.username = "Ceci est";
    if (rightPlayer.username == undefined)
      rightPlayer.username = "une pre-alpha";

    leftPlayer.client.join(this.gameRoomList.slice(-1)[0].id.toString());
    rightPlayer.client.join(this.gameRoomList.slice(-1)[0].id.toString());

    this.gameRoomList.slice(-1)[0].dataChariot.leftPlayer.nickname = leftPlayer.username;
    this.gameRoomList.slice(-1)[0].dataChariot.rightPlayer.nickname = rightPlayer.username;
    this.waitingRoomList.splice(0, 2);

    leftPlayer.client.emit('roomAssigned', {roomId: this.roomCount, leftUsername: leftPlayer.username, rightUsername: rightPlayer.username, isLeft: true});
    rightPlayer.client.emit('roomAssigned', {roomId: this.roomCount, leftUsername: leftPlayer.username, rightUsername: rightPlayer.username, isLeft: false});
    this.roomCount++;
  }

  @SubscribeMessage('gameEnded')
  gameEnded(client: Socket, data: any): void {
    delete this.gameRoomList[data.id];
  }

  afterInit(server: Server) {
    console.log('Server initialized', server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }
}
