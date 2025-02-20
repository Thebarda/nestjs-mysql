import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DatabaseUserModule } from "../user/user.module";
import { AuthRepositoryService } from "./auth.service";

@Module({
	imports: [JwtModule, DatabaseUserModule],
	providers: [AuthRepositoryService],
	exports: [AuthRepositoryService],
})
export class AuthRepositoryModule {}
