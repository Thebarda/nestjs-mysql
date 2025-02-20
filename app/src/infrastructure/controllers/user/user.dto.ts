import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class Todo {
	@ApiProperty({ required: true })
	@IsNotEmpty()
	@IsNumber()
	readonly id: number;
	@ApiProperty({ required: true })
	@IsNotEmpty()
	@IsString()
	readonly content: string;
	@ApiProperty({ required: true })
	@IsNotEmpty()
	@IsBoolean()
	readonly isDone: boolean;
}

export class UpdateUserDto {
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

export class AddUserDto {
	@ApiProperty({ required: true })
	@IsNotEmpty()
	@IsString()
	readonly mail: string;
	@ApiProperty({ required: true })
	@IsNotEmpty()
	@IsString()
	readonly username: string;
	@ApiProperty({ required: true })
	@IsNotEmpty()
	@IsString()
	readonly password: string;
}
