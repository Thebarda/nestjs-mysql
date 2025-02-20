import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeormConfigModule } from "src/infrastructure/config/typeorm/typeorm.module";
import { User } from "src/infrastructure/entities/user.entity";
import { DatabaseUserService } from "./user.service";

@Module({
	imports: [TypeormConfigModule, TypeOrmModule.forFeature([User])],
	providers: [DatabaseUserService],
	exports: [DatabaseUserService],
})
export class DatabaseUserModule {}
