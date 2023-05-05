import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {
    SubscribeMessage, WebSocketGateway, WebSocketServer,
    OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit
  } from '@nestjs/websockets';
import { RoomDto } from './room.dto';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) {}

    server: Server;



    async editRoom(userId: string, dto: RoomDto) {
      const user = await this.prisma.room.update({
        where: {
          id: userId,
        },
        data: {
          ...dto,
        },
      });

      return user;
    }

    async createRoom(dto: RoomDto) {
      console.log(dto)
      let data = {
        name: dto.name,
        user_one: dto.user_one,
        user_two: dto.user_two
      };
      const user = await this.prisma.room.create({
          data,
      });

      return user;
    }


    // async createRoom(dto: string) {
    //   console.log(dto)
    //   let data = {
    //     name: dto,
    //     user_one: 'user_one',
    //     user_two: 'user_two'
    //   };
    //   const user = await this.prisma.room.create({
    //       data,
    //   });

    //   return user;
    // }


    // async signToken(id: string) {
    //   const payload = {
    //     sub: id,
    //   };
    //   const token = await this.jwt.signAsync(payload, {
    //     expiresIn: this.config.get('jwt_expiresIn'),
    //     secret: this.config.get('JWT_SECRET'),
    //   });
    //   return token;
    //   }
}
