import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeormConfigModule } from "./infrastructure/config/typeorm/typeorm.module";
import { ControllersModule } from "./infrastructure/controllers/controllers.module";
import { ExceptionsModule } from "./infrastructure/exceptions/exceptions.module";
import { LoggerModule } from "./infrastructure/logger/logger.module";

@Module({
	imports: [
		JwtModule,
		LoggerModule,
		ConfigModule.forRoot(),
		ExceptionsModule,
		TypeormConfigModule,
		ControllersModule,
	],
})
export class AppModule {}
