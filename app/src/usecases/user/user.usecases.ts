import { type DynamicModule, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ExceptionsModule } from "src/infrastructure/exceptions/exceptions.module";
import { RepositoriesModule } from "src/infrastructure/repositories/repositories.module";
import { DatabaseUserRepository } from "src/infrastructure/repositories/user/user.repository";
import { JwtModule } from "src/infrastructure/services/jwt/jwt.module";
import { UseCaseProxy } from "../usecases-proxy";
import { SignUpUseCase } from "./signUp.usecase";

@Module({
	imports: [RepositoriesModule, ExceptionsModule, JwtModule],
})
export class UserUseCasesModule {
	static SIGN_UP_USER_USECASE = "SIGN_UP_USECASE";

	static register(): DynamicModule {
		return {
			module: UserUseCasesModule,
			providers: [
				{
					inject: [DatabaseUserRepository, JwtService],
					provide: UserUseCasesModule.SIGN_UP_USER_USECASE,
					useFactory: (
						userRepository: DatabaseUserRepository,
						jwtTokenService: JwtService,
					) =>
						new UseCaseProxy(
							new SignUpUseCase(userRepository, jwtTokenService),
						),
				},
			],
			exports: [UserUseCasesModule.SIGN_UP_USER_USECASE],
		};
	}
}
