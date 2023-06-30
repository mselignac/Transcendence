import {
	WebSocketGateway,
	WebSocketServer,
	OnGatewayInit,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
  } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { PongService } from './pong/pong.service'

type waitingRoom = {
  client: Socket;
  username?: string;
};

type privateWaitingRoom = {
	client: Socket;
	usernameOne?: string;
	receiverClient?: Socket;
	usernameTwo: string;
	id: number;
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
  constructor(private pong : PongService){};

  room = new PongService();

  private gameRoomList: Array<PongService> = new Array<PongService>();
  private waitingRoomList: Array<waitingRoom> = [];
  private specialWaitingRoomList: Array<waitingRoom> = [];
  private inGameList: Array<gameUser> = [];
  private privateWaitingRoomList: Array<privateWaitingRoom> = [];
  private roomCount: number = 0;
  private privateRoomCount: number = 0;

  @WebSocketServer() server: Server;


  @SubscribeMessage('move')
  movePlayer(client: Socket, data: any): void {
	this.gameRoomList[data.roomId].move(data);

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
		&& this.gameRoomList[data.roomId].rightReady) {
		this.server.to(data.roomId.toString()).emit("gameStarted");
		return(this.gameRoomList[data.roomId].gamePlaying(this.server));
		}
	}

	@SubscribeMessage('privateInvite')
	privateInvite(client: Socket, data: any): void {
		let index = this.waitingRoomList.findIndex(waitingRoom => waitingRoom.username === data.sender);
		if (index !== -1) {
    		return ;
		}
		index = this.specialWaitingRoomList.findIndex(waitingRoom => waitingRoom.username === data.sender);
		if (index !== -1) {
    		return ;
		}
		index = this.inGameList.findIndex(gameUser => gameUser.username === data.sender);
		if (index !== -1) {
    		return ;
		}
		index = this.privateWaitingRoomList.findIndex(privateWaitingRoom => privateWaitingRoom.usernameOne === data.sender);
		if (index !== -1) {
    		return ;
	}
	  	const newWaitingRoom: privateWaitingRoom = {
			client: client,
			usernameOne: data.sender,
			usernameTwo: data.receiver,
			id: this.privateRoomCount,
	  	};
	  	this.privateWaitingRoomList.push(newWaitingRoom);
		client.emit("inviteInfo", {id: this.privateRoomCount});
		console.log("HERE PRIVATE INVITE", this.privateWaitingRoomList);
		this.privateRoomCount++;
	}

	@SubscribeMessage('confirmInvite')
	confirmInvite(client: Socket, data: any): void {
		let index = this.privateWaitingRoomList.findIndex(privateWaitingRoom => privateWaitingRoom.usernameOne === data.receiver);
		if (index === -1) {
    		return ;
		}
		console.log("HERE 1");
		this.privateWaitingRoomList[index].receiverClient = client;
		this.privateWaitingRoomList[index].client.emit('goPlay');
		this.privateWaitingRoomList[index].receiverClient.emit('goPlay');
		this.privateGameInit(this.privateWaitingRoomList[index], false);
	}

	@SubscribeMessage('declineInvite')
	declineInvite(client: Socket, data: any): void {
		let index = this.privateWaitingRoomList.findIndex(privateWaitingRoom => privateWaitingRoom.usernameOne === data.receiver);
		if (index !== -1) {
    		this.privateWaitingRoomList.splice(index, 1);
		}
	}

	privateGameInit(users: privateWaitingRoom, specialMode: boolean) {
		this.gameRoomList.push(new PongService());
		this.gameRoomList.slice(-1)[0].id = this.roomCount;
	
		if (specialMode)
			this.gameRoomList.slice(-1)[0].specialMode = true;
	
		users.client.join(this.gameRoomList.slice(-1)[0].id.toString());
		users.receiverClient.join(this.gameRoomList.slice(-1)[0].id.toString());
	
		this.gameRoomList.slice(-1)[0].dataChariot.leftPlayer.nickname = users.usernameOne;
		this.gameRoomList.slice(-1)[0].dataChariot.rightPlayer.nickname = users.usernameTwo;
		this.waitingRoomList.splice(0, 2);
	
		users.client.emit('roomAssigned', {roomId: this.roomCount});
		users.receiverClient.emit('roomAssigned', {roomId: this.roomCount});
		const newGameUser1: gameUser = {
			client: users.client,
			username: users.usernameOne,
			roomId: this.roomCount,
		  };
		const newGameUser2: gameUser = {
			client: users.receiverClient,
			username: users.usernameTwo,
			roomId: this.roomCount,
		  };
		this.inGameList.push(newGameUser1);
		this.inGameList.push(newGameUser2);
	
		if (specialMode === false) {
			let index = this.privateWaitingRoomList.findIndex(privateWaitingRoom => privateWaitingRoom.usernameOne === this.gameRoomList.slice(-1)[0].dataChariot.leftPlayer.nickname);
			if (index !== -1) {
				this.privateWaitingRoomList.splice(index, 1);
			}
		}
		this.roomCount++;
	  }
	
	
	@SubscribeMessage('playRequest')
	playRequest(client: Socket, data: any): void {
	let index = this.waitingRoomList.findIndex(waitingRoom => waitingRoom.username === data.username);
	if (index !== -1) {
    	return ;
	}
	index = this.specialWaitingRoomList.findIndex(waitingRoom => waitingRoom.username === data.username);
	if (index !== -1) {
    	return ;
	}
	index = this.inGameList.findIndex(gameUser => gameUser.username === data.username);
	if (index !== -1) {
    	return ;
	}
	const newWaitingRoom: waitingRoom = {
	  client: client,
	  username: data.username,
	};
	this.waitingRoomList.push(newWaitingRoom);
	if (this.waitingRoomList.length >= 2)
		this.gameInit(this.waitingRoomList[0], this.waitingRoomList[1], false);
  }

  @SubscribeMessage('specialPlayRequest')
  specialPlayRequest(client: Socket, data: any): void {
	let index = this.waitingRoomList.findIndex(waitingRoom => waitingRoom.username === data.username);
	if (index !== -1) {
    	return ;
	}
	index = this.specialWaitingRoomList.findIndex(waitingRoom => waitingRoom.username === data.username);
	if (index !== -1) {
    	return ;
	}
	index = this.inGameList.findIndex(gameUser => gameUser.username === data.username);
	if (index !== -1) {
    	return ;
	}
	console.log("Request arrived from: ", data.username);
	const newWaitingRoom: waitingRoom = {
	  client: client,
	  username: data.username,
	};
	this.specialWaitingRoomList.push(newWaitingRoom);
	if (this.specialWaitingRoomList.length >= 2)
	  this.gameInit(this.specialWaitingRoomList[0], this.specialWaitingRoomList[1], true);
  }

  @SubscribeMessage('leaveWaiting')
  leaveWaiting(client: Socket, data: any): void {
	let index = this.waitingRoomList.findIndex(waitingRoom => waitingRoom.username === data.username);
	if (index !== -1) {
    	this.waitingRoomList.splice(index, 1);
	}
  }

  @SubscribeMessage('leaveSpecialWaiting')
  leaveSpecialWaiting(client: Socket, data: any): void {
	let index = this.specialWaitingRoomList.findIndex(waitingRoom => waitingRoom.username === data.username);
	if (index !== -1) {
    	this.specialWaitingRoomList.splice(index, 1);
	}
  }

  gameInit(leftPlayer: waitingRoom, rightPlayer: waitingRoom, specialMode: boolean) {
	this.gameRoomList.push(new PongService());
	this.gameRoomList.slice(-1)[0].id = this.roomCount;

	if (specialMode)
		this.gameRoomList.slice(-1)[0].specialMode = true;

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

	if (specialMode === false) {
		let index = this.waitingRoomList.findIndex(waitingRoom => waitingRoom.username === this.gameRoomList.slice(-1)[0].dataChariot.leftPlayer.nickname);
		if (index !== -1) {
			this.waitingRoomList.splice(index, 1);
		}
		index = this.waitingRoomList.findIndex(waitingRoom => waitingRoom.username === this.gameRoomList.slice(-1)[0].dataChariot.rightPlayer.nickname);
		if (index !== -1) {
			this.waitingRoomList.splice(index, 1);
		}
	}
	else {
		let index = this.specialWaitingRoomList.findIndex(waitingRoom => waitingRoom.username === this.gameRoomList.slice(-1)[0].dataChariot.leftPlayer.nickname);
		if (index !== -1) {
			this.specialWaitingRoomList.splice(index, 1);
		}
		index = this.specialWaitingRoomList.findIndex(waitingRoom => waitingRoom.username === this.gameRoomList.slice(-1)[0].dataChariot.rightPlayer.nickname);
		if (index !== -1) {
			this.specialWaitingRoomList.splice(index, 1);
		}
	}

	this.roomCount++;
  }

  @SubscribeMessage('requestInfo')
  sendInfo(client: Socket, data: any): void {
	if (this.gameRoomList[data.roomId].dataChariot.leftPlayer.nickname === data.username) {
		client.emit('initGame', {leftUsername: this.gameRoomList[data.roomId].dataChariot.leftPlayer.nickname, rightUsername: this.gameRoomList[data.roomId].dataChariot.rightPlayer.nickname, isLeft: true, isSpecial: this.gameRoomList[data.roomId].specialMode});
	}
	else {
		client.emit('initGame', {leftUsername: this.gameRoomList[data.roomId].dataChariot.leftPlayer.nickname, rightUsername: this.gameRoomList[data.roomId].dataChariot.rightPlayer.nickname, isLeft: false, isSpecial: this.gameRoomList[data.roomId].specialMode});
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
	delete this.gameRoomList[data.id];
  }



  afterInit(server: Server) {
	console.log('Server initialized');
  }

  @SubscribeMessage('leavePage')
  handleLeave(client: Socket) {
	this.handleDisconnect(client);
  }

  handleDisconnect(client: Socket) {
	let index = this.inGameList.findIndex(gameUser => gameUser.client === client);
	if (index !== -1) {
		this.server.to(this.inGameList[index].roomId.toString()).emit("endGame", {winner: "false"});
		this.gameRoomList[this.inGameList[index].roomId].endGame();
	}
	index = this.waitingRoomList.findIndex(waitingRoom => waitingRoom.client === client);
	if (index !== -1) {
    	this.waitingRoomList.splice(index, 1);
	}
	index = this.specialWaitingRoomList.findIndex(waitingRoom => waitingRoom.client === client);
	if (index !== -1) {
    	this.specialWaitingRoomList.splice(index, 1);
	}
	console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
	console.log(`Client connected: ${client.id}`);
  }
}
