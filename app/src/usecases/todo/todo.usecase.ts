import { type DynamicModule, Module } from "@nestjs/common";
import { ExceptionsModule } from "src/infrastructure/exceptions/exceptions.module";
import { TodoRepositoryModule } from "src/infrastructure/repositories/todo/todo.module";
import { DatabaseTodoRepository } from "src/infrastructure/repositories/todo/todo.repository";
import { UseCaseProxy } from "../usecases-proxy";
import { TodoDeleteUseCase } from "./delete.usecase";
import { TodoFindAllUseCase } from "./findAll.usecase";
import { TodoFindByContentUseCase } from "./findByContent.usecase";
import { TodoFindByIdUseCase } from "./findById.usecase";
import { TodoInsertUseCase } from "./insertTodo.usecase";
import { TodoUpdateUseCase } from "./update.usecase";

@Module({
	imports: [TodoRepositoryModule, ExceptionsModule],
})
export class TodoUseCasesModule {
	static INSERT_TODO = "insert_todo";
	static GET_TODO_BY_ID = "get_todo_by_id";
	static GET_ALL_TODOS = "get_all_todos";
	static GET_TODOS_BY_CONTENT = "get_todos_by_content";
	static DELETE_TODO = "delete_todo";
	static UPDATE_TODO = "update_todo";

	static register(): DynamicModule {
		return {
			module: TodoUseCasesModule,
			providers: [
				{
					inject: [DatabaseTodoRepository],
					provide: TodoUseCasesModule.INSERT_TODO,
					useFactory: (todoRepository: DatabaseTodoRepository) =>
						new UseCaseProxy(new TodoInsertUseCase(todoRepository)),
				},
				{
					inject: [DatabaseTodoRepository],
					provide: TodoUseCasesModule.GET_ALL_TODOS,
					useFactory: (todoRepository: DatabaseTodoRepository) =>
						new UseCaseProxy(new TodoFindAllUseCase(todoRepository)),
				},
				{
					inject: [DatabaseTodoRepository],
					provide: TodoUseCasesModule.GET_TODO_BY_ID,
					useFactory: (todoRepository: DatabaseTodoRepository) =>
						new UseCaseProxy(new TodoFindByIdUseCase(todoRepository)),
				},
				{
					inject: [DatabaseTodoRepository],
					provide: TodoUseCasesModule.GET_TODOS_BY_CONTENT,
					useFactory: (todoRepository: DatabaseTodoRepository) =>
						new UseCaseProxy(new TodoFindByContentUseCase(todoRepository)),
				},
				{
					inject: [DatabaseTodoRepository],
					provide: TodoUseCasesModule.UPDATE_TODO,
					useFactory: (todoRepository: DatabaseTodoRepository) =>
						new UseCaseProxy(new TodoUpdateUseCase(todoRepository)),
				},
				{
					inject: [DatabaseTodoRepository],
					provide: TodoUseCasesModule.DELETE_TODO,
					useFactory: (todoRepository: DatabaseTodoRepository) =>
						new UseCaseProxy(new TodoDeleteUseCase(todoRepository)),
				},
			],
			exports: [
				TodoUseCasesModule.DELETE_TODO,
				TodoUseCasesModule.UPDATE_TODO,
				TodoUseCasesModule.INSERT_TODO,
				TodoUseCasesModule.GET_TODOS_BY_CONTENT,
				TodoUseCasesModule.GET_TODO_BY_ID,
				TodoUseCasesModule.GET_ALL_TODOS,
			],
		};
	}
}
