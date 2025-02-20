import type { TodoModel } from "src/domain/model/todo";
import type { TodoRepository } from "src/domain/repositories/todo.interface";

export class TodoFindAllUseCase {
	constructor(private readonly todoRepository: TodoRepository) {}

	async execute(): Promise<Array<TodoModel>> {
		return await this.todoRepository.findAll();
	}
}
