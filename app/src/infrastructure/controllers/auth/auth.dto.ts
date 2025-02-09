import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {
	@ApiProperty({ required: true })
	@IsNotEmpty()
	@IsString()
	readonly mail: string;
	@ApiProperty({ required: true })
	@IsNotEmpty()
	@IsString()
	readonly password: string;
}
