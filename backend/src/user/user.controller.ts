import { Body, Controller, Get, Patch, UseGuards, Req, Res, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}

	// @Get('me')
	// getMe(@GetUser() user: User) {
	// 	return user;
	// }

	@UseGuards(AuthGuard('jwt'))
	@Get('me')
	getMe(@Req() req) {
	  return {
		id: req.user.id,
		losses: req.user.Losses,
		wins: req.user.Wins,
		avatar: req.user.avatarUrl,
		country: req.user.country,
		email: req.user.email,
		fullName: req.user.fullName,
		username: req.user.login,
		phoneNumber: req.user.phonenumber,
		score: req.user.score,
		twoFactor: req.user.twofactor,
		createdAt: req.user.createdAt,
		updatedAt: req.user.updatedAt,

		friends: req.user.friends,
		channels: req.user.channels
		};
	}

	@Patch()
	editUser(@GetUser('id') userId: string, @Body() dto: EditUserDto) {
		return this.userService.editUser(userId, dto);
	}
	
	@Post('addfriend')
	addFriend(@Body() dto: object) {
		return this.userService.addFriend(dto) ;
	}

	@Post('addchannel')
	addChannel(@Body() dto: object) {
		return this.userService.addChannel(dto) ;
	}
}