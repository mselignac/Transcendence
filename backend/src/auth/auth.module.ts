import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { FortyTwoStrategy } from "./strategy/FortyTwoStrategy";
import { JwtStrategy } from "./strategy";
import { PassportModule, PassportSerializer } from '@nestjs/passport';
import { UserModule } from "src/user/user.module";


@Module({
	imports: [
	JwtModule.register({}),
	PassportModule.register({ defaultStrategy: '42' }),
	UserModule
	],
	controllers: [AuthController],
	providers: [FortyTwoStrategy, AuthService, JwtStrategy],
})
export class AuthModule {}
