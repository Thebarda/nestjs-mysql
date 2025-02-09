import { UnauthorizedException } from "@nestjs/common";
import type { JwtService } from "@nestjs/jwt";
import { UserM } from "src/domain/model/user";
import type { UserRepository } from "src/domain/repositories/userRepository.interface";

export class SignUpUseCase {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly jwtTokenService: JwtService,
	) {}

	async execute(
		mail: string,
		password: string,
	): Promise<{ accessToken: string }> {
		const existingUser = await this.userRepository.findById(mail);

		if (existingUser) {
			throw new UnauthorizedException();
		}

		const user = new UserM();
		user.mail = mail;
		user.password = await this.userRepository.encryptPassword(password);

		const insertedUser = await this.userRepository.insert(user);
		return {
			accessToken: await this.jwtTokenService.signAsync({
				mail,
				id: insertedUser.id,
			}),
		};
	}
}
