import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UserGateway } from './user.gateway';
import { UploadService } from 'src/upload/upload.service';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtService, UserGateway, UploadService],
  exports: [UserService],
})
export class UserModule {}
