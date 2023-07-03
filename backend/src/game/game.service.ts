import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {
    SubscribeMessage, WebSocketGateway, WebSocketServer,
    OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit
  } from '@nestjs/websockets';
import { PrismaService } from "../prisma/prisma.service";
import { GameDto } from './game.dto';

@Injectable()
export class GameService {
    constructor(private prisma: PrismaService) {}

    server: Server;

	async game(dto: object) {
        type ObjectKey = keyof typeof dto;

		let data: GameDto = dto as ObjectKey
        await this.prisma.game.create({
            data
        });
    }

	async getGame(dto: object) {
        type ObjectKey = keyof typeof dto;

		let data: GameDto = dto as ObjectKey
        let game = await this.prisma.game.findMany({
            where: {
                user_one: data.user_one
            }
        });
        return game
    }

	async getGame2(dto: object) {
        type ObjectKey = keyof typeof dto;

		let data: GameDto = dto as ObjectKey
        let game = await this.prisma.game.findMany({
            where: {
                user_two: data.user_one
            }
        });
        return game
    }

	async ladder() {
        let ladder = await this.prisma.user.findMany({
            select: {
                login: !null,
                victory: !null
            },
            orderBy: {
                victory: 'desc'
            }
        });
        return ladder
    }
}
