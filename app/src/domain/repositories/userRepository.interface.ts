import type { UserM } from "../model/user";

export interface UserRepository {
	insert(user: UserM): Promise<UserM>;
	findById(mail: string): Promise<UserM>;
	encryptPassword(password: string): Promise<string>;
}
