import type { UserModel } from "../model/user";

export interface UserRepository {
	insert(
		user: Pick<UserModel, "mail" | "password" | "username">,
	): Promise<number>;
	findAll(): Promise<Array<UserModel>>;
	findById(id: number): Promise<UserModel | null>;
	findByUsername(username: string): Promise<UserModel | null>;
	update(
		id: number,
		user: Partial<
			Pick<UserModel, "mail" | "username" | "password" | "refreshToken">
		>,
	): Promise<void>;
	deleteById(id: number): Promise<void>;
}
