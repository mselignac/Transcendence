import { Module } from "aaaaa/@nestjs/common";
import { JwtModule } from "aaaaa/@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy";

@Module({
	imports: [JwtModule.register({
		secret: process.env.SECRET,
		signOptions: { expiresIn: '60s' },
	})],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
