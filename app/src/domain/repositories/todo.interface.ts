import type { TodoModel } from "../model/todo";

export interface TodoRepository {
  insert(todo: Pick<TodoModel, "content" | "isDone">): Promise<void>;
  findAll(): Promise<Array<TodoModel>>;
  findById(id: number): Promise<TodoModel | null>;
  findByContent(search: string): Promise<Array<TodoModel>>;
  updateTodo(
    id: number,
    todo: Pick<TodoModel, "content" | "isDone" | "creator">,
  ): Promise<void>;
  deleteById(id: number): Promise<void>;
}
