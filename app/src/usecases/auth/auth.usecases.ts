import { type DynamicModule, Module } from "@nestjs/common";
import { AuthRepositoryModule } from "src/infrastructure/repositories/auth/auth.module";
import { AuthRepositoryService } from "src/infrastructure/repositories/auth/auth.service";
import { DatabaseUserModule } from "src/infrastructure/repositories/user/user.module";
import { DatabaseUserService } from "src/infrastructure/repositories/user/user.service";
import { UseCaseProxy } from "../usecases-proxy";
import { AuthLogoutUseCase } from "./logout.usecase";
import { AuthSignInUseCase } from "./signIn.usecase";
import { AuthSignUpUseCase } from "./signUp.usecase";

@Module({
	imports: [AuthRepositoryModule, DatabaseUserModule],
})
export class AuthUsecasesModule {
	static SIGN_UP = "sign_up";
	static SIGN_IN = "sign_in";
	static LOGOUT = "logout";

	static register(): DynamicModule {
		return {
			module: AuthRepositoryModule,
			providers: [
				{
					inject: [AuthRepositoryService, DatabaseUserService],
					provide: AuthUsecasesModule.SIGN_UP,
					useFactory: (
						authRepository: AuthRepositoryService,
						userRepository: DatabaseUserService,
					) =>
						new UseCaseProxy(
							new AuthSignUpUseCase(authRepository, userRepository),
						),
				},
				{
					inject: [AuthRepositoryService, DatabaseUserService],
					provide: AuthUsecasesModule.SIGN_IN,
					useFactory: (
						authRepository: AuthRepositoryService,
						userRepository: DatabaseUserService,
					) =>
						new UseCaseProxy(
							new AuthSignInUseCase(authRepository, userRepository),
						),
				},
				{
					inject: [DatabaseUserService],
					provide: AuthUsecasesModule.LOGOUT,
					useFactory: (userRepository: DatabaseUserService) =>
						new UseCaseProxy(new AuthLogoutUseCase(userRepository)),
				},
			],
			exports: [
				AuthUsecasesModule.SIGN_UP,
				AuthUsecasesModule.SIGN_IN,
				AuthUsecasesModule.LOGOUT,
			],
		};
	}
}
