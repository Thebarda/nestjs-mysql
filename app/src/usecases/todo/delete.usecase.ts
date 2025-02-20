import type { TodoRepository } from "src/domain/repositories/todo.interface";

export class TodoDeleteUseCase {
	constructor(private readonly todoRepository: TodoRepository) {}

	async execute(id: number): Promise<void> {
		await this.todoRepository.deleteById(id);
	}
}
