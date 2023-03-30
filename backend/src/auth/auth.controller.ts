import { Controller, Post, Body, HttpStatus, HttpException} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
// export class AuthControler {
// 	constructor(private authService: AuthService) {}

// 	@Post('signup')
// 	signup(@Body() dto: AuthDto) {return this.authService.signup(dto)};

// 	@HttpCode(HttpStatus.OK)
// 	@Post('signin')
// 	signin(@Body() dto: AuthDto) {
// 		return this.authService.signin(dto)
// 	};
// }
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() loginDto: AuthDto) {
	  const user = await this.authService.validateUser(loginDto);
	  if (!user) {
		throw new HttpException('Invalid login credentials', HttpStatus.UNAUTHORIZED);
	  }
	  const token = await this.authService.getAccessToken(user.login);
	  return { token };
	}
}
