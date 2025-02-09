import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AuthGuard } from "./infrastructure/guard/auth.guard";
import { LoggerService } from "./infrastructure/logger/logger.service";
import { LoggingInterceptor } from "./interceptors/logger.interceptor";
import { ResponseInterceptor } from "./interceptors/response.interceptor";
import { AllExceptionFilter } from "./middleware/exception.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
	app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
	app.useGlobalInterceptors(new ResponseInterceptor());

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
