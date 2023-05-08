import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {
    SubscribeMessage, WebSocketGateway, WebSocketServer,
    OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit
  } from '@nestjs/websockets';
import { RoomDto } from './room.dto';
import { PrismaService } from "../prisma/prisma.service";

// let id = 0

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

    async createRoom(dto: object) {
      type ObjectKey = keyof typeof dto;

      let data: RoomDto = dto as ObjectKey

      console.log('>>>>>>', data)

      const user = await this.prisma.room.create({
          data,
      });

      return user;
    }

    async findRoom(dto: object) {
      let room = await this.prisma.room.findMany({
          where: {
            user_one: {
              search: dto['user_one'],
            },
            user_two: {
              search: dto['user_two']
            },
          },})
        
      if (room === false) {
        room = await this.prisma.room.findMany({
        where: {
          user_one: {
            search: dto['user_two'],
          },
          user_two: {
            search: dto['user_one']
          },
        },})
      }

      return room.name;
    }






//     // All posts that contain the words 'cat' or 'dog'.
// const result = await prisma.posts.findMany({
//   where: {
//     body: {
//       search: 'cat | dog',
//     },
//   },
// })

// // All drafts that contain the words 'cat' and 'dog'.
// const result = await prisma.posts.findMany({
//   where: {
//     status: 'Draft',
//     body: {
//       search: 'cat & dog',
//     },
//   },
// })



    // async editUser(userId: string, dto: EditUserDto) {
    //   const user = await this.prisma.room.update({
    //     where: {
    //       id: userId,
    //     },
    //     data: {
    //       ...dto,
    //     },
    //   });
    //   // delete user.hash;

    //   return user;



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
