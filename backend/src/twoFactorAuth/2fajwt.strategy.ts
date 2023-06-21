import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class twoFaJwtStrategy extends PassportStrategy(Strategy, '2faJwt') {
  // constructor(config: ConfigService, private prisma: PrismaService) {
  //   super({
  //     jwtFromRequest: ExtractJwt.fromExtractors([
  //       (request: Request) => {
  //         // This is a hack to get the token from the cookie
  //         let data = request?.headers.cookie;
  //         if (data) {
  //           if (data.includes('jwt')) {
  //             data = data.split('=')[1];
  //             return data;
  //           }
  //         } else {
  //           return null;
  //         }
  //       },
  //     ]),
  //     secretOrKey: config.get('2fajwt_secret'),
  //   });
  // }

  constructor(config: ConfigService, private prisma: PrismaService,
    private readonly configService: ConfigService,) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: config.get('2fajwt_secret')
      })
    }

  async validate(payload: { sub: string }) {
    return this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
  }
}