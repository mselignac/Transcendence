import { ChatService } from './chat.service';
import { Body, Controller, Get, Patch, Req , Post } from '@nestjs/common';
import { RoomDto } from './room.dto';

// let id = 0

@Controller('chat')
export class ChatController {
	constructor(private chatService: ChatService) {}

	// @Get('me')
	// getMe(@GetUser() user: User) {dv
	// 	return user;
	// }

	// @Get('me')
	// getMe(@Req() req) {
	//   return {
	// 	id: req.user.id,
	//   };
	// }


	@Post('createroom')
	createRoom(@Body() dto: object) {
	  return this.chatService.createRoom(dto) ;
	}

	@Post('findroom')
	findRoom(@Body() dto: object) {
		// console.log('=============')
		// console.log(typeof(dto))
		// console.log({dto})
	  return this.chatService.findRoom(dto) ;
	}

	@Post('createroomchannel')
	createRoomChannel(@Body() dto: object) {
	  return this.chatService.createRoomChannel(dto) ;
	}

	@Post('findroomchannel')
	findRoomChannel(@Body() dto: object) {
		// console.log('=============')
		// console.log(typeof(dto))
		// console.log({dto})
	  return this.chatService.findRoomChannel(dto) ;
	}

	@Post('editchannel')
    editRoom(@Body() dto: object) {
		return this.chatService.editRoom(dto)
	}


	// @Patch()
	// editUser(@GetUser('id') userId: string, @Body() dto: RoomDto) {
	// 	return this.chatService.editRoom(userId, dto);
	// }
}
