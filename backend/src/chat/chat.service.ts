import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {
    SubscribeMessage, WebSocketGateway, WebSocketServer,
    OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit
  } from '@nestjs/websockets';
import { RoomDto } from './room.dto';
import { RoomChannelDto } from './roomChannel.dto';
import { PrismaService } from "../prisma/prisma.service";

// let id = 0

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) {}

    server: Server;



    // async editRoom(userId: string, dto: RoomDto) {
    //   const user = await this.prisma.room.update({
    //     where: {
    //       id: userId,
    //     },
    //     data: {
    //       ...dto,
    //     },
    //   });

    //   return user;
    // }







//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//                                      CHAT/MP                                         //
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//     RoomDto {
//       name -> string
//       user_one -> string
//       user_two -> string
//     }



    async createRoom(dto: object) {
      type ObjectKey = keyof typeof dto;

      let data: RoomDto = dto as ObjectKey

      let room = await this.prisma.room.findMany({
        where: {
          user_two: {
            contains: data.user_two
          },
          user_one: {
            contains: data.user_one
          }
      },})
      if (room[0] === undefined) {
        room = await this.prisma.room.findMany({
        where: {
          user_one: {
            contains: data.user_two
          },
          user_two: {
            contains: data.user_one
          }
        },})
      }


      if (room[0] === undefined) {
        const user = await this.prisma.room.create({
            data,
        });
        return user;
      }

    }

    async findRoom(dto: object) {
      type ObjectKey = keyof typeof dto;

      let data: RoomDto = dto as ObjectKey

      let room = await this.prisma.room.findMany({
          where: {
            user_two: {
              contains: data.user_two
            },
            user_one: {
              contains: data.user_one
            }
      },})

      if (room[0] === undefined) {
        room = await this.prisma.room.findMany({
        where: {
          user_one: {
            contains: data.user_two
          },
          user_two: {
            contains: data.user_one
          }
        },})
      }

      return room;
    }






//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//                                      CHANNEL                                         //
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//      RoomChannelDto {
//        name -> string
//        users -> string[]
//      }



    async createRoomChannel(dto: object) {
      type ObjectKey = keyof typeof dto;

      let data: RoomChannelDto = dto as ObjectKey

      let room = await this.prisma.roomChannel.findMany({
        where: {
          name: {
            contains: data.name
          }
      },})

      if (room[0] === undefined) {
        const user = await this.prisma.roomChannel.create({
            data,
        });
        return user;
      }

    }

    async findRoomChannel(dto: object) {
      type ObjectKey = keyof typeof dto;

      let data: RoomChannelDto = dto as ObjectKey

      let room = await this.prisma.roomChannel.findMany({
          where: {
            name: {
              contains: data.name
            }
      },})

      return room;
    }











}
