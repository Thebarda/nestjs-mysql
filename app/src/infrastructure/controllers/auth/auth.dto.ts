import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {
	@ApiProperty({ required: false })
	@IsString()
	@IsNotEmpty()
	readonly mail: string;
	@ApiProperty({ required: false })
	@IsString()
	@IsNotEmpty()
	readonly username: string;
	@ApiProperty({ required: false })
	@IsString()
	@IsNotEmpty()
	readonly password: string;
}

export class SignInDto {
	@ApiProperty({ required: false })
	@IsString()
	@IsNotEmpty()
	readonly username: string;
	@ApiProperty({ required: false })
	@IsString()
	@IsNotEmpty()
	readonly password: string;
}
