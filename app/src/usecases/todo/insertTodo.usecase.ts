import type { TodoModel } from "src/domain/model/todo";
import type { TodoRepository } from "src/domain/repositories/todo.interface";

export class TodoInsertUseCase {
	constructor(private readonly todoRepository: TodoRepository) {}

	async execute(todo: Pick<TodoModel, "content" | "isDone">): Promise<void> {
		await this.todoRepository.insert(todo);
	}
}
