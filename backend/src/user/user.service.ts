import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RoomChannelDto, RoomDto } from 'src/chat';

@Injectable()
export class UserService {
	constructor (
		private prisma: PrismaService,
		private jwt: JwtService,
		private config: ConfigService) {}

	async editUser(userId: string, dto: EditUserDto) {
		const user = await this.prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				...dto,
			},
		});
		return user;
	}

	async signToken(id: string) {
		const payload = {
		  sub: id,
		};
		const token = await this.jwt.signAsync(payload, {
		  expiresIn: this.config.get('jwt_expiresIn'),
		  secret: this.config.get('JWT_SECRET'),
		});
		return token;
	}

	async addFriend(dto: object) {

		type ObjectKey = keyof typeof dto;

		let dataa: RoomChannelDto = dto as ObjectKey

		await this.prisma.user.update({
			where: {
			  login: dataa.name
			},
			data: {
			  friends: {
				push: dataa.users[0]
			  }
	}})}

	async removeFriend(dto: object) {
		type ObjectKey = keyof typeof dto;

		let data: RoomDto = dto as ObjectKey

		const { friends } = await this.prisma.user.findUnique({
			where: {
			  login: data.name
			},
			select: {
			  friends: true
			},
		  });

		  await this.prisma.user.update({
			where: {
				login: data.name
			},
			data: {
			  friends: {
				set: friends.filter((id) => id !== data.user_one),
			  },
			},
		  });
	}

	async addChannel(dto: object) {

		type ObjectKey = keyof typeof dto;

		let dataa: RoomChannelDto = dto as ObjectKey

		await this.prisma.user.update({
			where: {
			  login: dataa.name
			},
			data: {
			  channels: {
				push: dataa.users[0]
			  }
	}})}

	async removeChannel(dto: object) {
		type ObjectKey = keyof typeof dto;

		let data: RoomDto = dto as ObjectKey

		console.log(data)
		const { channels } = await this.prisma.user.findUnique({
			where: {
			  login: data.name
			},
			select: {
			  channels: true
			},
		  });

		  await this.prisma.user.update({
			where: {
				login: data.name
			},
			data: {
			  channels: {
				set: channels.filter((id) => id !== data.user_one),
			  },
			},
		  });
	}

	//Update user username
	async editUsername(id: string, username: string) {
		const user = await this.prisma.user.findUnique({
			where: { login: username },
		});
		if (!user) {
			const user = await this.prisma.user.update({
				where: { id },
				data: { login: username, },
			});
			return user;
		}
		else {
			throw new Error('Username already exists');
		}
	}
}
