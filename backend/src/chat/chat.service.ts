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
import { userDto } from './user.dto';

let id = 0

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) {}

    server: Server;




////////////////////////
// select: {          //
//   channels: true   //
////////////////////////




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


    async findUser(dto: object) {
      type ObjectKey = keyof typeof dto;

      let data: userDto = dto as ObjectKey

      let user = await this.prisma.user.findUnique({
        where: {
          login: data.login
        }
      })
      if (user)
        return (user)
    }

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

    async sendFriendRequest(dto: object) {
      type ObjectKey = keyof typeof dto;

      let data: RoomDto = dto as ObjectKey

      await this.prisma.user.update({
        where: {
          login: data.name
        },
        data: {
          requests: {
            push: data.user_one
          }
        }
      })
    }

    async removeRequest(dto: object) {
      type ObjectKey = keyof typeof dto;

      let data: RoomDto = dto as ObjectKey

      const { requests } = await this.prisma.user.findUnique({
        where: {
          login: data.name
        },
        select: {
          requests: true
        },
      });
      await this.prisma.user.update({
        where: {
          login: data.name
        },
        data: {
          requests: {
            set: requests.filter((id) => id !== data.user_one),
          }
        }
      })
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
        await this.prisma.roomChannel.update({
          where: {
            name: data.name
          },
          data: {
            owner: data.users[0],
            admin: {
              push: data.users[0]
            }
          },
        })
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

    async removeUser(dto: object) {

      type ObjectKey = keyof typeof dto;

      let data: RoomDto = dto as ObjectKey

      const { users } = await this.prisma.roomChannel.findUnique({
        where: {
          name: data.name
        },
        select: {
          users: true
        },
        });

        await this.prisma.roomChannel.update({
        where: {
          name: data.name
        },
        data: {
          users: {
          set: users.filter((id) => id !== data.user_one),
          },
        },
      });
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

    async publicsChannels() {
      let channels = await this.prisma.roomChannel.findMany({
        where: {
          private: false
        },
      })

      return channels
    }

    async checkPassword(dto: object) {
      type ObjectKey = keyof typeof dto;

      let data: RoomChannelDto = dto as ObjectKey

      let room = await this.prisma.roomChannel.findUnique({
        where: {
          name: data.name
        }
      })

      if (room.password == data.users[0])
        return (true)
      else
        return (false)

    }

}
