import type { UserM } from "./user";

export class TodoM {
	id?: number;
	content: string;
	isDone: boolean;
	createdAt?: Date;
	updatedAt?: Date;
	creator: UserM;
}
