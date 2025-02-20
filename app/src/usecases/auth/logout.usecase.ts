import { BadRequestException } from "@nestjs/common";
import type { DatabaseUserService } from "src/infrastructure/repositories/user/user.service";

export class AuthLogoutUseCase {
	constructor(private readonly userRepository: DatabaseUserService) {}

	async execute(id: number | undefined): Promise<void> {
		if (id === undefined) {
			throw new BadRequestException("User is not signed in.");
		}
		const currentUser = await this.userRepository.findById(id);

		if (!currentUser) {
			throw new BadRequestException("User does not exist.");
		}

		this.userRepository.update(id, { refreshToken: null });
	}
}
