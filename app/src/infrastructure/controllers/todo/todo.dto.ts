import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";

export class User {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly mail: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly username: string;
}

export class UpdateTodoDto {
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsNotEmpty()
  readonly isDone: boolean;
  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  readonly content: string;
  @ApiProperty({ required: false })
  @ValidateNested()
  readonly creator: User;
}

export class AddTodoDto {
  @ApiProperty({ required: true, example: true })
  @IsNotEmpty()
  @IsBoolean()
  readonly isDone: boolean;
  @ApiProperty({ required: true, example: "todo" })
  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
