import { ApiProperty } from "@nestjs/swagger";
import type { UserModel } from "src/domain/model/user";
import type { TodoModel } from "../../../domain/model/todo";

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
  creator: Pick<UserModel, "id" | "mail" | "username">;

  constructor(todo: TodoModel) {
    this.id = todo.id;
    this.content = todo.content;
    this.isDone = todo.isDone;
    this.createdAt = todo.createdAt;
    this.updatedAt = todo.updatedAt;
    this.creator = {
      id: todo.creator.id,
      mail: todo.creator.mail,
      username: todo.creator.username,
    };
  }
}
