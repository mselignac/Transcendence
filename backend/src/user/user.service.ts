import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RoomChannelDto, RoomDto, userDto } from 'src/chat';
import { loginDto } from './login.dto';

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
			  id: dataa.name
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
			  id: data.name
			},
			select: {
			  friends: true
			},
		  });

		  await this.prisma.user.update({
			where: {
				id: data.name
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
				// name: dataa.name
			},
			select: {
				users_ban: !null
			}
		})

		if (ban) {
			if (!ban.users_ban.find(t => t === dataa.name)) {
				await this.prisma.user.update({
				where: {
				//   login: dataa.id
				id: dataa.name
				},
				data: {
				channels: {
					// push: dataa.name
					push: dataa.users[0]
				}
				}})
			}
			// else if (ban[0] == undefined) {
			// 	await this.prisma.user.update({
			// 	where: {
			// 	//   login: dataa.id
			// 	id: dataa.name
			// 	},
			// 	data: {
			// 	channels: {
			// 		// push: dataa.name
			// 		push: dataa.users[0]
			// 	}
			// 	}})
			// }
		}
		else {
			await this.prisma.user.update({
				where: {
					// login: dataa.id
				  id: dataa.name
				},
				data: {
				  channels: {
					push: dataa.users[0]
					// push: dataa.name
				  }
				}})
		}

	}

	async removeChannel(dto: object) {
		type ObjectKey = keyof typeof dto;

		let data: RoomDto = dto as ObjectKey

		const { channels } = await this.prisma.user.findUnique({
			where: {
			  id: data.name
			},
			select: {
			  channels: true
			},
		  });

		  await this.prisma.user.update({
			where: {
				id: data.name
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
				id: data.name
			},
			data: {
				blocked: {
					push: data.user_one
				}
			}
		})

		const { requests } = await this.prisma.user.findUnique({
			where: {
				id: data.user_one
			  },
			  select: {
				requests: true
			  },
			});

		await this.prisma.user.update({
			where: {
				id: data.user_one
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
				id: data.name
			  },
			  select: {
				blocked: true
			  },
			});

		await this.prisma.user.update({
			where: {
				id: data.name
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
				id: data.name
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
		try {
				await this.prisma.user.update({
					where: {
						id: data.name
					},
					data: {
						online: true
					}
				})
		} catch (error) {
		}
	}

	async offline(dto: object) {
		type ObjectKey = keyof typeof dto;

		let data: RoomDto = dto as ObjectKey
		try {
				await this.prisma.user.update({
					where: {
						id: data.name
					},
					data: {
						online: false
					}
				})
		} catch (error) {
		}
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
			  id: true,
			  online: !null
			},
		})

		return (users)

	}

	async addVictory(dto: object) {
		type ObjectKey = keyof typeof dto;

		let data: userDto = dto as ObjectKey
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




	async changeUsername(dto: object) {
		type ObjectKey = keyof typeof dto;

		let data: loginDto = dto as ObjectKey


		const user = await this.prisma.user.findUnique({
			where: { login: data.new },
		});
		if (!user) {
			await this.prisma.user.update({
				where: { login: data.old },
				data: { login: data.new },
			});
			await this.prisma.message.updateMany({
				where: { username: data.old },
				data: { username: data.new },
			});
			await this.prisma.game.updateMany({
				where: { user_one: data.old },
				data: { user_one: data.new }
			})
			await this.prisma.game.updateMany({
				where: { user_two: data.old },
				data: { user_two: data.new }
			})
			await this.prisma.game.updateMany({
				where: { victory: data.old },
				data: { victory: data.new }
			})
			await this.prisma.mute.updateMany({
				where: { user: data.old },
				data: { user: data.new }
			})
			// await this.prisma.room.updateMany({
			// 	where: { user_one: data.old },
			// 	data: { user_one: data.new }
			// })
			// await this.prisma.room.updateMany({
			// 	where: { user_two: data.old },
			// 	data: { user_two: data.new }
			// })
			await this.prisma.roomChannel.updateMany({
				where: { owner: data.old },
				data: { owner: data.new }
			})
		}
		else {
			throw new Error('Username already exists');
		}
	}


// friends / users / admins / blocked / ban / request  => trouver comment changer facilement dans un tableau



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

	async updateAvatar(url: string, id: string) {
		return this.prisma.user.update({
			where: { id },
			data: { avatarUrl: url },
		});
	}
}
