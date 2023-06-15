import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {
    SubscribeMessage, WebSocketGateway, WebSocketServer,
    OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit
  } from '@nestjs/websockets';
import { PrismaService } from "../prisma/prisma.service";
import { AdminDto } from './admin.dto';


let id = 0

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) {}

    server: Server;

	async ban(dto: object) {		
        type ObjectKey = keyof typeof dto;

		let data: AdminDto = dto as ObjectKey

        await this.prisma.roomChannel.update({
			where: {
			  name: data.channel
			},
			data: {
			  users_ban: {
				push: data.user
			  }
    	    }
        })
	}

	async admin(dto: object) {		
        type ObjectKey = keyof typeof dto;

		let data: AdminDto = dto as ObjectKey

        await this.prisma.roomChannel.update({
			where: {
			  name: data.channel
			},
			data: {
			  admin: {
				push: data.user
			  }
    	    }
        })
	}

	async mute(dto: object) {		
        type ObjectKey = keyof typeof dto;

		let data: AdminDto = dto as ObjectKey

	}

    async remove(dto: object) {		
        type ObjectKey = keyof typeof dto;

		let data: AdminDto = dto as ObjectKey

	}

	async password(dto: object) {		
        type ObjectKey = keyof typeof dto;

		let data: AdminDto = dto as ObjectKey

        await this.prisma.roomChannel.update({
			where: {
			  name: data.channel
			},
			data: {
			  is_password: true,
              password: data.user
    	    }
        })
	}

	async removePassword(dto: object) {		
        type ObjectKey = keyof typeof dto;

		let data: AdminDto = dto as ObjectKey

        await this.prisma.roomChannel.update({
			where: {
			  name: data.channel
			},
			data: {
			  is_password: false,
              password: null
    	    }
        })
	}

	async visibility(dto: object) {		
        type ObjectKey = keyof typeof dto;

		let data: AdminDto = dto as ObjectKey

        const value = await this.prisma.roomChannel.findUnique({
			where: {
			  name: data.channel
			},
        });

        if (value.private == true) {
            await this.prisma.roomChannel.update({
                where: {
                  name: data.channel
                },
                data: {
                    private: false
                }
            })
        }
        else {
            await this.prisma.roomChannel.update({
                where: {
                  name: data.channel
                },
                data: {
                    private: true
                }
            })
        }
	}

}
