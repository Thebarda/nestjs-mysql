import type { TodoRepository } from "../../domain/repositories/todoRepository.interface";

export class deleteByIdUseCase {
	constructor(private readonly todoRepository: TodoRepository) {}

	async execute(id: number): Promise<void> {
		await this.todoRepository.deleteById(id);
	}
}
