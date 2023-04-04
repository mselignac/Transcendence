import { AuthGuard } from "aaaaa/@nestjs/passport";

export class JwtGuard extends AuthGuard('jwt') {
	constructor () {
		super ();
	}
}