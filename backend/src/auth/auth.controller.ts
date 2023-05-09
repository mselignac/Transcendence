import { Controller,
	UseGuards,
	Get,
	UseFilters,
	Req,
	Res,
	Delete
} from "@nestjs/common";
import { FortyTwoGuard } from "./guard";
import { UserService } from "src/user/user.service";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from 'express';
import { HttpExceptionFilter } from "./strategy";

@Controller('auth')
export class AuthController {
  constructor(
    private userservice: UserService,
    private config: ConfigService,
  ) {}

  //Route: "http://localhost:8080/auth/42/login" to login with 42
  @UseGuards(FortyTwoGuard)
  @Get('/42/login')
  handleLogin() {
    return;
  }

//Route: "http://localhost:8080/auth/42/redirect" 42-passport redirect from login to this route, then it will redirect to the frontend
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(FortyTwoGuard)
  @Get('42/redirect')
  async handlerRedirect(@Req() req: Request) {
	  if (req.user['twofactor'] == true) {
		//   const checkCookie = await this.userservice.signCheckToken(req.user['id']);
		//   req.res.cookie('checkJwt', checkCookie, { path: '/', httpOnly: true });
		//   req.res.redirect(this.config.get('route_qrcode'));
		} else {
			const cookie = await this.userservice.signToken(req.user['id']);
			var expiryDate = new Date(Number(new Date()) + 900000);
			req.res.cookie('jwt', cookie, { expires: expiryDate, path: '/'});
			if (req.user['firstLogin'] == true) {
				req.res.redirect(this.config.get('route_frontend'));
				// req.res.redirect(this.config.get('route_frontend_updateusername'));
			} else {
				req.res.redirect(this.config.get('route_frontend'));
			}
		}
		return;
	}

	// Route: "http://localhost:8080/auth/42/logout" to logout and redirect to the frontend
	// @UseGuards(AuthGuard('jwt'))
	@Delete('42/logout')
	async handleLogout(@Req() req: Request) {
	  req.res.cookie('jwt', '', { path: '/', httpOnly: false });
	  req.res.redirect(this.config.get('route_frontend_login'));
	  return;
	}

	// // Route: "http://localhost:8080/auth/42/check" to check if the user is logged in
	// @UseGuards(AuthGuard('jwt'))
	// @Get('42/check')
	// async handleCheck(@Req() req: Request) {
	//   return req.user;
	// }
}