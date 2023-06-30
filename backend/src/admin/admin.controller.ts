import { AdminService } from './admin.service';
import { Body, Controller, Get, Patch, Req , Post } from '@nestjs/common';

@Controller('admin')
export class AdminController {
	constructor(private adminService: AdminService) {}

	@Post('ban')
	ban(@Body() dto: object) {
		return this.adminService.ban(dto)
	}

	@Post('admin')
	admin(@Body() dto: object) {
		return this.adminService.admin(dto)
	}

	@Post('mute')
	mute(@Body() dto: object) {
		return this.adminService.mute(dto)
	}

	@Post('password')
	password(@Body() dto: object) {
		return this.adminService.password(dto)
	}

	@Post('removepassword')
	removePassword(@Body() dto: object) {
		return this.adminService.removePassword(dto)
	}

	@Post('visibility')
	visibility(@Body() dto: object) {
		return this.adminService.visibility(dto)
	}
}
