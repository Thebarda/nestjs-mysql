import type { TodoModel } from "./todo";

export class UserModel {
	id: number;
	mail: string;
	password?: string;
	username: string;
	refreshToken?: string | null;
	todos?: Array<TodoModel>;
}
