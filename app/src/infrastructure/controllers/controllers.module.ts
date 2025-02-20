import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { AuthUsecasesModule } from "src/usecases/auth/auth.usecases";
import { TodoUseCasesModule } from "src/usecases/todo/todo.usecase";
import { UserUseCasesModule } from "src/usecases/user/user.usecase";
import { AuthGuard } from "../guards/auth.guard";
import { AuthController } from "./auth/auth.controller";
import { TodoController } from "./todo/todo.controller";
import { UserController } from "./user/user.controller";

@Module({
	imports: [
		TodoUseCasesModule.register(),
		UserUseCasesModule.register(),
		AuthUsecasesModule.register(),
		JwtModule,
	],
	controllers: [TodoController, UserController, AuthController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class ControllersModule {}
