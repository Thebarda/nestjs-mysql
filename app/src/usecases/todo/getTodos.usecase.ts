import type { TodoM } from "../../domain/model/todo";
import type { TodoRepository } from "../../domain/repositories/todoRepository.interface";

export class getTodosUseCase {
	constructor(private readonly todoRepository: TodoRepository) {}

	async execute(): Promise<TodoM[]> {
		return await this.todoRepository.findAll();
	}
}
