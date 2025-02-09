import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TodoUseCasesModule } from "src/usecases/todo/todo.usecases";
import { UserUseCasesModule } from "src/usecases/user/user.usecases";
import { AuthGuard } from "../guard/auth.guard";
import { AuthController } from "./auth/auth.controller";
import { TodoController } from "./todo/todo.controller";

@Module({
	imports: [TodoUseCasesModule.register(), UserUseCasesModule.register()],
	controllers: [TodoController, AuthController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class ControllersModule {}
