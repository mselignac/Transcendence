import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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
		// delete user.hash;

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
}
