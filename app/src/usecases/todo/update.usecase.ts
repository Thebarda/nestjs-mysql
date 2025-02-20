import type { TodoModel } from "src/domain/model/todo";
import type { TodoRepository } from "src/domain/repositories/todo.interface";

export class TodoUpdateUseCase {
	constructor(private readonly todoRepository: TodoRepository) {}

	async execute(
		id: number,
		todo: Pick<TodoModel, "content" | "isDone" | "creator">,
	): Promise<void> {
		await this.todoRepository.updateTodo(id, todo);
	}
}
