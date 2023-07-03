import { Injectable } from '@nestjs/common';
import { PutObjectCommand, GetObjectCommand , S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
	private readonly s3Client = new S3Client({
		region: this.configService.getOrThrow('AWS_REGION'),
	});

	constructor(private readonly configService: ConfigService) {}

	async upload(fileName: string, file: Express.Multer.File) {
		await this.s3Client.send(
			new PutObjectCommand({
				Bucket: this.configService.getOrThrow('AWS_PUBLIC_BUCKET_NAME'),
				Key: fileName,
				Body: file.buffer,
				ContentType: file.mimetype,
				ACL: 'public-read',
			}),
		);
		fileName = encodeURIComponent(fileName.replace(/\s/g, "+")).replace(/%2B/g, "+");
		return `https://${this.configService.getOrThrow('AWS_PUBLIC_BUCKET_NAME')}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${fileName}`;
	}
}
