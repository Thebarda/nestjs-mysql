import type { UserRepository } from "src/domain/repositories/user.interface";

export class UserDeleteUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(id: number): Promise<void> {
		await this.userRepository.deleteById(id);
	}
}
