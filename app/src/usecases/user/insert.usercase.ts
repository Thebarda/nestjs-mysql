import type { UserModel } from "src/domain/model/user";
import type { UserRepository } from "src/domain/repositories/user.interface";

export class UserInsertUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(
		user: Pick<UserModel, "mail" | "username" | "password">,
	): Promise<void> {
		await this.userRepository.insert(user);
	}
}
