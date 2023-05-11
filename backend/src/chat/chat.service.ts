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
import { MessageDto } from './messages.dto';

let id = 0

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) {}

    server: Server;

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
        data.name = id.toString()
        id++
        console.log(id)
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

    async addMessage(dto: object) {

      type ObjectKey = keyof typeof dto;

      let dataa: MessageDto = dto as ObjectKey

      await this.prisma.room.update({
        where: {
          name: dataa.room
        },
        data: {
          messages: {
            create: [
              {
                text: dataa.text,
                username: dataa.username
              }
            ]
          }
        }
      })
    }

    async getMsg(dto: object) {
      type ObjectKey = keyof typeof dto;

      let data: MessageDto = dto as ObjectKey

      let room = await this.prisma.room.findUnique({
        where: {
          name: data.room
        }
      })

      let msg = await this.prisma.message.findMany({
        where: {
          roomId: room.id
        }
      })

      return msg
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
      console.log(dto)
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

      let room = await this.prisma.roomChannel.findUnique({
          where: {
            name: data.name
      },})

      return room;
    }

    async editRoom(dto: object) {
      type ObjectKey = keyof typeof dto;

      let dataa: RoomChannelDto = dto as ObjectKey

      let room = await this.prisma.roomChannel.update({
          where: {
            name: dataa.name
          },
          data: {
            users: {
              push: dataa.users[0]
            }
          },
        })

      return room;
    }

    async addMsgChannel(dto: object) {

      type ObjectKey = keyof typeof dto;

      let dataa: MessageDto = dto as ObjectKey

      await this.prisma.roomChannel.update({
        where: {
          name: dataa.room
        },
        data: {
          messages: {
            create: [
              {
                text: dataa.text,
                username: dataa.username
              }
            ]
          }
        }
      })
    }

    async getMsgChannel(dto: object) {
      type ObjectKey = keyof typeof dto;

      let data: MessageDto = dto as ObjectKey

      let room = await this.prisma.roomChannel.findUnique({
        where: {
          name: data.room
        }
      })

      let msg = await this.prisma.message.findMany({
        where: {
          roomChannelId: room.id
        }
      })

      return msg
    }



}
