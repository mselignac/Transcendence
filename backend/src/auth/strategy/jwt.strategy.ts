import { Injectable } from "aaaaa/@nestjs/common"
import { ConfigService } from "aaaaa/@nestjs/config"
import { PassportStrategy } from "aaaaa/@nestjs/passport"
import { ExtractJwt, Strategy } from "aaaaa/@types/passport-jwt"
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy, 'jwt',
    ) {
        constructor (config: ConfigService, private prisma: PrismaService) {
            super ({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: config.get('JWT_SECRET'),
            });
        }

        // async validate(payload: {sub: number, email: string}) {
        //     const user = await this.prisma.user.findUnique({
        //         where: {
        //             id: payload.sub,
        //         },
        //     });
        //     delete user.hash;
        //     return user;
        // }
    }