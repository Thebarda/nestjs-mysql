import { ApiProperty } from "@nestjs/swagger";
import type { UserM } from "src/domain/model/user";
import type { TodoM } from "../../../domain/model/todo";

export class TodoPresenter {
	@ApiProperty()
	id: number;
	@ApiProperty()
	content: string;
	@ApiProperty()
	isDone: boolean;
	@ApiProperty()
	createdAt: Date;
	@ApiProperty()
	updatedAt: Date;
	@ApiProperty()
	creator: Omit<UserM, "password" | "todos">;

	constructor(todo: TodoM) {
		this.id = todo.id;
		this.content = todo.content;
		this.isDone = todo.isDone;
		this.createdAt = todo.createdAt;
		this.updatedAt = todo.updatedAt;
		this.creator = {
			id: todo.creator.id,
			mail: todo.creator.mail,
		};
	}
}
