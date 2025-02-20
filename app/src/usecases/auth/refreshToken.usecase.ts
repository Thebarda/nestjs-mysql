import { BadRequestException } from "@nestjs/common";
import type { TokensModel } from "src/domain/model/tokens";
import type { AuthRepositoryService } from "src/infrastructure/repositories/auth/auth.service";
import type { DatabaseUserService } from "src/infrastructure/repositories/user/user.service";

export class AuthRefreshTokenUseCase {
	constructor(
		private readonly userRepository: DatabaseUserService,
		private readonly authRepository: AuthRepositoryService,
	) {}

	async execute(
		id: number | undefined,
		refreshToken: string | null,
	): Promise<TokensModel> {
		if (refreshToken === undefined || id === undefined) {
			throw new BadRequestException("Access denied.");
		}

		const currentUser = await this.userRepository.findById(id);

		if (!currentUser) {
			throw new BadRequestException("Access denied.");
		}

		const tokens = await this.authRepository.getTokens({
			id: currentUser.id,
			mail: currentUser.mail,
			username: currentUser.username,
		});

		this.userRepository.update(id, { refreshToken: tokens.refreshToken });

		return tokens;
	}
}
