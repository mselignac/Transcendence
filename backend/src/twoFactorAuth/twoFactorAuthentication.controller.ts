import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Req,
	Res,
	ForbiddenException,
	UseGuards,
  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { twofactorCode } from './dto/twoFactorCode.dto';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
import { UserService } from 'src/user/user.service';
import { JwtGuard } from 'src/auth/guard';
import { twoFaJwtStrategy } from './2fajwt.strategy';

  @Controller('2fa')
  export class TwoFactorAuthenticationController {
	constructor(
	  private readonly twofactor: TwoFactorAuthenticationService,
	  private readonly userService: UserService,
	) {}

	//Route: "http://localhost:3000/2fa/generate" to generate the secret and the qr code
	@UseGuards(JwtGuard)
	@Get('generate')
	async register(@Res() response: Response, @Req() request: Request) {
	  const { otpauthUrl } = await this.twofactor.generateSecret(request.user);
	  response.setHeader('content-type', 'image/png');
	  return this.twofactor.pipeQrCodeStream(response, otpauthUrl);
	}

	isNumber(str: string) {
	  const pattern = /^\d+$/;
	  return pattern.test(str);
	}

	validateData(code: string) {
	  if (!code) {
		throw new ForbiddenException('Code is required');
	  }
	  if (!this.isNumber(code)) {
		throw new ForbiddenException('Code must be a number');
	  }
	  if (code.length !== 6) {
		throw new ForbiddenException('Code must be 6 digits');
	  }
	}

	//Route: "http://localhost:3000/2fa/turn-on" to validate the code and turn on the 2fa
	@UseGuards(JwtGuard)
	@Post('turn-on')
	@HttpCode(200)
	async turnOnTwoFactorAuth(@Req() request, @Body() twofactorCode: twofactorCode) {
	  this.validateData(twofactorCode.code);
	  const isCodeValid = this.twofactor.isTwoFactorAuthenticationValid(
		twofactorCode.code,
		request.user,
	  );
	  if (!isCodeValid) {
		throw new ForbiddenException('Wrong Authentication Code');
	  }
	  await this.userService.turnOnTwoFactorAuthentication(request.user.email);
	  return { statusCode: 200, message: 'Authenticated' };
	}

	//Route: "http://localhost:3000/2fa/authenticate" to validate the code and authenticate the user
	@UseGuards(AuthGuard('2faJwt'))
	@Post('authenticate')
	@HttpCode(200)
	async authenticate(@Req() request, @Body() twofactorCode: twofactorCode) {
	  this.validateData(twofactorCode.code);
	  const isCodeValid = this.twofactor.isTwoFactorAuthenticationValid(
		twofactorCode.code,
		request.user,
	  );
	  if (!isCodeValid) {
		throw new ForbiddenException('Wrong Authentication Code');
	  }
	  const cookie = await this.userService.signToken(request.user['id']);
	  return { statusCode: 200, message: 'Authenticated', jwt: cookie };
	}

	//Route: "http://localhost:3000/2fa/disable2fa" to disable the 2fa
	@UseGuards(JwtGuard)
	@Post('disable2fa')
	@HttpCode(200)
	async disable2fa(@Req() request) {
	  await this.twofactor.disableTwoFactorAuthentication(request.user);
	  return { statusCode: 200, message: '2fa disabled' };
	}
  }
