import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class twoFaJwtStrategy extends PassportStrategy(Strategy, '2faJwt') {

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