import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PongController } from './pong/pong.controller';
import { PongModule } from './pong/pong.module';
import { PongGateway } from './pong.gateway';
import { PongService } from './pong/pong.service';
import { ChatGateway } from './chat/chat.gateway';
import { JwtService } from '@nestjs/jwt';
import { ChatModule } from './chat/chat.module';
import { twoFactorAuthentication } from './twoFactorAuth/twoFactorAuthentication.module';
import { AdminModule } from './admin/admin.module';
import { UserGateway } from './user/user.gateway';
import { UploadModule } from './upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [AdminModule, ChatModule, PongModule, AuthModule, UserModule, BookmarkModule, PrismaModule,
    twoFactorAuthentication,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UploadModule,
    // MulterModule.register({
    //   dest: './files',
    // })
  ],
  controllers: [PongController],
  providers: [PongGateway, PongService, JwtService, ChatGateway, UserGateway]
})
export class AppModule {}