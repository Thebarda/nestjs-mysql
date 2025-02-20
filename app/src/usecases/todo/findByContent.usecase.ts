import type { TodoModel } from "src/domain/model/todo";
import type { TodoRepository } from "src/domain/repositories/todo.interface";

export class TodoFindByContentUseCase {
	constructor(private readonly todoRepository: TodoRepository) {}

	async execute(content: string): Promise<Array<TodoModel>> {
		return await this.todoRepository.findByContent(content);
	}
}
