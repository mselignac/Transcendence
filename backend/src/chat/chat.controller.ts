import { ChatService } from './chat.service';
import { Body, Controller, Get, Patch, Req , Post } from '@nestjs/common';
import { RoomDto } from './room.dto';

@Controller('chat')
export class ChatController {
	constructor(private chatService: ChatService) {}

	// @Get('me')
	// getMe(@GetUser() user: User) {dv
	// 	return user;
	// }

	@Get('me')
	getMe(@Req() req) {
	  return {
		id: req.user.id,
	  };
	}

	@Post('createroom')
	createRoom(@Body() dto: RoomDto) {
		console.log(typeof(dto));
		// let tmp = JSON.stringify(dto);
		console.log({dto}); 
        // console.log(dto)
        // console.log('iciii')
	  return this.chatService.createRoom(dto) ;
	}

	// @Post('createroom')
	// createRoom(@Body() dto: string) {
    //     console.log('iciii')
    //     console.log(dto)
    //     console.log('iciii')
	//   return this.chatService.createRoom(dto) ;
	// }


	// @Patch()
	// editUser(@GetUser('id') userId: string, @Body() dto: RoomDto) {
	// 	return this.chatService.editRoom(userId, dto);
	// }
}













// import { Controller, Post, Body, HttpCode, HttpStatus} from "@nestjs/common";
// import { AuthService } from "./auth.service";
// import { AuthDto } from "./dto";

// @Controller('auth')
// export class AuthControler {
// 	constructor(private authService: AuthService) {}

// 	@Post('signup')
// 	signup(@Body() dto: AuthDto) {return this.authService.signup(dto)};

// 	@HttpCode(HttpStatus.OK)
// 	@Post('signin')
// 	signin(@Body() dto: AuthDto) {
// 		return this.authService.signin(dto)
// 	};

// }
