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

    room = new ChatService();

    @WebSocketServer() server: Server;
  
    private logger: Logger = new Logger('ChatGateway');
  
    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: string): void {
      console.log(payload);
      this.server.emit('msgToClient', payload);
    }
  
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
      // client.join('room');
    }
  }
