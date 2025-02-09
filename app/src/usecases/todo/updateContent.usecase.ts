import type { TodoRepository } from "../../domain/repositories/todoRepository.interface";

export class updateContentUseCase {
	constructor(private readonly todoRepository: TodoRepository) {}

	async execute(id: number, isDone: boolean): Promise<void> {
		await this.todoRepository.updateContent(id, isDone);
	}
}
