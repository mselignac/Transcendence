import { IsOptional, IsString } from "class-validator"

export class RoomChannelDto {
    name: string
	users: string[]
}
