import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Logger } from '@nestjs/common';
  import { Socket, Server } from 'socket.io';
  import { ChatService } from './chat.service'
  
  @WebSocketGateway({
    namespace: '/chat',
    cors: {
      origin: '*',
      credentials: true,
    },
  })
  export class ChatGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    // room = new ChatService();

    @WebSocketServer() server: Server;
  
    private logger: Logger = new Logger('ChatGateway');



    //////////////////////////////////////////////////////////
    //////////               SEND MSG               //////////
    //////////////////////////////////////////////////////////

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: String): void {
      this.server.to(payload[0]).emit('msgToClient', payload[1]);
    }



    //////////////////////////////////////////////////////////
    //////////               JOIN ROOM              //////////
    //////////////////////////////////////////////////////////

    @SubscribeMessage('joinRoom')
    joinRoom(client: Socket, payload: string): void {
      client.join(payload);
    }

    @SubscribeMessage('joinRoomChat')
    joinRoomChat(client: Socket, payload: string): void {
      client.join(payload);
    }



    //////////////////////////////////////////////////////////
    //////////                 INIT                 //////////
    //////////////////////////////////////////////////////////

    afterInit(server: Server) {
      this.logger.log('Init');
    }
  
    handleDisconnect(client: Socket) {
      // this.logger.log(`Client disconnected: ${client.id}`);
      // console.log('cest deconnecte')
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      // this.logger.log(`Client connected: ${client.id}`);
      // console.log('cest connecte');
    }
  }
