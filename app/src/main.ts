import { NestFactory } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { LoggerService } from "./infrastructure/logger/logger.service";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";
import { LoggingInterceptor } from "./interceptors/logger.interceptor";
import { ResponseInterceptor } from "./interceptors/response.interceptor";
import { AllExceptionFilter } from "./middleware/exceptions";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
	app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
	app.useGlobalInterceptors(new ResponseInterceptor());
	app.useGlobalInterceptors(new JwtInterceptor(new JwtService()));
	app.use(cookieParser());

	const config = new DocumentBuilder()
		.setTitle("Todos example")
		.setDescription("The todos API description")
		.setVersion("1.0")
		.addTag("todo")
		.addTag("user")
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, documentFactory);

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
