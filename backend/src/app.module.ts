import { Module } from 'aaaaa/@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from 'aaaaa/@nestjs/config';
import * as Joi from 'aaaaa/@types/hapi__joi';

@Module({
  imports: [
    AuthModule, UserModule, BookmarkModule, PrismaModule,
      ConfigModule.forRoot({
        isGlobal: true,
        validationSchema: Joi.object({
          UID: Joi.string().required(),
          SECRET: Joi.string().required(),
      })
    }),
    // ...
  ],
  // ...
})

export class AppModule {}
