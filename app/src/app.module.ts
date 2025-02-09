import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeormConfigModule } from "./infrastructure/config/typeorm/typeorm.module";
import { ControllersModule } from "./infrastructure/controllers/controllers.module";
import { ExceptionsModule } from "./infrastructure/exceptions/exceptions.module";
import { LoggerModule } from "./infrastructure/logger/logger.module";
import { RepositoriesModule } from "./infrastructure/repositories/repositories.module";
import { JwtModule } from "./infrastructure/services/jwt/jwt.module";

@Module({
	imports: [
		JwtModule,
		ConfigModule.forRoot(),
		TypeormConfigModule,
		LoggerModule,
		ExceptionsModule,
		RepositoriesModule,
		ControllersModule,
	],
})
export class AppModule {}
