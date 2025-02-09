import { TodoM } from "../../domain/model/todo";
import type { TodoRepository } from "../../domain/repositories/todoRepository.interface";

export class insertTodoUseCase {
	constructor(private readonly todoRepository: TodoRepository) {}

	async execute(content: string): Promise<void> {
		const todo = new TodoM();
		todo.content = content;
		todo.isDone = false;
		await this.todoRepository.insert(todo);
	}
}
