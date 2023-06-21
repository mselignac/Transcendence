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
      // console.log('plus ok')
      // this.logger.log(`Client disconnected: ${client.id}`);
      // console.log('cest deconnecte')
      // console.log('auth', client.handshake.auth)
      // this.server.emit('connection');
    }

    handleConnection(client: Socket, ...args: any[]) {
      // console.log(args)
      // this.server.emit
      // this.logger.log(`Client connected: ${client.id}`);
      // console.log('auth', client.handshake.auth)
      // console.log('args', args[0])
      // let cookie = client.handshake.headers.cookie
      // console.log('cookie', cookie)
      // console.log('cest connecte');
      // this.server.emit('connection');
    }
  }




//   socket.userData = await this.httpStrategy.validate(socket.handshake.headers.authorization.replace("Bearer ", ""))
// } catch (e) {
//   this.logger.error("Socket disconnected within handleConnection() in AppGateway:", e)
//   socket.disconnect(true)
//   return
// }









// backend-transcendence   | [Nest] 1761  - 06/15/2023, 2:54:19 PM     LOG [ChatGateway] Object:
// backend-transcendence   | {
// backend-transcendence   |   "headers": {
// backend-transcendence   |     "host": "localhost:3000",
// backend-transcendence   |     "connection": "Upgrade",
// backend-transcendence   |     "pragma": "no-cache",
// backend-transcendence   |     "cache-control": "no-cache",
// backend-transcendence   |     "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
// backend-transcendence   |     "upgrade": "websocket",
// backend-transcendence   |     "origin": "http://localhost:8080",
// backend-transcendence   |     "sec-websocket-version": "13",
// backend-transcendence   |     "accept-encoding": "gzip, deflate, br",
// backend-transcendence   |     "accept-language": "en-US,en;q=0.9",
// backend-transcendence   |     "cookie": "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YWM3NTZiNC0yZGUyLTQ3ZGUtYWFlMy01NmIxZTJkNWRhODAiLCJpYXQiOjE2ODY4MzUzNjQsImV4cCI6MTY4ODEzMTM2NH0.L7oWVzwDq95cEtxnumD4HUfrjL3J8IM3G-daV23MXz8",
// backend-transcendence   |     "sec-websocket-key": "FNVZbfoEupcKVfNANOMGwg==",
// backend-transcendence   |     "sec-websocket-extensions": "permessage-deflate; client_max_window_bits"
// backend-transcendence   |   },
// backend-transcendence   |   "time": "Thu Jun 15 2023 14:54:19 GMT+0000 (Coordinated Universal Time)",
// backend-transcendence   |   "address": "::ffff:172.19.0.1",
// backend-transcendence   |   "xdomain": true,
// backend-transcendence   |   "secure": false,
// backend-transcendence   |   "issued": 1686840859444,
// backend-transcendence   |   "url": "/socket.io/?EIO=4&transport=websocket",
// backend-transcendence   |   "query": {
// backend-transcendence   |     "EIO": "4",
// backend-transcendence   |     "transport": "websocket"
// backend-transcendence   |   },
// backend-transcendence   |   "auth": {}
// backend-transcendence   | }
// backend-transcendence   | 









// backend-transcendence   | [Nest] 1785  - 06/15/2023, 2:55:24 PM     LOG [ChatGateway] Object:
// backend-transcendence   | {
// backend-transcendence   |   "headers": {
// backend-transcendence   |     "host": "localhost:3000",
// backend-transcendence   |     "connection": "Upgrade",
// backend-transcendence   |     "pragma": "no-cache",
// backend-transcendence   |     "cache-control": "no-cache",
// backend-transcendence   |     "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
// backend-transcendence   |     "upgrade": "websocket",
// backend-transcendence   |     "origin": "http://localhost:8080",
// backend-transcendence   |     "sec-websocket-version": "13",
// backend-transcendence   |     "accept-encoding": "gzip, deflate, br",
// backend-transcendence   |     "accept-language": "en-US,en;q=0.9",
// backend-transcendence   |     "cookie": "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YWM3NTZiNC0yZGUyLTQ3ZGUtYWFlMy01NmIxZTJkNWRhODAiLCJpYXQiOjE2ODY4MzUzNjQsImV4cCI6MTY4ODEzMTM2NH0.L7oWVzwDq95cEtxnumD4HUfrjL3J8IM3G-daV23MXz8",
// backend-transcendence   |     "sec-websocket-key": "OGrRjINO8qVXC8/iSoN7dg==",
// backend-transcendence   |     "sec-websocket-extensions": "permessage-deflate; client_max_window_bits"
// backend-transcendence   |   },
// backend-transcendence   |   "time": "Thu Jun 15 2023 14:55:24 GMT+0000 (Coordinated Universal Time)",
// backend-transcendence   |   "address": "::ffff:172.19.0.1",
// backend-transcendence   |   "xdomain": true,
// backend-transcendence   |   "secure": false,
// backend-transcendence   |   "issued": 1686840924908,
// backend-transcendence   |   "url": "/socket.io/?EIO=4&transport=websocket",
// backend-transcendence   |   "query": {
// backend-transcendence   |     "EIO": "4",
// backend-transcendence   |     "transport": "websocket"
// backend-transcendence   |   },
// backend-transcendence   |   "auth": {}
// backend-transcendence   | }



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MmVmNGUyMC1mODY2LTQ3MTEtOTQyOC1kODhjMmYzZmYwNDciLCJpYXQiOjE2ODY4MzUzNTIsImV4cCI6MTY4ODEzMTM1Mn0.Z5mnYwSLUtK7_DNIVwU6_6imgX-2OXIairq92mONXPw
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MmVmNGUyMC1mODY2LTQ3MTEtOTQyOC1kODhjMmYzZmYwNDciLCJpYXQiOjE2ODY4MzUzNTIsImV4cCI6MTY4ODEzMTM1Mn0.Z5mnYwSLUtK7_DNIVwU6_6imgX-2OXIairq92mONXPw
