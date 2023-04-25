import { Body, Controller, Get, Patch, UseGuards, Req } from '@nestjs/common';
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
	  };
	}

	@Patch()
	editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
		return this.userService.editUser(userId, dto);
	}
}
