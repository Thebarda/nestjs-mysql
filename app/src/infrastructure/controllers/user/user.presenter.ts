import { ApiProperty } from "@nestjs/swagger";
import type { UserModel } from "src/domain/model/user";
import type { TodoModel } from "../../../domain/model/todo";

export class UserPresenter {
	@ApiProperty()
	id: number;
	@ApiProperty()
	mail: string;
	@ApiProperty()
	username: string;
	@ApiProperty()
	todos?: Array<Omit<TodoModel, "creator">>;

	constructor(user: UserModel) {
		this.id = user.id;
		this.mail = user.mail;
		this.username = user.username;
		this.todos = user.todos?.map(
			({ id, content, isDone, createdAt, updatedAt }) => ({
				id,
				content,
				isDone,
				createdAt,
				updatedAt,
			}),
		);
	}
}
