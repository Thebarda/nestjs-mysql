import type { TodoModel } from "src/domain/model/todo";
import type { TodoRepository } from "src/domain/repositories/todo.interface";

export class TodoFindByIdUseCase {
	constructor(private readonly todoRepository: TodoRepository) {}

	async execute(id: number): Promise<TodoModel | null> {
		return await this.todoRepository.findById(id);
	}
}
