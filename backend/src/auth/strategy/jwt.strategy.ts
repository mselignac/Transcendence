import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
    export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
        constructor(config: ConfigService, private prisma: PrismaService,
            private readonly configService: ConfigService,) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: config.get('JWT_SECRET')
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
