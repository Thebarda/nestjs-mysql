import type { UserModel } from "src/domain/model/user";
import type { UserRepository } from "src/domain/repositories/user.interface";

export class UserFindByIdUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(id: number): Promise<UserModel | null> {
		return await this.userRepository.findById(id);
	}
}
