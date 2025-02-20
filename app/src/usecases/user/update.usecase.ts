import type { UserModel } from "src/domain/model/user";
import type { UserRepository } from "src/domain/repositories/user.interface";

export class UserUpdateUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(
		id: number,
		user: Pick<UserModel, "mail" | "username" | "password">,
	): Promise<void> {
		await this.userRepository.update(id, {
			mail: user.mail,
			username: user.username,
			password: user.password,
		});
	}
}
