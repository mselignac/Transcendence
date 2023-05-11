import { IsEmail, IsOptional, IsString , IsNotEmpty } from "class-validator"

export class EditUserDto {
	@IsEmail()
	@IsOptional()
	email?: string

	@IsString()
	@IsOptional()
	firstName?: string

	@IsString()
	@IsOptional()
	lastName?: string

	@IsString()
	@IsOptional()
	@IsNotEmpty()
	username?: string
}