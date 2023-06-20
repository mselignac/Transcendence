import { Module } from '@nestjs/common';
import { TwoFactorAuthenticationController } from './twoFactorAuthentication.controller';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
import { JwtStrategy } from 'src/auth/strategy';
import { UserModule } from 'src/user/user.module';
import { twoFaJwtStrategy } from './2fajwt.strategy';

@Module({
  imports: [UserModule],
  controllers: [TwoFactorAuthenticationController],
  providers: [TwoFactorAuthenticationService, JwtStrategy,twoFaJwtStrategy],
})
export class twoFactorAuthentication {}
