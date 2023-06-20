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

	@Get('me')
	getMe(@GetUser() user: User) {
		return user;
	}

	@Patch()
	editUser(@Req() req, @Body() dto: EditUserDto) {
		return this.userService.editUser(req.user.login, dto);
	}

	//Update user username
	@Patch('username')
	editUsername(@Req() req, @Body() dto: EditUserDto) {
		return this.userService.editUsername(req.user.id, dto.username);
	}

	@Post('addfriend')
	addFriend(@Body() dto: object) {
		return this.userService.addFriend(dto) ;
	}

	@Post('removefriend')
	removeFriend(@Body() dto: object) {
		return this.userService.removeFriend(dto) ;
	}

	@Post('addchannel')
	addChannel(@Body() dto: object) {
		return this.userService.addChannel(dto) ;
	}

	@Post('removechannel')
	removeChannel(@Body() dto: object) {
		return this.userService.removeChannel(dto) ;
	}
}