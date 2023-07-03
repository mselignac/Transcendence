import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RoomChannelDto, RoomDto, userDto } from 'src/chat';

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

		let ban = await this.prisma.roomChannel.findUnique({
			where: {
				name: dataa.users[0]
			},
			select: {
				users_ban: !null
			}
		})

		if (ban && !ban.users_ban.find(t => t === dataa.name)) {
			await this.prisma.user.update({
			where: {
			  login: dataa.name
			},
			data: {
			  channels: {
				push: dataa.users[0]
			  }
			}})
		}
		else if (!ban) {
			await this.prisma.user.update({
				where: {
				  login: dataa.name
				},
				data: {
				  channels: {
					push: dataa.users[0]
				  }
				}})
		}

	}

	async removeChannel(dto: object) {
		type ObjectKey = keyof typeof dto;

		let data: RoomDto = dto as ObjectKey

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

	async block(dto: object) {
		type ObjectKey = keyof typeof dto;

		let data: RoomDto = dto as ObjectKey
		await this.prisma.user.update({
			where: {
				login: data.name
			},
			data: {
				blocked: {
					push: data.user_one
				}
			}
		})

		const { requests } = await this.prisma.user.findUnique({
			where: {
				login: data.user_one
			  },
			  select: {
				requests: true
			  },
			});

		await this.prisma.user.update({
			where: {
				login: data.user_one
			},
			data: {
			requests: {
				set: requests.filter((id) => id !== data.name),
			},
			},
		});
	}

	async unblock(dto: object) {
		type ObjectKey = keyof typeof dto;

		let data: RoomDto = dto as ObjectKey
		const { blocked } = await this.prisma.user.findUnique({
			where: {
				login: data.name
			  },
			  select: {
				blocked: true
			  },
			});

		await this.prisma.user.update({
			where: {
				login: data.name
			},
			data: {
			blocked: {
				set: blocked.filter((id) => id !== data.user_one),
			},
			},
		});
	}

	async isBlocked(dto: object) {
		type ObjectKey = keyof typeof dto;

		let data: RoomDto = dto as ObjectKey
		let blocked = await this.prisma.user.findUnique({
			where: {
				login: data.name
			},
		})

		if (blocked.blocked.find(t => t === data.user_one))
			return true
		else
			return false
	}

	async isRequest(dto: object) {
		type ObjectKey = keyof typeof dto;

		let data: RoomDto = dto as ObjectKey
		let requests = await this.prisma.user.findUnique({
			where: {
				login: data.name
			},
		})

		if (requests.requests.find(t => t === data.user_one))
			return true
		else
			return false
	}

	async isConnected(dto: object) {
		type ObjectKey = keyof typeof dto;

		let data: RoomDto = dto as ObjectKey
		let user = await this.prisma.user.findUnique({
			where: {
				login: data.name
			},
		})

		// if (user.online)
		// 	return true
		// else
		// 	return false
		return (user.online)
	}

	async online(dto: object) {
		type ObjectKey = keyof typeof dto;

		let data: RoomDto = dto as ObjectKey
		await this.prisma.user.update({
			where: {
				id: data.name
			},
			data: {
				online: true
			}
		})

	}

	async offline(dto: object) {
		type ObjectKey = keyof typeof dto;

		let data: RoomDto = dto as ObjectKey
		await this.prisma.user.update({
			where: {
				id: data.name
			},
			data: {
				online: false
			}
		})

	}

	async friendsOnline(dto: object) {
		type ObjectKey = keyof typeof dto;

		let data: userDto = dto as ObjectKey
		let users = await this.prisma.user.findMany({
			where: {
				// friends:  { in: data.login }
				friends: {
					hasEvery: [data.login],
				  },
			},
			select: {
			  login: !null,
			  online: !null
			},
		})

		return (users)

	}

	async addVictory(dto: object) {
		type ObjectKey = keyof typeof dto;

		let data: userDto = dto as ObjectKey
		console.log("ici");
		console.log(data);
		let user = await this.prisma.user.update({
			where: {
				login: data.login
			},
			data: {
				victory: {increment: 1}
			}
		})

		// return (user)

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

	async turnOnTwoFactorAuthentication(email: string) {
		return this.prisma.user.update({
		  where: { email },
		  data: { twofactor: true },
		});
	}

	async sign2faToken(id: string) {
		const payload = {
		  sub: id,
		};
		const token = await this.jwt.signAsync(payload, {
		  expiresIn: this.config.get('jwt_expiresIn'),
		  secret: this.config.get('2fajwt_secret'),
		});
		return token;
	}


}
