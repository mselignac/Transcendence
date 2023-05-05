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


@Module({
  imports: [ChatModule, PongModule, AuthModule, UserModule, BookmarkModule, PrismaModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    })],
  controllers: [PongController],
  providers: [PongGateway, PongService, JwtService, ChatGateway]
})
export class AppModule {}