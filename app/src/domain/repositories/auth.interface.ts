import type { TokensModel } from "../model/tokens";
import type { UserModel } from "../model/user";

export interface AuthRepositoryModel {
	hashData(data: string): Promise<string>;
	getTokens(
		user: Pick<UserModel, "id" | "mail" | "username">,
	): Promise<TokensModel>;
	comparePassword(
		plainTextPassword: string,
		hashedPassword: string,
	): Promise<boolean>;
}
