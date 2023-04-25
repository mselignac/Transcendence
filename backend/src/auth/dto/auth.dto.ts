import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
	id: string;
	username: string;
	displayName: string;
	lastName: string;
	firstName: string;
	email: string;
	avatarUrl: string;
}
