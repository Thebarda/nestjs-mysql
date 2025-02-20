import type { UserModel } from "./user";

export class TodoModel {
  id: number;
  content: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
  creator: UserModel;
}
