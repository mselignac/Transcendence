import {
	Controller,
	ParseFilePipe,
	Post,
	UploadedFile,
	UseInterceptors,
	MaxFileSizeValidator,
	FileTypeValidator,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { UploadService } from './upload.service';

  @Controller('upload')
  export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

	@Post()
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(@UploadedFile() file: Express.Multer.File) {
		console.log(file.originalname)
		await this.uploadService.upload(file.originalname, file.buffer);
	}
}