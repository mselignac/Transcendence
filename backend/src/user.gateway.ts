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
import { UserService } from './user/user.service';
  
  @WebSocketGateway({
    namespace: '/user',
    cors: {
      origin: '*',
      credentials: true,
    },
  })
  export class UserGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

	constructor(private userService: UserService) { }

    @WebSocketServer() server: Server;
  
    private logger: Logger = new Logger('UserGateway');

    //////////////////////////////////////////////////////////
    //////////                 INIT                 //////////
    //////////////////////////////////////////////////////////

    afterInit(server: Server) {
      this.logger.log('Init');
    }

    async handleDisconnect(client: Socket) {
      this.logger.log(`DECONNECTED`);
      await this.userService.offline(client.handshake.auth)
      this.server.emit('disconnection', { login: client.handshake.auth });
    }

    async handleConnection(client: Socket, ...args: any[]) {
      // this.logger.log(`Client connected: ${client.id}`);
      await this.userService.online(client.handshake.auth)
      this.server.emit('connection', { login: client.handshake.auth });
    }
  }
