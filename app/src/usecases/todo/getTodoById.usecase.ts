import type { TodoM } from "../../domain/model/todo";
import type { TodoRepository } from "../../domain/repositories/todoRepository.interface";

export class getTodoByIdUseCase {
	constructor(private readonly todoRepository: TodoRepository) {}

	async execute(id: number): Promise<TodoM> {
		return await this.todoRepository.findById(id);
	}
}
