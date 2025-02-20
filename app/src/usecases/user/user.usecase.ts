import { type DynamicModule, Module } from "@nestjs/common";
import { DatabaseUserModule } from "src/infrastructure/repositories/user/user.module";
import { DatabaseUserService } from "src/infrastructure/repositories/user/user.service";
import { UseCaseProxy } from "../usecases-proxy";
import { UserDeleteUseCase } from "./delete.usecase";
import { UserFindAllUseCase } from "./findAll.usecase";
import { UserFindByIdUseCase } from "./findById.usecase";
import { UserInsertUseCase } from "./insert.usercase";
import { UserUpdateUseCase } from "./update.usecase";

@Module({
	imports: [DatabaseUserModule],
})
export class UserUseCasesModule {
	static INSERT_USER = "insert_user";
	static GET_USER_BY_ID = "get_user_by_id";
	static GET_ALL_USERS = "get_all_users";
	static DELETE_USER = "delete_user";
	static UPDATE_USER = "update_user";

	static register(): DynamicModule {
		return {
			module: UserUseCasesModule,
			providers: [
				{
					inject: [DatabaseUserService],
					provide: UserUseCasesModule.INSERT_USER,
					useFactory: (userRepository: DatabaseUserService) =>
						new UseCaseProxy(new UserInsertUseCase(userRepository)),
				},
				{
					inject: [DatabaseUserService],
					provide: UserUseCasesModule.GET_ALL_USERS,
					useFactory: (userRepository: DatabaseUserService) =>
						new UseCaseProxy(new UserFindAllUseCase(userRepository)),
				},
				{
					inject: [DatabaseUserService],
					provide: UserUseCasesModule.GET_USER_BY_ID,
					useFactory: (userRepository: DatabaseUserService) =>
						new UseCaseProxy(new UserFindByIdUseCase(userRepository)),
				},
				{
					inject: [DatabaseUserService],
					provide: UserUseCasesModule.UPDATE_USER,
					useFactory: (userRepository: DatabaseUserService) =>
						new UseCaseProxy(new UserUpdateUseCase(userRepository)),
				},
				{
					inject: [DatabaseUserService],
					provide: UserUseCasesModule.DELETE_USER,
					useFactory: (userRepository: DatabaseUserService) =>
						new UseCaseProxy(new UserDeleteUseCase(userRepository)),
				},
			],
			exports: [
				UserUseCasesModule.DELETE_USER,
				UserUseCasesModule.UPDATE_USER,
				UserUseCasesModule.INSERT_USER,
				UserUseCasesModule.GET_USER_BY_ID,
				UserUseCasesModule.GET_ALL_USERS,
			],
		};
	}
}
