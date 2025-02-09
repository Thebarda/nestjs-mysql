import { type DynamicModule, Module } from "@nestjs/common";
import { ExceptionsModule } from "src/infrastructure/exceptions/exceptions.module";
import { AuthGuard } from "src/infrastructure/guard/auth.guard";
import { LoggerModule } from "src/infrastructure/logger/logger.module";
import { RepositoriesModule } from "src/infrastructure/repositories/repositories.module";
import { DatabaseTodoRepository } from "src/infrastructure/repositories/todo/todo.repository";
import { UseCaseProxy } from "../usecases-proxy";
import { deleteByIdUseCase } from "./deleteById.usecase";
import { getTodoByIdUseCase } from "./getTodoById.usecase";
import { getTodosUseCase } from "./getTodos.usecase";
import { insertTodoUseCase } from "./insertTodo.usecase";
import { updateContentUseCase } from "./updateContent.usecase";

@Module({
	imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class TodoUseCasesModule {
	static GET_TODO_USECASES_PROXY = "getTodoUsecasesProxy";
	static GET_TODOS_USECASES_PROXY = "getTodosUsecasesProxy";
	static POST_TODO_USECASES_PROXY = "postTodoUsecasesProxy";
	static DELETE_TODO_USECASES_PROXY = "deleteTodoUsecasesProxy";
	static PUT_TODO_USECASES_PROXY = "putTodoUsecasesProxy";

	static register(): DynamicModule {
		return {
			module: TodoUseCasesModule,
			providers: [
				{
					inject: [DatabaseTodoRepository],
					provide: TodoUseCasesModule.GET_TODO_USECASES_PROXY,
					useFactory: (todoRepository: DatabaseTodoRepository) =>
						new UseCaseProxy(new getTodoByIdUseCase(todoRepository)),
				},
				{
					inject: [DatabaseTodoRepository],
					provide: TodoUseCasesModule.GET_TODOS_USECASES_PROXY,
					useFactory: (todoRepository: DatabaseTodoRepository) =>
						new UseCaseProxy(new getTodosUseCase(todoRepository)),
				},
				{
					inject: [DatabaseTodoRepository],
					provide: TodoUseCasesModule.POST_TODO_USECASES_PROXY,
					useFactory: (todoRepository: DatabaseTodoRepository) =>
						new UseCaseProxy(new insertTodoUseCase(todoRepository)),
				},
				{
					inject: [DatabaseTodoRepository],
					provide: TodoUseCasesModule.PUT_TODO_USECASES_PROXY,
					useFactory: (todoRepository: DatabaseTodoRepository) =>
						new UseCaseProxy(new updateContentUseCase(todoRepository)),
				},
				{
					inject: [DatabaseTodoRepository],
					provide: TodoUseCasesModule.DELETE_TODO_USECASES_PROXY,
					useFactory: (todoRepository: DatabaseTodoRepository) =>
						new UseCaseProxy(new deleteByIdUseCase(todoRepository)),
				},
			],
			exports: [
				TodoUseCasesModule.GET_TODO_USECASES_PROXY,
				TodoUseCasesModule.GET_TODOS_USECASES_PROXY,
				TodoUseCasesModule.POST_TODO_USECASES_PROXY,
				TodoUseCasesModule.PUT_TODO_USECASES_PROXY,
				TodoUseCasesModule.DELETE_TODO_USECASES_PROXY,
			],
		};
	}
}
