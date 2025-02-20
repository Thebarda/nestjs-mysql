import { BadRequestException } from "@nestjs/common";
import type { TokensModel } from "src/domain/model/tokens";
import type { UserModel } from "src/domain/model/user";
import type { AuthRepositoryService } from "src/infrastructure/repositories/auth/auth.service";
import type { DatabaseUserService } from "src/infrastructure/repositories/user/user.service";

export class AuthSignUpUseCase {
	constructor(
		private readonly authRepository: AuthRepositoryService,
		private readonly userRepository: DatabaseUserService,
	) {}

	async execute(
		user: Pick<UserModel, "username" | "mail" | "password">,
	): Promise<TokensModel> {
		const userExists = await this.userRepository.findByUsername(user.username);

		if (userExists) {
			throw new BadRequestException("User already exists.");
		}

		const hashedPassword = await this.authRepository.hashData(
			user.password as string,
		);
		const userToInsert = {
			mail: user.mail,
			username: user.username,
			password: hashedPassword,
		};
		const userId = await this.userRepository.insert(userToInsert);

		const tokens = await this.authRepository.getTokens({
			id: userId,
			mail: user.mail,
			username: user.username,
		});
		const hashRefreshToken = await this.authRepository.hashData(
			tokens.refreshToken,
		);
		await this.userRepository.update(userId, {
			refreshToken: hashRefreshToken,
		});

		return tokens;
	}
}
