import type { TodoM } from "./todo";

export class UserM {
	id?: number;
	mail: string;
	password?: string;
	todos: Array<TodoM>;
}
