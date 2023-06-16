import { ChatService } from './chat.service';
import { Body, Controller, Get, Patch, Req , Post } from '@nestjs/common';
import { userDto } from './user.dto';

@Controller('chat')
export class ChatController {
	constructor(private chatService: ChatService) {}

	@Post('createroom')
	createRoom(@Body() dto: object) {
	  return this.chatService.createRoom(dto) ;
	}

	@Post('findroom')
	findRoom(@Body() dto: object) {
	  return this.chatService.findRoom(dto) ;
	}

	@Post('createroomchannel')
	createRoomChannel(@Body() dto: object) {
	  return this.chatService.createRoomChannel(dto) ;
	}

	@Post('findroomchannel')
	findRoomChannel(@Body() dto: object) {
	  return this.chatService.findRoomChannel(dto) ;
	}

	@Post('editchannel')
    editRoom(@Body() dto: object) {
		return this.chatService.editRoom(dto)
	}

	@Post('addmessage')
	addMessage(@Body() dto: object) {
		return this.chatService.addMessage(dto)
	}

	@Get('getmsg')
	getMsg(@Req() req) {
		return this.chatService.getMsg(req.query)
	}

	@Post('addmsgchannel')
	addMsgChannel(@Body() dto: object) {
		return this.chatService.addMsgChannel(dto)
	}

	@Get('getmsgchannel')
	getMsgChannel(@Req() req) {
		return this.chatService.getMsgChannel(req.query)
	}

	@Get('finduser')
	findUser(@Req() req) {
		// console.log(req.query.dto)
		return this.chatService.findUser(req.query.dto)
	}

	@Get('publicschannels')
	publicsChannels() {
		return this.chatService.publicsChannels()
	}

	@Post('friendsrequests')
	sendFriendRequest(@Body() dto: object) {
		return this.chatService.sendFriendRequest(dto)
	}

	@Post('removerequest')
	removeRequest(@Body() dto: object) {
		return this.chatService.removeRequest(dto)
	}

	@Post('removeuser')
	removeUser(@Body() dto: object) {
		// console.log('removeUser back')
		return this.chatService.removeUser(dto)
	}

	@Post('checkpassword')
	checkPassword(@Body() dto: object) {
		return this.chatService.checkPassword(dto)
	}

	@Post('ismute')
	isMute(@Body() dto:object) {
		return this.chatService.isMute(dto)
	}

	// @Get('getuserid')
	// getUserId(@Req() req)//, @Body() dto: userDto)
	// {
	// 	console.log('ooooooooooooooooo -> ', req)
	// 	return this.getUserId(req.query.dto)
	// }

}
