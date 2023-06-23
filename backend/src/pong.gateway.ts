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

type gameUser = {
	client: Socket;
	username?: string;
	roomId: number;
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
  private inGameList: Array<gameUser> = [];
  private roomCount: number = 0;

  @WebSocketServer() server: Server;


  @SubscribeMessage('move')
  movePlayer(client: Socket, data: any): void {
	this.gameRoomList[data.roomId].move(data);
	// this.server.to(data.roomId.toString()).emit("data", this.room.dataChariot);
  }

  @SubscribeMessage('play') 
  play(client: Socket, data: any): void {
	console.log("username ", data.username);
	if (data.username === this.gameRoomList[data.roomId].dataChariot.leftPlayer.nickname){
		this.gameRoomList[data.roomId].leftReady = true;
		this.server.to(data.roomId.toString()).emit("readyMsg", {side: "left"});
	}
	if (data.username === this.gameRoomList[data.roomId].dataChariot.rightPlayer.nickname){
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
	console.log("WAITING LIST ", this.waitingRoomList);
	if (this.waitingRoomList.length >= 2)
	  this.gameInit(this.waitingRoomList[0], this.waitingRoomList[1]);
  }

  inviteToPlay() {

  }

  @SubscribeMessage('leaveWaiting')
  leaveWaiting(client: Socket, data: any): void {
	console.log("Leave request arrived from: ", data.username);
	let index = this.waitingRoomList.findIndex(waitingRoom => waitingRoom.username === data.username);
	if (index !== -1) {
    	this.waitingRoomList.splice(index, 1);
	}
	console.log("WAITING LIST ", this.waitingRoomList);
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

	leftPlayer.client.emit('roomAssigned', {roomId: this.roomCount});
	rightPlayer.client.emit('roomAssigned', {roomId: this.roomCount});
	const newGameUser1: gameUser = {
		client: leftPlayer.client,
		username: leftPlayer.username,
		roomId: this.roomCount,
	  };
	const newGameUser2: gameUser = {
		client: rightPlayer.client,
		username: rightPlayer.username,
		roomId: this.roomCount,
	  };
	this.inGameList.push(newGameUser1);
	this.inGameList.push(newGameUser2);
	let index = this.waitingRoomList.findIndex(waitingRoom => waitingRoom.username === this.gameRoomList.slice(-1)[0].dataChariot.leftPlayer.nickname);
	if (index !== -1) {
    	this.waitingRoomList.splice(index, 1);
	}
	index = this.waitingRoomList.findIndex(waitingRoom => waitingRoom.username === this.gameRoomList.slice(-1)[0].dataChariot.rightPlayer.nickname);
	if (index !== -1) {
    	this.waitingRoomList.splice(index, 1);
	}
	this.roomCount++;
	console.log("WAITING LIST ", this.waitingRoomList);
	console.log("GAME LIST ", this.gameRoomList);
  }

  @SubscribeMessage('requestInfo')
  sendInfo(client: Socket, data: any): void {
	console.log("Room id ", data.roomId);
	console.log("Username 1 ", this.gameRoomList[data.roomId].dataChariot.leftPlayer);
	console.log("Username 2 ", this.gameRoomList[data.roomId].dataChariot.rightPlayer);
	console.log("SIDE VALUE", this.gameRoomList[data.roomId].side);
	if (this.gameRoomList[data.roomId].dataChariot.leftPlayer.nickname === data.username) {
		client.emit('initGame', {leftUsername: this.gameRoomList[data.roomId].dataChariot.leftPlayer.nickname, rightUsername: this.gameRoomList.slice(-1)[0].dataChariot.rightPlayer.nickname, isLeft: true});
	}
	else {
		client.emit('initGame', {leftUsername: this.gameRoomList[data.roomId].dataChariot.leftPlayer.nickname, rightUsername: this.gameRoomList.slice(-1)[0].dataChariot.rightPlayer.nickname, isLeft: false});
	}
}

  @SubscribeMessage('gameEnded')
  gameEnded(client: Socket, data: any): void {
	let index = this.inGameList.findIndex(gameUser => gameUser.username === this.gameRoomList[data.id].dataChariot.leftPlayer.nickname);
	if (index !== -1) {
    	this.inGameList.splice(index, 1);
	}
	index = this.inGameList.findIndex(gameUser => gameUser.username === this.gameRoomList[data.id].dataChariot.rightPlayer.nickname);
	if (index !== -1) {
    	this.inGameList.splice(index, 1);
	}
	setTimeout(() => {
		client.emit('reset');
	}, 5000);
	// this.gameRoomList.splice(data.id, 1);
	delete this.gameRoomList[data.id];
	console.log("GAME LIST ", this.gameRoomList);
  }

  afterInit(server: Server) {
	console.log('Server initialized');
  }

  handleDisconnect(client: Socket) {
	let index = this.inGameList.findIndex(gameUser => gameUser.client === client);
	if (index !== -1) {
		this.server.to(this.inGameList[index].roomId.toString()).emit("endGame", {winner: "false"});
		this.gameRoomList[this.inGameList[index].roomId].endGame();
		// this.gameRoomList[this.inGameList[index].roomId].endGame();
    	// this.gameEnded(client, {id: this.inGameList[index].roomId})
	}
	console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
	console.log(`Client connected: ${client.id}`);
  }
}
