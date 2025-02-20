import { BadRequestException } from "@nestjs/common";
import type { TokensModel } from "src/domain/model/tokens";
import type { UserModel } from "src/domain/model/user";
import type { AuthRepositoryService } from "src/infrastructure/repositories/auth/auth.service";
import type { DatabaseUserService } from "src/infrastructure/repositories/user/user.service";

export class AuthSignInUseCase {
	constructor(
		private readonly authRepository: AuthRepositoryService,
		private readonly userRepository: DatabaseUserService,
	) {}

	async execute(
		user: Pick<UserModel, "username" | "password">,
	): Promise<TokensModel> {
		const currentUser = await this.userRepository.findByUsername(user.username);

		if (!currentUser) {
			throw new BadRequestException("Failed to signing in");
		}

		const passwordMatches = this.authRepository.comparePassword(
			user.password as string,
			currentUser.password as string,
		);

		if (!passwordMatches) {
			throw new BadRequestException("Failed to signing in");
		}

		const tokens = await this.authRepository.getTokens({
			id: currentUser.id,
			mail: currentUser.mail,
			username: currentUser.username,
		});

		await this.userRepository.update(currentUser.id, {
			refreshToken: tokens.refreshToken,
		});

		return tokens;
	}
}
