import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { PrismaService } from "../../prisma/prisma.service";
import { Request } from 'express';

@Injectable()
    export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
        constructor(config: ConfigService, private prisma: PrismaService,
            private readonly configService: ConfigService,) {
        super({
          //   jwtFromRequest: ExtractJwt.fromExtractors([
          //       (request: Request) => {
          //         // This is a hack to get the token from the cookie
          //         let data = request?.headers.cookie;
          //         if (data) {
          //           let token = data.split('; ').find((row) => row.startsWith('jwt='));
          //           if (token) {
          //             token = token.split('=')[1];
          //             return token;
          //           }
          //         } else {
          //           return null;
          //         }
          //       },
          //     ]),
          //     secretOrKey: config.get('JWT_SECRET'),
          //   });
          // }

          jwtFromRequest: ExtractJwt.fromExtractors([
              (request: Request) => {
                  return request?.cookies?.Authentication;
          }]),
          secretOrKey: config.get('JWT_SECRET')});
      }

          async validate(payload: { sub: string }) {
            return this.prisma.user.findUnique({
              where: {
                id: payload.sub,
              },
            });
          }
        }








//         async validate(payload: { sub: string }) {
//           return this.prisma.user.findUnique({
//             where: {
//               id: payload.sub,
//             },
//         });
//     }
// }
