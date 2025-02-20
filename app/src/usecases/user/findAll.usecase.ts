import type { UserModel } from "src/domain/model/user";
import type { UserRepository } from "src/domain/repositories/user.interface";

export class UserFindAllUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(): Promise<Array<UserModel>> {
		return await this.userRepository.findAll();
	}
}
